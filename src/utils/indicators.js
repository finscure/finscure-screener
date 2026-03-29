// ═══════════════════════════════════════════════════════
// Technical Indicator Calculations
// All functions take OHLC data array [{time, open, high, low, close}]
// and return [{time, value}] arrays for chart rendering
// ═══════════════════════════════════════════════════════

/**
 * Simple Moving Average
 * @param {Array} data - OHLC data with .close
 * @param {number} period - SMA period (e.g., 20, 50, 200)
 * @returns {Array} [{time, value}]
 */
export function calcSMA(data, period) {
  const result = [];
  if (data.length < period) return result;

  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += data[j].close;
    }
    result.push({
      time: data[i].time,
      value: parseFloat((sum / period).toFixed(2)),
    });
  }
  return result;
}

/**
 * Exponential Moving Average
 * @param {Array} data - OHLC data with .close
 * @param {number} period - EMA period (e.g., 12, 26)
 * @returns {Array} [{time, value}]
 */
export function calcEMA(data, period) {
  const result = [];
  if (data.length < period) return result;

  const multiplier = 2 / (period + 1);

  // First EMA value = SMA of first `period` values
  let sum = 0;
  for (let i = 0; i < period; i++) sum += data[i].close;
  let ema = sum / period;
  result.push({
    time: data[period - 1].time,
    value: parseFloat(ema.toFixed(2)),
  });

  // Subsequent EMA values
  for (let i = period; i < data.length; i++) {
    ema = (data[i].close - ema) * multiplier + ema;
    result.push({
      time: data[i].time,
      value: parseFloat(ema.toFixed(2)),
    });
  }
  return result;
}

/**
 * Relative Strength Index
 * @param {Array} data - OHLC data with .close
 * @param {number} period - RSI period (default 14)
 * @returns {Array} [{time, value}] where value is 0-100
 */
export function calcRSI(data, period = 14) {
  const result = [];
  if (data.length < period + 1) return result;

  // Calculate initial average gain/loss
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = data[i].close - data[i - 1].close;
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;
  let rsi = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
  result.push({
    time: data[period].time,
    value: parseFloat(rsi.toFixed(2)),
  });

  // Smoothed RSI for subsequent values (Wilder's smoothing)
  for (let i = period + 1; i < data.length; i++) {
    const diff = data[i].close - data[i - 1].close;
    avgGain = (avgGain * (period - 1) + Math.max(diff, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-diff, 0)) / period;
    rsi = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
    result.push({
      time: data[i].time,
      value: parseFloat(rsi.toFixed(2)),
    });
  }
  return result;
}

/**
 * MACD (Moving Average Convergence Divergence)
 * @param {Array} data - OHLC data with .close
 * @param {number} fastPeriod - Fast EMA period (default 12)
 * @param {number} slowPeriod - Slow EMA period (default 26)
 * @param {number} signalPeriod - Signal line EMA period (default 9)
 * @returns {Object} { macdLine: [{time,value}], signalLine: [{time,value}], histogram: [{time,value,color}] }
 */
export function calcMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  const fastEMA = calcEMA(data, fastPeriod);
  const slowEMA = calcEMA(data, slowPeriod);

  if (fastEMA.length === 0 || slowEMA.length === 0) {
    return { macdLine: [], signalLine: [], histogram: [] };
  }

  // Align by time — only use data points where both EMAs exist
  const slowTimes = new Set(slowEMA.map(d => d.time));
  const aligned = fastEMA.filter(d => slowTimes.has(d.time));
  const slowMap = Object.fromEntries(slowEMA.map(d => [d.time, d.value]));

  // MACD Line = Fast EMA - Slow EMA
  const macdLine = aligned.map(d => ({
    time: d.time,
    value: parseFloat((d.value - slowMap[d.time]).toFixed(2)),
  }));

  if (macdLine.length < signalPeriod) {
    return { macdLine, signalLine: [], histogram: [] };
  }

  // Signal Line = EMA of MACD Line
  const signalData = macdLine.map(d => ({ time: d.time, close: d.value }));
  const signalLine = calcEMA(signalData, signalPeriod);

  // Histogram = MACD Line - Signal Line
  const signalMap = Object.fromEntries(signalLine.map(d => [d.time, d.value]));
  const histogram = macdLine
    .filter(d => signalMap[d.time] !== undefined)
    .map(d => ({
      time: d.time,
      value: parseFloat((d.value - signalMap[d.time]).toFixed(2)),
      color: d.value - signalMap[d.time] >= 0
        ? 'rgba(99,220,160,0.5)'
        : 'rgba(248,113,113,0.5)',
    }));

  return { macdLine, signalLine, histogram };
}

/**
 * Bollinger Bands
 * @param {Array} data - OHLC data with .close
 * @param {number} period - SMA period (default 20)
 * @param {number} stdDev - Standard deviation multiplier (default 2)
 * @returns {Object} { upper: [{time,value}], middle: [{time,value}], lower: [{time,value}] }
 */
export function calcBollingerBands(data, period = 20, stdDev = 2) {
  const upper = [], middle = [], lower = [];
  if (data.length < period) return { upper, middle, lower };

  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const mean = slice.reduce((s, d) => s + d.close, 0) / period;
    const variance = slice.reduce((s, d) => s + Math.pow(d.close - mean, 2), 0) / period;
    const sd = Math.sqrt(variance);

    middle.push({ time: data[i].time, value: parseFloat(mean.toFixed(2)) });
    upper.push({ time: data[i].time, value: parseFloat((mean + stdDev * sd).toFixed(2)) });
    lower.push({ time: data[i].time, value: parseFloat((mean - stdDev * sd).toFixed(2)) });
  }

  return { upper, middle, lower };
}
