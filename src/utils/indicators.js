// ═══════════════════════════════════════════════════════
// Finscure Indicators — Technical + Order Flow
// ═══════════════════════════════════════════════════════

// ═══ EXISTING INDICATORS ═══

export function calcSMA(data, period) {
  const result = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((s, d) => s + d.close, 0);
    result.push({ time: data[i].time, value: parseFloat((sum / period).toFixed(2)) });
  }
  return result;
}

export function calcEMA(data, period) {
  if (data.length < period) return [];
  const result = [];
  const multiplier = 2 / (period + 1);
  let sum = 0;
  for (let i = 0; i < period; i++) sum += data[i].close;
  let ema = sum / period;
  result.push({ time: data[period - 1].time, value: parseFloat(ema.toFixed(2)) });
  for (let i = period; i < data.length; i++) {
    ema = (data[i].close - ema) * multiplier + ema;
    result.push({ time: data[i].time, value: parseFloat(ema.toFixed(2)) });
  }
  return result;
}

export function calcRSI(data, period = 14) {
  if (data.length < period + 1) return [];
  const result = [];
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = data[i].close - data[i - 1].close;
    if (diff >= 0) gains += diff; else losses -= diff;
  }
  let avgGain = gains / period;
  let avgLoss = losses / period;
  let rsi = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
  result.push({ time: data[period].time, value: parseFloat(rsi.toFixed(2)) });
  for (let i = period + 1; i < data.length; i++) {
    const diff = data[i].close - data[i - 1].close;
    avgGain = (avgGain * (period - 1) + Math.max(diff, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-diff, 0)) / period;
    rsi = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
    result.push({ time: data[i].time, value: parseFloat(rsi.toFixed(2)) });
  }
  return result;
}

export function calcMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  const fastEMA = calcEMA(data, fastPeriod);
  const slowEMA = calcEMA(data, slowPeriod);
  const slowTimes = new Set(slowEMA.map(d => d.time));
  const aligned = fastEMA.filter(d => slowTimes.has(d.time));
  const slowMap = Object.fromEntries(slowEMA.map(d => [d.time, d.value]));
  const macdLine = aligned.map(d => ({ time: d.time, value: parseFloat((d.value - slowMap[d.time]).toFixed(2)) }));
  const signalData = macdLine.map(d => ({ time: d.time, close: d.value }));
  const signalLine = calcEMA(signalData, signalPeriod);
  const signalMap = Object.fromEntries(signalLine.map(d => [d.time, d.value]));
  const histogram = macdLine.filter(d => signalMap[d.time] !== undefined).map(d => ({
    time: d.time, value: parseFloat((d.value - signalMap[d.time]).toFixed(2)),
    color: d.value - signalMap[d.time] >= 0 ? 'rgba(99,220,160,0.5)' : 'rgba(248,113,113,0.5)',
  }));
  return { macdLine, signalLine, histogram };
}

