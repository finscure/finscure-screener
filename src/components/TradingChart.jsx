import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { generateIntradayOHLC } from '../utils/simulateOHLC';
import { calcSMA, calcEMA, calcRSI, calcMACD, calcBollingerBands, calcVolumeDelta, calcCVD, calcVWAP } from '../utils/indicators';

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
  { id: 'sma20', name: 'SMA 20', group: 'Moving Averages', type: 'overlay', color: '#60a5fa' },
  { id: 'sma50', name: 'SMA 50', group: 'Moving Averages', type: 'overlay', color: '#fbbf24' },
  { id: 'sma200', name: 'SMA 200', group: 'Moving Averages', type: 'overlay', color: '#a78bfa' },
  { id: 'ema12', name: 'EMA 12', group: 'Moving Averages', type: 'overlay', color: '#34d399' },
  { id: 'ema26', name: 'EMA 26', group: 'Moving Averages', type: 'overlay', color: '#f97316' },
  { id: 'bb', name: 'Bollinger Bands', group: 'Volatility', type: 'overlay', color: '#60a5fa' },
  { id: 'vwap', name: 'VWAP', group: 'Order Flow', type: 'overlay', color: '#22d3ee' },
  { id: 'rsi', name: 'RSI (14)', group: 'Momentum', type: 'subchart', color: '#a78bfa' },
  { id: 'macd', name: 'MACD', group: 'Momentum', type: 'subchart', color: '#60a5fa' },
  { id: 'vdelta', name: 'Volume Delta', group: 'Order Flow', type: 'subchart', color: '#63dca0' },
  { id: 'cvd', name: 'Cum. Vol. Delta', group: 'Order Flow', type: 'subchart', color: '#60a5fa' },
];

const dataCache = {};

