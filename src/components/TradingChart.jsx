import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { generateIntradayOHLC } from '../utils/simulateOHLC';
import { calcSMA, calcEMA, calcRSI, calcMACD, calcBollingerBands } from '../utils/indicators';

const TIMEFRAMES = [
  { label: '5m', key: '5min', type: 'intraday' },
  { label: '15m', key: '15min', type: 'intraday' },
  { label: 'D', key: 'D', type: 'historical' },
  { label: 'W', key: 'W', type: 'historical' },
  { label: 'M', key: 'M', type: 'historical' },
  { label: '3M', key: '3M', type: 'historical' },
  { label: '1Y', key: 'Y', type: 'historical' },
];

const AVAILABLE_INDICATORS = [
  { id: 'sma20', name: 'SMA 20', group: 'Overlay', color: '#60a5fa' },
  { id: 'sma50', name: 'SMA 50', group: 'Overlay', color: '#fbbf24' },
  { id: 'sma200', name: 'SMA 200', group: 'Overlay', color: '#a78bfa' },
  { id: 'ema12', name: 'EMA 12', group: 'Overlay', color: '#34d399' },
  { id: 'ema26', name: 'EMA 26', group: 'Overlay', color: '#f97316' },
  { id: 'bb', name: 'Bollinger Bands', group: 'Overlay', color: '#60a5fa' },
  { id: 'rsi', name: 'RSI (14)', group: 'Sub-Chart', color: '#a78bfa' },
  { id: 'macd', name: 'MACD (12,26,9)', group: 'Sub-Chart', color: '#60a5fa' },
];

const dataCache = {};
function getCacheKey(s, t) { return `${s}_${t}`; }