export function calcBollingerBands(data, period = 20, stdDev = 2) {
  const upper = [], middle = [], lower = [];
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

// ═══════════════════════════════════════════════════════
// ORDER FLOW INDICATORS
// ═══════════════════════════════════════════════════════

/**
 * Volume Delta — estimates buying vs selling volume per candle
 * Method: Uses candle close position within high-low range to split volume
 * If close is near high → most volume is buying
 * If close is near low → most volume is selling
 * Formula: buyVol = volume * (close - low) / (high - low)
 *          sellVol = volume - buyVol
 *          delta = buyVol - sellVol
 */
export function calcVolumeDelta(data) {
  return data.map(d => {
    const range = d.high - d.low;
    if (range === 0 || !d.volume) {
      return { time: d.time, value: 0, color: 'rgba(99,220,160,0.4)' };
    }
    const buyRatio = (d.close - d.low) / range;
    const buyVol = d.volume * buyRatio;
    const sellVol = d.volume - buyVol;
    const delta = Math.round(buyVol - sellVol);
    return {
      time: d.time,
      value: delta,
      color: delta >= 0 ? 'rgba(99,220,160,0.5)' : 'rgba(248,113,113,0.5)',
    };
  });
}

/**
 * Cumulative Volume Delta — running sum of per-candle delta
 * Shows whether buying or selling pressure dominates over time
 * Rising CVD + rising price = healthy uptrend (confirmed)
 * Rising price + falling CVD = divergence (potential reversal)
 */
export function calcCVD(data) {
  let cumulative = 0;
  return data.map(d => {
    const range = d.high - d.low;
    if (range > 0 && d.volume) {
      const buyRatio = (d.close - d.low) / range;
      const delta = d.volume * buyRatio - d.volume * (1 - buyRatio);
      cumulative += delta;
    }
    return { time: d.time, value: Math.round(cumulative) };
  });
}

/**
 * VWAP — Volume Weighted Average Price
 * Institutional benchmark price. Price above VWAP = buyers in control.
 * Calculated as cumulative(price × volume) / cumulative(volume)
 * Resets each trading day for intraday, runs continuously for daily+
 */
export function calcVWAP(data) {
  let cumPV = 0;
  let cumVol = 0;
  let lastDay = null;

  return data.map(d => {
    // Typical price = (H + L + C) / 3
    const tp = (d.high + d.low + d.close) / 3;
    const vol = d.volume || 0;

    // Detect day change for intraday reset
    const date = new Date(d.time * 1000);
    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    // For intraday data, reset VWAP each day
    // For daily data, run continuously (don't reset)
    const isIntraday = data.length > 100; // rough heuristic
    if (isIntraday && lastDay !== null && dayKey !== lastDay) {
      cumPV = 0;
      cumVol = 0;
    }
    lastDay = dayKey;

    cumPV += tp * vol;
    cumVol += vol;

    const vwap = cumVol > 0 ? cumPV / cumVol : tp;
    return { time: d.time, value: parseFloat(vwap.toFixed(2)) };
  });
}

/**
 * Volume Profile — horizontal histogram showing volume at each price level
 * Groups price range into N buckets and sums volume in each bucket
 * Returns array of { price, volume, side } for rendering as horizontal bars
 * POC (Point of Control) = price level with highest volume
 */
export function calcVolumeProfile(data, buckets = 24) {
  if (data.length === 0) return { levels: [], poc: 0, valueAreaHigh: 0, valueAreaLow: 0 };

  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const range = maxPrice - minPrice;
  if (range === 0) return { levels: [], poc: minPrice, valueAreaHigh: minPrice, valueAreaLow: minPrice };

  const bucketSize = range / buckets;
  const profile = new Array(buckets).fill(null).map((_, i) => ({
    priceLevel: parseFloat((minPrice + (i + 0.5) * bucketSize).toFixed(2)),
    priceLow: minPrice + i * bucketSize,
    priceHigh: minPrice + (i + 1) * bucketSize,
    buyVolume: 0,
    sellVolume: 0,
    totalVolume: 0,
  }));

  // Distribute each candle's volume across the price buckets it touches
  data.forEach(d => {
    const vol = d.volume || 0;
    if (vol === 0) return;
    const candleRange = d.high - d.low;
    if (candleRange === 0) return;

    const buyRatio = (d.close - d.low) / candleRange;

    for (let b = 0; b < buckets; b++) {
      const bLow = profile[b].priceLow;
      const bHigh = profile[b].priceHigh;
      // How much of the candle overlaps this bucket?
      const overlapLow = Math.max(d.low, bLow);
      const overlapHigh = Math.min(d.high, bHigh);
      if (overlapHigh <= overlapLow) continue;

      const overlapFraction = (overlapHigh - overlapLow) / candleRange;
      const bucketVol = vol * overlapFraction;

      profile[b].buyVolume += Math.round(bucketVol * buyRatio);
      profile[b].sellVolume += Math.round(bucketVol * (1 - buyRatio));
      profile[b].totalVolume += Math.round(bucketVol);
    }
  });

  // Find POC (Point of Control)
  let maxVol = 0;
  let pocPrice = 0;
  profile.forEach(p => {
    if (p.totalVolume > maxVol) {
      maxVol = p.totalVolume;
      pocPrice = p.priceLevel;
    }
  });

  // Value Area (70% of volume around POC)
  const totalVol = profile.reduce((s, p) => s + p.totalVolume, 0);
  const vaTarget = totalVol * 0.7;
  const pocIdx = profile.findIndex(p => p.priceLevel === pocPrice);
  let vaVol = profile[pocIdx]?.totalVolume || 0;
  let lo = pocIdx, hi = pocIdx;

  while (vaVol < vaTarget && (lo > 0 || hi < buckets - 1)) {
    const tryLo = lo > 0 ? profile[lo - 1].totalVolume : -1;
    const tryHi = hi < buckets - 1 ? profile[hi + 1].totalVolume : -1;
    if (tryLo >= tryHi && lo > 0) { lo--; vaVol += profile[lo].totalVolume; }
    else if (hi < buckets - 1) { hi++; vaVol += profile[hi].totalVolume; }
    else break;
  }

  return {
    levels: profile.filter(p => p.totalVolume > 0),
    poc: pocPrice,
    valueAreaHigh: profile[hi]?.priceHigh || maxPrice,
    valueAreaLow: profile[lo]?.priceLow || minPrice,
    maxVolume: maxVol,
  };
}

// ═══════════════════════════════════════════════════════
// SEASONALITY ANALYSIS
// ═══════════════════════════════════════════════════════

/**
 * Monthly Seasonality — average return for each month across years
 * Input: daily OHLC data (at least 2 years)
 * Returns: array of { month: 'Jan', avgReturn, winRate, years }
 */
export function calcMonthlySeasonality(data) {
  if (data.length < 60) return []; // Need at least ~2 months of data

  const monthlyReturns = {}; // { 'Jan': [2.3, -1.1, ...], 'Feb': [...], ... }
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Group data by month-year and calculate monthly return
  let prevMonthClose = null;
  let currentMonth = -1;
  let currentYear = -1;
  let monthOpen = null;

  data.forEach(d => {
    const date = new Date(d.time * 1000);
    const m = date.getMonth();
    const y = date.getFullYear();

    if (m !== currentMonth || y !== currentYear) {
      // New month — record previous month's return
      if (monthOpen !== null && prevMonthClose !== null && currentMonth >= 0) {
        const ret = ((prevMonthClose - monthOpen) / monthOpen) * 100;
        const key = monthNames[currentMonth];
        if (!monthlyReturns[key]) monthlyReturns[key] = [];
        monthlyReturns[key].push(ret);
      }
      currentMonth = m;
      currentYear = y;
      monthOpen = d.open;
    }
    prevMonthClose = d.close;
  });

  // Don't forget the last month
  if (monthOpen !== null && prevMonthClose !== null && currentMonth >= 0) {
    const ret = ((prevMonthClose - monthOpen) / monthOpen) * 100;
    const key = monthNames[currentMonth];
    if (!monthlyReturns[key]) monthlyReturns[key] = [];
    monthlyReturns[key].push(ret);
  }

  return monthNames.map(month => {
    const returns = monthlyReturns[month] || [];
    const avg = returns.length > 0 ? returns.reduce((s, r) => s + r, 0) / returns.length : 0;
    const wins = returns.filter(r => r > 0).length;
    return {
      month,
      avgReturn: parseFloat(avg.toFixed(2)),
      winRate: returns.length > 0 ? Math.round((wins / returns.length) * 100) : 0,
      years: returns.length,
      returns,
    };
  });
}

/**
 * Day-of-Week Seasonality — average return for each weekday
 * Input: daily OHLC data
 * Returns: array of { day: 'Mon', avgReturn, winRate, count }
 */
export function calcDayOfWeekSeasonality(data) {
  if (data.length < 20) return [];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayReturns = { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [] };

  for (let i = 1; i < data.length; i++) {
    const date = new Date(data[i].time * 1000);
    const dayName = dayNames[date.getDay()];
    if (dayReturns[dayName] !== undefined) {
      const ret = ((data[i].close - data[i - 1].close) / data[i - 1].close) * 100;
      dayReturns[dayName].push(ret);
    }
  }

  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
    const returns = dayReturns[day];
    const avg = returns.length > 0 ? returns.reduce((s, r) => s + r, 0) / returns.length : 0;
    const wins = returns.filter(r => r > 0).length;
    return {
      day,
      avgReturn: parseFloat(avg.toFixed(3)),
      winRate: returns.length > 0 ? Math.round((wins / returns.length) * 100) : 0,
      count: returns.length,
    };
  });
}