export default function TradingChart({ symbol, ltp, changePercent }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const indicatorSeriesRef = useRef([]);

  const [chartType, setChartType] = useState('candlestick');
  const [activeTimeframe, setActiveTimeframe] = useState('D');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndicators, setActiveIndicators] = useState([]);
  const [showIndicatorPanel, setShowIndicatorPanel] = useState(false);

  const isDark = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') !== 'light' : true;

  const colors = {
    bg: 'transparent', text: isDark ? '#64748b' : '#8b85a6',
    grid: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(40,33,83,0.05)',
    crosshair: isDark ? 'rgba(99,220,160,0.3)' : 'rgba(40,33,83,0.3)',
    crosshairLabel: isDark ? '#1a2438' : '#e4e2ee',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(40,33,83,0.1)',
    upCandle: isDark ? '#63dca0' : '#10965a', downCandle: isDark ? '#f87171' : '#dc2626',
    upVol: isDark ? 'rgba(99,220,160,0.2)' : 'rgba(16,150,90,0.15)',
    downVol: isDark ? 'rgba(248,113,113,0.2)' : 'rgba(220,38,38,0.15)',
    line: changePercent >= 0 ? (isDark ? '#63dca0' : '#10965a') : (isDark ? '#f87171' : '#dc2626'),
  };

  const fetchData = useCallback(async (tf) => {
    if (!symbol || !ltp) return;
    setLoading(true); setError(null);
    try {
      const timeframe = TIMEFRAMES.find(t => t.key === tf);
      if (timeframe.type === 'intraday') {
        setChartData(generateIntradayOHLC(ltp, changePercent, tf, tf === '5min' ? 3 : 5));
      } else {
        const ck = `${symbol}_${tf}`;
        if (dataCache[ck] && Date.now() - dataCache[ck].ts < 300000) { setChartData(dataCache[ck].data); setLoading(false); return; }
        const res = await fetch(`/api/stock-history?symbol=${encodeURIComponent(symbol)}&interval=${tf}`);
        if (!res.ok) throw new Error(`API ${res.status}`);
        const json = await res.json();
        if (json.data?.length > 0) { dataCache[ck] = { data: json.data, ts: Date.now() }; setChartData(json.data); }
        else throw new Error('No data');
      }
    } catch (err) {
      setError('Using simulated data');
      setChartData(generateIntradayOHLC(ltp, changePercent, '5min', 10));
    }
    setLoading(false);
  }, [symbol, ltp, changePercent]);

  useEffect(() => { if (symbol && ltp) fetchData(activeTimeframe); }, [symbol, activeTimeframe, fetchData]);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: colors.bg }, textColor: colors.text, fontFamily: "'DM Sans', sans-serif", fontSize: 11 },
      grid: { vertLines: { color: colors.grid }, horzLines: { color: colors.grid } },
      crosshair: { mode: CrosshairMode.Normal, vertLine: { color: colors.crosshair, labelBackgroundColor: colors.crosshairLabel }, horzLine: { color: colors.crosshair, labelBackgroundColor: colors.crosshairLabel } },
      rightPriceScale: { borderColor: colors.border, scaleMargins: { top: 0.1, bottom: 0.2 } },
      timeScale: { borderColor: colors.border, timeVisible: true, secondsVisible: false },
      handleScroll: { mouseWheel: true, pressedMouseMove: true },
      handleScale: { mouseWheel: true, pinch: true },
    });
    chartRef.current = chart;
    const ro = new ResizeObserver(entries => { if (entries.length && chartContainerRef.current) { const { width, height } = entries[0].contentRect; chart.resize(width, height); } });
    ro.observe(chartContainerRef.current);
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null; seriesRef.current = null; volumeSeriesRef.current = null; };
  }, [isDark]);

  // Update series + indicators
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || chartData.length === 0) return;

    // Remove existing series
    if (seriesRef.current) { try { chart.removeSeries(seriesRef.current); } catch {} seriesRef.current = null; }
    if (volumeSeriesRef.current) { try { chart.removeSeries(volumeSeriesRef.current); } catch {} volumeSeriesRef.current = null; }
    indicatorSeriesRef.current.forEach(s => { try { chart.removeSeries(s); } catch {} });
    indicatorSeriesRef.current = [];

    // Main series
    if (chartType === 'candlestick') {
      const s = chart.addCandlestickSeries({ upColor: colors.upCandle, downColor: colors.downCandle, borderDownColor: colors.downCandle, borderUpColor: colors.upCandle, wickDownColor: colors.downCandle, wickUpColor: colors.upCandle });
      s.setData(chartData); seriesRef.current = s;
    } else {
      const s = chart.addLineSeries({ color: colors.line, lineWidth: 2, crosshairMarkerVisible: true, crosshairMarkerRadius: 4, lastValueVisible: true, priceLineVisible: true });
      s.setData(chartData.map(d => ({ time: d.time, value: d.close }))); seriesRef.current = s;
    }

    // Volume
    const vs = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: 'volume' });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });
    vs.setData(chartData.map(d => ({ time: d.time, value: d.volume || 0, color: d.close >= d.open ? colors.upVol : colors.downVol })));
    volumeSeriesRef.current = vs;

    // Render active indicators
    activeIndicators.forEach(indId => {
      try {
        const ind = AVAILABLE_INDICATORS.find(i => i.id === indId);
        if (!ind) return;

        if (ind.type === 'overlay') {
          // Overlay indicators — line series on main scale
          if (indId === 'sma20') { const d = calcSMA(chartData, 20); const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5, priceScaleId: 'right' }); s.setData(d); indicatorSeriesRef.current.push(s); }
          else if (indId === 'sma50') { const d = calcSMA(chartData, 50); const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5 }); s.setData(d); indicatorSeriesRef.current.push(s); }
          else if (indId === 'sma200') { const d = calcSMA(chartData, 200); if (d.length > 0) { const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5 }); s.setData(d); indicatorSeriesRef.current.push(s); }}
          else if (indId === 'ema12') { const d = calcEMA(chartData, 12); const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5 }); s.setData(d); indicatorSeriesRef.current.push(s); }
          else if (indId === 'ema26') { const d = calcEMA(chartData, 26); const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5 }); s.setData(d); indicatorSeriesRef.current.push(s); }
          else if (indId === 'vwap') { const d = calcVWAP(chartData); const s = chart.addLineSeries({ color: ind.color, lineWidth: 2, lineStyle: 2 }); s.setData(d); indicatorSeriesRef.current.push(s); }
          else if (indId === 'bb') {
            const { upper, middle, lower } = calcBollingerBands(chartData);
            const su = chart.addLineSeries({ color: ind.color, lineWidth: 1, lineStyle: 2 }); su.setData(upper); indicatorSeriesRef.current.push(su);
            const sm = chart.addLineSeries({ color: ind.color, lineWidth: 1.5 }); sm.setData(middle); indicatorSeriesRef.current.push(sm);
            const sl = chart.addLineSeries({ color: ind.color, lineWidth: 1, lineStyle: 2 }); sl.setData(lower); indicatorSeriesRef.current.push(sl);
          }
        } else {
          // Subchart indicators — separate price scale at bottom
          if (indId === 'rsi') {
            const d = calcRSI(chartData);
            const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5, priceScaleId: 'rsi', lastValueVisible: true });
            chart.priceScale('rsi').applyOptions({ scaleMargins: { top: 0.75, bottom: 0.02 } });
            s.setData(d); indicatorSeriesRef.current.push(s);
          }
          else if (indId === 'macd') {
            const { macdLine, signalLine, histogram } = calcMACD(chartData);
            const sh = chart.addHistogramSeries({ priceScaleId: 'macd', priceFormat: { type: 'price', precision: 2, minMove: 0.01 } });
            chart.priceScale('macd').applyOptions({ scaleMargins: { top: 0.78, bottom: 0.02 } });
            sh.setData(histogram); indicatorSeriesRef.current.push(sh);
            const sm = chart.addLineSeries({ color: '#60a5fa', lineWidth: 1.5, priceScaleId: 'macd' }); sm.setData(macdLine); indicatorSeriesRef.current.push(sm);
            const ss = chart.addLineSeries({ color: '#f97316', lineWidth: 1.5, priceScaleId: 'macd' }); ss.setData(signalLine); indicatorSeriesRef.current.push(ss);
          }
          else if (indId === 'vdelta') {
            const d = calcVolumeDelta(chartData);
            const s = chart.addHistogramSeries({ priceScaleId: 'vdelta', priceFormat: { type: 'volume' } });
            chart.priceScale('vdelta').applyOptions({ scaleMargins: { top: 0.78, bottom: 0.02 } });
            s.setData(d); indicatorSeriesRef.current.push(s);
          }
          else if (indId === 'cvd') {
            const d = calcCVD(chartData);
            const s = chart.addLineSeries({ color: ind.color, lineWidth: 1.5, priceScaleId: 'cvd', lastValueVisible: true });
            chart.priceScale('cvd').applyOptions({ scaleMargins: { top: 0.78, bottom: 0.02 } });
            s.setData(d); indicatorSeriesRef.current.push(s);
          }
        }
      } catch (e) { console.warn('Indicator error:', indId, e); }
    });

    chart.timeScale().fitContent();
  }, [chartType, chartData, isDark, activeIndicators]);

  function toggleIndicator(id) {
    setActiveIndicators(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  // Group indicators
  const groups = {};
  AVAILABLE_INDICATORS.forEach(i => { if (!groups[i.group]) groups[i.group] = []; groups[i.group].push(i); });

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 10 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Chart type */}
          <div style={{ display: 'flex', gap: 3, background: 'var(--bg-secondary)', borderRadius: 8, padding: 3 }}>
            {[{ key: 'candlestick', label: '🕯️' }, { key: 'line', label: '📈' }].map(ct => (
              <button key={ct.key} onClick={() => setChartType(ct.key)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 14, border: 'none', cursor: 'pointer', background: chartType === ct.key ? 'var(--green-dim)' : 'transparent', color: chartType === ct.key ? 'var(--green)' : 'var(--text-muted)' }}>{ct.label}</button>
            ))}
          </div>
          {/* Timeframes */}
          <div style={{ display: 'flex', gap: 2 }}>
            {TIMEFRAMES.map(tf => (
              <button key={tf.key} onClick={() => setActiveTimeframe(tf.key)} style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", background: activeTimeframe === tf.key ? 'var(--green-dim)' : 'transparent', border: `1px solid ${activeTimeframe === tf.key ? 'rgba(99,220,160,0.2)' : 'transparent'}`, color: activeTimeframe === tf.key ? 'var(--green)' : 'var(--text-muted)' }}>{tf.label}</button>
            ))}
          </div>
          {/* Indicators button */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowIndicatorPanel(!showIndicatorPanel)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", background: activeIndicators.length > 0 ? 'var(--blue-dim)' : 'transparent', color: activeIndicators.length > 0 ? 'var(--blue)' : 'var(--text-muted)' }}>
              📊 {activeIndicators.length > 0 ? `(${activeIndicators.length})` : 'Indicators'}
            </button>
            {/* Indicator Panel Dropdown */}
            {showIndicatorPanel && (
              <div style={{ position: 'absolute', top: '120%', right: 0, zIndex: 50, width: 260, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: 'var(--shadow-lg)', padding: 8, maxHeight: 360, overflowY: 'auto' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '4px 8px', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Indicators</div>
                {Object.entries(groups).map(([groupName, items]) => (
                  <div key={groupName}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', padding: '8px 8px 4px', borderTop: '1px solid var(--border)', marginTop: 4 }}>{groupName}</div>
                    {items.map(ind => {
                      const active = activeIndicators.includes(ind.id);
                      return (
                        <div key={ind.id} onClick={() => toggleIndicator(ind.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 6, cursor: 'pointer', background: active ? 'var(--green-dim)' : 'transparent', transition: 'all 0.1s' }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--hover-subtle)'; }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                          <span style={{ width: 10, height: 10, borderRadius: 3, background: ind.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? 'var(--green)' : 'var(--text-secondary)', flex: 1 }}>{ind.name}</span>
                          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{ind.type === 'overlay' ? 'overlay' : 'sub'}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                {activeIndicators.length > 0 && (
                  <button onClick={() => setActiveIndicators([])} style={{ width: '100%', marginTop: 8, padding: '6px', borderRadius: 6, background: 'var(--red-dim)', color: 'var(--red)', border: 'none', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>Clear All</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative', height: activeIndicators.some(i => AVAILABLE_INDICATORS.find(a => a.id === i)?.type === 'subchart') ? 500 : 400, padding: '0 4px 4px' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? 'rgba(10,14,23,0.6)' : 'rgba(243,242,247,0.6)', zIndex: 10, borderRadius: 10, backdropFilter: 'blur(2px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 18, height: 18, border: '2px solid var(--border)', borderTop: '2px solid var(--green)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading chart...</span>
            </div>
          </div>
        )}
        {error && !loading && (<div style={{ position: 'absolute', top: 8, right: 12, zIndex: 5, fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: 'var(--amber-dim)', color: 'var(--amber)' }}>⚠ {error}</div>)}
        <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', gap: 10, padding: '8px 20px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 2, borderRadius: 1, background: 'var(--green)' }} /> Price</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 6, borderRadius: 1, background: 'var(--green)', opacity: 0.3 }} /> Volume</span>
        {activeIndicators.map(id => {
          const ind = AVAILABLE_INDICATORS.find(i => i.id === id);
          return ind ? <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 2, borderRadius: 1, background: ind.color }} /> {ind.name}</span> : null;
        })}
        <span style={{ marginLeft: 'auto' }}>{TIMEFRAMES.find(t => t.key === activeTimeframe)?.type === 'intraday' ? 'Simulated' : 'Yahoo Finance'}</span>
      </div>
    </div>
  );
}
