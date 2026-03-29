import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { generateIntradayOHLC } from '../utils/simulateOHLC';

const TIMEFRAMES = [
  { label: '5m', key: '5min', type: 'intraday' },
  { label: '15m', key: '15min', type: 'intraday' },
  { label: 'D', key: 'D', type: 'historical' },
  { label: 'W', key: 'W', type: 'historical' },
  { label: 'M', key: 'M', type: 'historical' },
  { label: '3M', key: '3M', type: 'historical' },
  { label: '1Y', key: 'Y', type: 'historical' },
];

// Cache for Yahoo Finance data to avoid re-fetching
const dataCache = {};
function getCacheKey(symbol, tf) { return `${symbol}_${tf}`; }

export default function TradingChart({ symbol, ltp, changePercent }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);

  const [chartType, setChartType] = useState('candlestick');
  const [activeTimeframe, setActiveTimeframe] = useState('D');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Detect theme for chart colors
  const isDark = typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') !== 'light'
    : true;

  const colors = {
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
    line: changePercent >= 0
      ? (isDark ? '#63dca0' : '#10965a')
      : (isDark ? '#f87171' : '#dc2626'),
  };

  // Fetch data based on timeframe
  const fetchData = useCallback(async (tf) => {
    if (!symbol || !ltp) return;
    setLoading(true);
    setError(null);

    try {
      const timeframe = TIMEFRAMES.find(t => t.key === tf);

      if (timeframe.type === 'intraday') {
        // Simulated OHLC for intraday
        const days = tf === '5min' ? 3 : 5;
        const data = generateIntradayOHLC(ltp, changePercent, tf, days);
        setChartData(data);
      } else {
        // Check cache first
        const cacheKey = getCacheKey(symbol, tf);
        if (dataCache[cacheKey] && Date.now() - dataCache[cacheKey].ts < 300000) {
          setChartData(dataCache[cacheKey].data);
          setLoading(false);
          return;
        }

        // Yahoo Finance via Vercel API route
        const res = await fetch(`/api/stock-history?symbol=${encodeURIComponent(symbol)}&interval=${tf}`);
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const json = await res.json();

        if (json.data && json.data.length > 0) {
          dataCache[cacheKey] = { data: json.data, ts: Date.now() };
          setChartData(json.data);
        } else {
          throw new Error('No data returned');
        }
      }
    } catch (err) {
      console.warn('Chart data fetch failed, using simulated data:', err.message);
      setError('Using simulated data');
      // Fallback to simulated data
      const days = tf === '5min' ? 3 : tf === '15min' ? 5 : 30;
      const data = generateIntradayOHLC(ltp, changePercent, '5min', Math.min(days, 15));
      setChartData(data);
    }

    setLoading(false);
  }, [symbol, ltp, changePercent]);

  // Fetch data on symbol or timeframe change
  useEffect(() => {
    if (symbol && ltp) fetchData(activeTimeframe);
  }, [symbol, activeTimeframe, fetchData]);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.bg },
        textColor: colors.text,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: colors.grid },
        horzLines: { color: colors.grid },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: colors.crosshair, labelBackgroundColor: colors.crosshairLabel },
        horzLine: { color: colors.crosshair, labelBackgroundColor: colors.crosshairLabel },
      },
      rightPriceScale: {
        borderColor: colors.border,
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      timeScale: {
        borderColor: colors.border,
        timeVisible: true,
        secondsVisible: false,
      },
      localization: {
        // IST = UTC+5:30 — display all times in Indian Standard Time
        timeFormatter: (timestamp) => {
          const date = new Date(timestamp * 1000);
          // Convert UTC to IST by adding 5h30m
          const ist = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
          const h = ist.getUTCHours().toString().padStart(2, '0');
          const m = ist.getUTCMinutes().toString().padStart(2, '0');
          return `${h}:${m}`;
        },
        dateFormatter: (timestamp) => {
          const date = new Date(timestamp * 1000);
          const ist = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
          const d = ist.getUTCDate();
          const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          const mon = months[ist.getUTCMonth()];
          const y = ist.getUTCFullYear();
          return `${d} ${mon} ${y}`;
        },
      },
      handleScroll: { mouseWheel: true, pressedMouseMove: true },
      handleScale: { mouseWheel: true, pinch: true },
    });

    chartRef.current = chart;

    // Responsive resize
    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || !chartContainerRef.current) return;
      const { width, height } = entries[0].contentRect;
      chart.resize(width, height);
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [isDark]); // Re-create chart when theme changes

  // Update series when chartType or data changes
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || chartData.length === 0) return;

    // Remove existing series
    if (seriesRef.current) {
      try { chart.removeSeries(seriesRef.current); } catch {}
      seriesRef.current = null;
    }
    if (volumeSeriesRef.current) {
      try { chart.removeSeries(volumeSeriesRef.current); } catch {}
      volumeSeriesRef.current = null;
    }

    // Add main series based on chart type
    if (chartType === 'candlestick') {
      const series = chart.addCandlestickSeries({
        upColor: colors.upCandle,
        downColor: colors.downCandle,
        borderDownColor: colors.downCandle,
        borderUpColor: colors.upCandle,
        wickDownColor: colors.downCandle,
        wickUpColor: colors.upCandle,
      });
      series.setData(chartData);
      seriesRef.current = series;
    } else {
      const series = chart.addLineSeries({
        color: colors.line,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        lastValueVisible: true,
        priceLineVisible: true,
      });
      series.setData(chartData.map(d => ({ time: d.time, value: d.close })));
      seriesRef.current = series;
    }

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });
    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
    });
    volumeSeries.setData(chartData.map(d => ({
      time: d.time,
      value: d.volume || 0,
      color: d.close >= d.open ? colors.upVol : colors.downVol,
    })));
    volumeSeriesRef.current = volumeSeries;

    // Fit content
    chart.timeScale().fitContent();
  }, [chartType, chartData, isDark]);

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
      {/* Chart Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px', borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap', gap: 10,
      }}>
        {/* Left: Stock info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{symbol}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>NSE</div>
          </div>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 600 }}>
              ₹{ltp?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            <span style={{
              fontSize: 13, fontWeight: 600, marginLeft: 8,
              color: changePercent >= 0 ? 'var(--green)' : 'var(--red)',
            }}>
              {changePercent >= 0 ? '+' : ''}{changePercent?.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Right: Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Chart Type Toggle */}
          <div style={{ display: 'flex', gap: 3, background: 'var(--bg-secondary)', borderRadius: 8, padding: 3 }}>
            {[
              { key: 'candlestick', label: '🕯️ Candles' },
              { key: 'line', label: '📈 Line' },
            ].map(ct => (
              <button key={ct.key} onClick={() => setChartType(ct.key)} style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                background: chartType === ct.key ? 'var(--green-dim)' : 'transparent',
                color: chartType === ct.key ? 'var(--green)' : 'var(--text-muted)',
                transition: 'all 0.15s',
              }}>{ct.label}</button>
            ))}
          </div>

          {/* Timeframe Buttons */}
          <div style={{ display: 'flex', gap: 3 }}>
            {TIMEFRAMES.map(tf => (
              <button key={tf.key} onClick={() => setActiveTimeframe(tf.key)} style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                background: activeTimeframe === tf.key ? 'var(--green-dim)' : 'transparent',
                border: `1px solid ${activeTimeframe === tf.key ? 'rgba(99,220,160,0.2)' : 'transparent'}`,
                color: activeTimeframe === tf.key ? 'var(--green)' : 'var(--text-muted)',
                transition: 'all 0.15s',
              }}>{tf.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div style={{ position: 'relative', height: 400, padding: '0 4px 4px' }}>
        {loading && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: isDark ? 'rgba(10,14,23,0.6)' : 'rgba(244,246,249,0.6)',
            zIndex: 10, borderRadius: 10, backdropFilter: 'blur(2px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 18, height: 18, border: '2px solid var(--border)',
                borderTop: '2px solid var(--green)', borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading chart...</span>
            </div>
          </div>
        )}

        {/* Error/fallback notice */}
        {error && !loading && (
          <div style={{
            position: 'absolute', top: 8, right: 12, zIndex: 5,
            fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 6,
            background: 'var(--amber-dim)', color: 'var(--amber)',
          }}>
            ⚠ {error}
          </div>
        )}

        <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Chart Footer — Legend */}
      <div style={{
        display: 'flex', gap: 14, padding: '8px 20px',
        borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 2, borderRadius: 1, background: 'var(--green)' }} /> Price
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 6, borderRadius: 1, background: 'var(--green)', opacity: 0.3 }} /> Volume
        </span>
        <span style={{ marginLeft: 'auto' }}>
          {TIMEFRAMES.find(t => t.key === activeTimeframe)?.type === 'intraday' ? 'Simulated candles' : 'Yahoo Finance data'}
        </span>
      </div>
    </div>
  );
}