// IST formatter helpers
const IST_OFF = (5 * 60 + 30) * 60 * 1000;
function fmtTimeIST(ts) {
  const d = new Date(ts * 1000 + IST_OFF);
  return `${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
}
function fmtDateIST(ts) {
  const d = new Date(ts * 1000 + IST_OFF);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function getChartColors(isDark) {
  return {
    bg: 'transparent',
    text: isDark ? '#64748b' : '#9ca3af',
    grid: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
    crosshair: isDark ? 'rgba(99,220,160,0.3)' : 'rgba(16,150,90,0.3)',
    crosshairLabel: isDark ? '#1a2438' : '#e8ecf1',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    upCandle: isDark ? '#63dca0' : '#10965a',
    downCandle: isDark ? '#f87171' : '#dc2626',
    upVol: isDark ? 'rgba(99,220,160,0.2)' : 'rgba(16,150,90,0.15)',
    downVol: isDark ? 'rgba(248,113,113,0.2)' : 'rgba(220,38,38,0.15)',
  };
}

function buildChartOptions(colors) {
  return {
    layout: { background: { type: ColorType.Solid, color: colors.bg }, textColor: colors.text, fontFamily: "'DM Sans', sans-serif", fontSize: 11 },
    grid: { vertLines: { color: colors.grid }, horzLines: { color: colors.grid } },
    crosshair: { mode: CrosshairMode.Normal, vertLine: { color: colors.crosshair, labelBackgroundColor: colors.crosshairLabel }, horzLine: { color: colors.crosshair, labelBackgroundColor: colors.crosshairLabel } },
    rightPriceScale: { borderColor: colors.border, scaleMargins: { top: 0.1, bottom: 0.2 } },
    timeScale: { borderColor: colors.border, timeVisible: true, secondsVisible: false },
    localization: { timeFormatter: fmtTimeIST, dateFormatter: fmtDateIST },
    handleScroll: { mouseWheel: true, pressedMouseMove: true },
    handleScale: { mouseWheel: true, pinch: true },
  };
}

export default function TradingChart({ symbol, ltp, changePercent }) {
  // Main chart refs
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const indicatorSeriesRef = useRef([]); // overlay indicator line series

  // Sub-chart refs (RSI / MACD)
  const subChartContainerRef = useRef(null);
  const subChartRef = useRef(null);
  const subSeriesRef = useRef([]);

  const [chartType, setChartType] = useState('candlestick');
  const [activeTimeframe, setActiveTimeframe] = useState('D');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndicators, setActiveIndicators] = useState([]);
  const [showIndicatorPanel, setShowIndicatorPanel] = useState(false);

  const isDark = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') !== 'light' : true;
  const colors = getChartColors(isDark);
  const lineColor = changePercent >= 0 ? colors.upCandle : colors.downCandle;
  const hasSubChart = activeIndicators.some(id => id === 'rsi' || id === 'macd');

  // ═══ DATA FETCHING ═══
  const fetchData = useCallback(async (tf) => {
    if (!symbol || !ltp) return;
    setLoading(true);
    setError(null);
    try {
      const timeframe = TIMEFRAMES.find(t => t.key === tf);
      if (timeframe.type === 'intraday') {
        const days = tf === '5min' ? 3 : 5;
        setChartData(generateIntradayOHLC(ltp, changePercent, tf, days));
      } else {
        const cacheKey = getCacheKey(symbol, tf);
        if (dataCache[cacheKey] && Date.now() - dataCache[cacheKey].ts < 300000) {
          setChartData(dataCache[cacheKey].data);
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/stock-history?symbol=${encodeURIComponent(symbol)}&interval=${tf}`);
        if (!res.ok) throw new Error(`API ${res.status}`);
        const json = await res.json();
        if (json.data?.length > 0) {
          dataCache[cacheKey] = { data: json.data, ts: Date.now() };
          setChartData(json.data);
        } else throw new Error('No data');
      }
    } catch (err) {
      setError('Simulated data');
      setChartData(generateIntradayOHLC(ltp, changePercent, '5min', Math.min(15, 30)));
    }
    setLoading(false);
  }, [symbol, ltp, changePercent]);

  useEffect(() => { if (symbol && ltp) fetchData(activeTimeframe); }, [symbol, activeTimeframe, fetchData]);

  // ═══ MAIN CHART INIT ═══
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, buildChartOptions(colors));
    chartRef.current = chart;
    const ro = new ResizeObserver(entries => {
      if (entries[0]) chart.resize(entries[0].contentRect.width, entries[0].contentRect.height);
    });
    ro.observe(chartContainerRef.current);
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null; seriesRef.current = null; volumeSeriesRef.current = null; indicatorSeriesRef.current = []; };
  }, [isDark]);

  // ═══ SUB-CHART INIT (RSI/MACD) ═══
  useEffect(() => {
    if (!hasSubChart || !subChartContainerRef.current) {
      if (subChartRef.current) { subChartRef.current.remove(); subChartRef.current = null; subSeriesRef.current = []; }
      return;
    }
    const subChart = createChart(subChartContainerRef.current, {
      ...buildChartOptions(colors),
      rightPriceScale: { borderColor: colors.border, scaleMargins: { top: 0.1, bottom: 0.1 } },
    });
    subChartRef.current = subChart;
    const ro = new ResizeObserver(entries => {
      if (entries[0]) subChart.resize(entries[0].contentRect.width, entries[0].contentRect.height);
    });
    ro.observe(subChartContainerRef.current);
    return () => { ro.disconnect(); subChart.remove(); subChartRef.current = null; subSeriesRef.current = []; };
  }, [isDark, hasSubChart]);

  // ═══ SYNC TIME SCALES ═══
  useEffect(() => {
    const main = chartRef.current;
    const sub = subChartRef.current;
    if (!main || !sub) return;
    const mainTS = main.timeScale();
    const subTS = sub.timeScale();
    let syncing = false;
    const syncMain = () => { if (syncing) return; syncing = true; subTS.applyOptions({ ...mainTS.options() }); const lr = mainTS.getVisibleLogicalRange(); if (lr) subTS.setVisibleLogicalRange(lr); syncing = false; };
    const syncSub = () => { if (syncing) return; syncing = true; const lr = subTS.getVisibleLogicalRange(); if (lr) mainTS.setVisibleLogicalRange(lr); syncing = false; };
    mainTS.subscribeVisibleLogicalRangeChange(syncMain);
    subTS.subscribeVisibleLogicalRangeChange(syncSub);
    return () => { try { mainTS.unsubscribeVisibleLogicalRangeChange(syncMain); subTS.unsubscribeVisibleLogicalRangeChange(syncSub); } catch {} };
  }, [hasSubChart, chartData]);

  // ═══ UPDATE MAIN SERIES + INDICATORS ═══
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || chartData.length === 0) return;

    // Remove old series
    if (seriesRef.current) { try { chart.removeSeries(seriesRef.current); } catch {} seriesRef.current = null; }
    if (volumeSeriesRef.current) { try { chart.removeSeries(volumeSeriesRef.current); } catch {} volumeSeriesRef.current = null; }
    indicatorSeriesRef.current.forEach(s => { try { chart.removeSeries(s); } catch {} });
    indicatorSeriesRef.current = [];

    // Main price series
    if (chartType === 'candlestick') {
      const s = chart.addCandlestickSeries({ upColor: colors.upCandle, downColor: colors.downCandle, borderDownColor: colors.downCandle, borderUpColor: colors.upCandle, wickDownColor: colors.downCandle, wickUpColor: colors.upCandle });
      s.setData(chartData);
      seriesRef.current = s;
    } else {
      const s = chart.addLineSeries({ color: lineColor, lineWidth: 2, crosshairMarkerVisible: true, crosshairMarkerRadius: 4, lastValueVisible: true, priceLineVisible: true });
      s.setData(chartData.map(d => ({ time: d.time, value: d.close })));
      seriesRef.current = s;
    }

    // Volume
    const vs = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: 'volume' });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });
    vs.setData(chartData.map(d => ({ time: d.time, value: d.volume || 0, color: d.close >= d.open ? colors.upVol : colors.downVol })));
    volumeSeriesRef.current = vs;

    // ═══ OVERLAY INDICATORS ═══
    const newIndSeries = [];

    if (activeIndicators.includes('sma20')) {
      const s = chart.addLineSeries({ color: '#60a5fa', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      s.setData(calcSMA(chartData, 20));
      newIndSeries.push(s);
    }
    if (activeIndicators.includes('sma50')) {
      const s = chart.addLineSeries({ color: '#fbbf24', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      s.setData(calcSMA(chartData, 50));
      newIndSeries.push(s);
    }
    if (activeIndicators.includes('sma200')) {
      const s = chart.addLineSeries({ color: '#a78bfa', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      s.setData(calcSMA(chartData, 200));
      newIndSeries.push(s);
    }
    if (activeIndicators.includes('ema12')) {
      const s = chart.addLineSeries({ color: '#34d399', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      s.setData(calcEMA(chartData, 12));
      newIndSeries.push(s);
    }
    if (activeIndicators.includes('ema26')) {
      const s = chart.addLineSeries({ color: '#f97316', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      s.setData(calcEMA(chartData, 26));
      newIndSeries.push(s);
    }
    if (activeIndicators.includes('bb')) {
      const bb = calcBollingerBands(chartData, 20, 2);
      const upper = chart.addLineSeries({ color: 'rgba(96,165,250,0.5)', lineWidth: 1, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      upper.setData(bb.upper);
      const mid = chart.addLineSeries({ color: 'rgba(96,165,250,0.3)', lineWidth: 1, lineStyle: 2, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      mid.setData(bb.middle);
      const lower = chart.addLineSeries({ color: 'rgba(96,165,250,0.5)', lineWidth: 1, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
      lower.setData(bb.lower);
      newIndSeries.push(upper, mid, lower);
    }

    indicatorSeriesRef.current = newIndSeries;
    chart.timeScale().fitContent();
  }, [chartType, chartData, isDark, activeIndicators]);

  // ═══ UPDATE SUB-CHART (RSI / MACD) ═══
  useEffect(() => {
    const subChart = subChartRef.current;
    if (!subChart || chartData.length === 0) return;

    // Remove old sub series
    subSeriesRef.current.forEach(s => { try { subChart.removeSeries(s); } catch {} });
    subSeriesRef.current = [];
    const newSub = [];

    if (activeIndicators.includes('rsi')) {
      const rsiData = calcRSI(chartData, 14);
      const rsiLine = subChart.addLineSeries({ color: '#a78bfa', lineWidth: 1.5, priceFormat: { type: 'custom', formatter: v => v.toFixed(0) }, lastValueVisible: true, priceLineVisible: false });
      rsiLine.setData(rsiData);
      newSub.push(rsiLine);

      // Overbought/Oversold reference lines
      if (rsiData.length > 1) {
        const ob = subChart.addLineSeries({ color: 'rgba(248,113,113,0.3)', lineWidth: 1, lineStyle: 2, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
        ob.setData([{ time: rsiData[0].time, value: 70 }, { time: rsiData[rsiData.length - 1].time, value: 70 }]);
        const os = subChart.addLineSeries({ color: 'rgba(99,220,160,0.3)', lineWidth: 1, lineStyle: 2, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
        os.setData([{ time: rsiData[0].time, value: 30 }, { time: rsiData[rsiData.length - 1].time, value: 30 }]);
        const mid = subChart.addLineSeries({ color: 'rgba(100,116,139,0.2)', lineWidth: 1, lineStyle: 2, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
        mid.setData([{ time: rsiData[0].time, value: 50 }, { time: rsiData[rsiData.length - 1].time, value: 50 }]);
        newSub.push(ob, os, mid);
      }
    }

    if (activeIndicators.includes('macd')) {
      const { macdLine, signalLine, histogram } = calcMACD(chartData, 12, 26, 9);

      if (histogram.length > 0) {
        const histSeries = subChart.addHistogramSeries({ priceFormat: { type: 'custom', formatter: v => v.toFixed(2) }, priceScaleId: 'macd_hist', lastValueVisible: false });
        subChart.priceScale('macd_hist').applyOptions({ scaleMargins: { top: 0.7, bottom: 0 } });
        histSeries.setData(histogram);
        newSub.push(histSeries);
      }
      if (macdLine.length > 0) {
        const ml = subChart.addLineSeries({ color: '#60a5fa', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: true, priceLineVisible: false, priceFormat: { type: 'custom', formatter: v => v.toFixed(2) } });
        ml.setData(macdLine);
        newSub.push(ml);
      }
      if (signalLine.length > 0) {
        const sl = subChart.addLineSeries({ color: '#f97316', lineWidth: 1.5, crosshairMarkerVisible: false, lastValueVisible: false, priceLineVisible: false });
        sl.setData(signalLine);
        newSub.push(sl);
      }
    }

    subSeriesRef.current = newSub;
    subChart.timeScale().fitContent();
  }, [chartData, activeIndicators, hasSubChart, isDark]);

  // ═══ TOGGLE INDICATOR ═══
  function toggleIndicator(id) {
    setActiveIndicators(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  // ═══ RENDER ═══
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
      {/* Chart Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 10 }}>
        {/* Left: Stock info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{symbol}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>NSE</div>
          </div>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 600 }}>₹{ltp?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            <span style={{ fontSize: 13, fontWeight: 600, marginLeft: 8, color: changePercent >= 0 ? 'var(--green)' : 'var(--red)' }}>{changePercent >= 0 ? '+' : ''}{changePercent?.toFixed(2)}%</span>
          </div>
        </div>

        {/* Right: Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Chart Type */}
          <div style={{ display: 'flex', gap: 3, background: 'var(--bg-secondary)', borderRadius: 8, padding: 3 }}>
            {[{ key: 'candlestick', label: '🕯️ Candles' }, { key: 'line', label: '📈 Line' }].map(ct => (
              <button key={ct.key} onClick={() => setChartType(ct.key)} style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
                background: chartType === ct.key ? 'var(--green-dim)' : 'transparent', color: chartType === ct.key ? 'var(--green)' : 'var(--text-muted)',
              }}>{ct.label}</button>
            ))}
          </div>

          {/* Indicators Button */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowIndicatorPanel(!showIndicatorPanel)} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
              border: `1px solid ${activeIndicators.length > 0 ? 'rgba(96,165,250,0.3)' : 'var(--border)'}`,
              background: activeIndicators.length > 0 ? 'var(--blue-dim)' : 'transparent',
              color: activeIndicators.length > 0 ? 'var(--blue)' : 'var(--text-muted)',
            }}>
              📊 Indicators {activeIndicators.length > 0 && `(${activeIndicators.length})`}
            </button>

            {/* Indicator Panel Dropdown */}
            {showIndicatorPanel && (
              <div style={{
                position: 'absolute', top: '120%', right: 0, width: 260, zIndex: 50,
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
                boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Indicators</span>
                  {activeIndicators.length > 0 && (
                    <button onClick={() => setActiveIndicators([])} style={{
                      fontSize: 10, fontWeight: 600, color: 'var(--red)', background: 'var(--red-dim)', border: 'none',
                      padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit',
                    }}>Clear All</button>
                  )}
                </div>
                {['Overlay', 'Sub-Chart'].map(group => (
                  <div key={group}>
                    <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>{group}</div>
                    {AVAILABLE_INDICATORS.filter(ind => ind.group === group).map(ind => {
                      const isActive = activeIndicators.includes(ind.id);
                      return (
                        <div key={ind.id} onClick={() => toggleIndicator(ind.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', cursor: 'pointer', transition: 'background 0.1s',
                            background: isActive ? 'var(--hover-bg)' : 'transparent',
                          }}
                          onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--hover-subtle)'; }}
                          onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                          {/* Color dot */}
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: ind.color, opacity: isActive ? 1 : 0.4, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, flex: 1, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{ind.name}</span>
                          {/* Toggle */}
                          <div style={{
                            width: 32, height: 18, borderRadius: 9, padding: 2, cursor: 'pointer', transition: 'background 0.2s',
                            background: isActive ? 'var(--green)' : 'var(--surface)',
                          }}>
                            <div style={{
                              width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'transform 0.2s',
                              transform: isActive ? 'translateX(14px)' : 'translateX(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Overlay indicators render on the price chart. Sub-chart indicators render in a separate panel below.
                </div>
              </div>
            )}
          </div>

          {/* Timeframes */}
          <div style={{ display: 'flex', gap: 3 }}>
            {TIMEFRAMES.map(tf => (
              <button key={tf.key} onClick={() => setActiveTimeframe(tf.key)} style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
                background: activeTimeframe === tf.key ? 'var(--green-dim)' : 'transparent',
                border: `1px solid ${activeTimeframe === tf.key ? 'rgba(99,220,160,0.2)' : 'transparent'}`,
                color: activeTimeframe === tf.key ? 'var(--green)' : 'var(--text-muted)',
              }}>{tf.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Close indicator panel when clicking chart area */}
      <div onClick={() => { if (showIndicatorPanel) setShowIndicatorPanel(false); }}>
        {/* Main Chart Area */}
        <div style={{ position: 'relative', height: 400, padding: '0 4px 4px' }}>
          {loading && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? 'rgba(10,14,23,0.6)' : 'rgba(244,246,249,0.6)', zIndex: 10, borderRadius: 10, backdropFilter: 'blur(2px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 18, height: 18, border: '2px solid var(--border)', borderTop: '2px solid var(--green)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading chart...</span>
              </div>
            </div>
          )}
          {error && !loading && (
            <div style={{ position: 'absolute', top: 8, right: 12, zIndex: 5, fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: 'var(--amber-dim)', color: 'var(--amber)' }}>⚠ {error}</div>
          )}
          <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Sub-Chart Area (RSI / MACD) */}
        {hasSubChart && (
          <div style={{ borderTop: '1px solid var(--border)' }}>
            <div style={{ padding: '4px 20px 0', display: 'flex', gap: 12, fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>
              {activeIndicators.includes('rsi') && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 2, borderRadius: 1, background: '#a78bfa' }} /> RSI (14)
                  <span style={{ color: 'rgba(248,113,113,0.6)', marginLeft: 4 }}>70</span>
                  <span style={{ color: 'rgba(99,220,160,0.6)' }}>30</span>
                </span>
              )}
              {activeIndicators.includes('macd') && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 2, borderRadius: 1, background: '#60a5fa' }} /> MACD
                  <span style={{ width: 8, height: 2, borderRadius: 1, background: '#f97316' }} /> Signal
                </span>
              )}
            </div>
            <div ref={subChartContainerRef} style={{ width: '100%', height: 150, padding: '0 4px 4px' }} />
          </div>
        )}
      </div>

      {/* Chart Footer — Legend */}
      <div style={{ display: 'flex', gap: 10, padding: '8px 20px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 2, borderRadius: 1, background: 'var(--green)' }} /> Price
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 6, borderRadius: 1, background: 'var(--green)', opacity: 0.3 }} /> Volume
        </span>
        {/* Active indicator legends */}
        {activeIndicators.filter(id => !['rsi', 'macd'].includes(id)).map(id => {
          const ind = AVAILABLE_INDICATORS.find(i => i.id === id);
          return ind ? (
            <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 2, borderRadius: 1, background: ind.color }} /> {ind.name}
            </span>
          ) : null;
        })}
        <span style={{ marginLeft: 'auto' }}>
          {TIMEFRAMES.find(t => t.key === activeTimeframe)?.type === 'intraday' ? 'Simulated' : 'Yahoo Finance'} · IST
        </span>
      </div>
    </div>
  );
}
