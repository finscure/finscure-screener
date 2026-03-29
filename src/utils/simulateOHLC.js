// ═══════════════════════════════════════════════════════
// Simulated OHLC data for intraday timeframes (5min, 15min)
// All timestamps are in IST (UTC+5:30) — Indian market hours
// NSE trading: 9:15 AM to 3:30 PM IST
// ═══════════════════════════════════════════════════════

// IST offset in milliseconds: +5 hours 30 minutes
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

/**
 * Create a Date object representing a specific IST time,
 * and return the correct UTC unix timestamp for it.
 */
function istToUTC(year, month, day, hours, minutes) {
  // Build the date as if it's UTC, then subtract IST offset
  // This gives us the UTC moment that corresponds to the given IST time
  const utcDate = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0));
  return new Date(utcDate.getTime() - IST_OFFSET_MS);
}

/**
 * Get current date/time in IST
 */
function getNowIST() {
  const now = new Date();
  return new Date(now.getTime() + IST_OFFSET_MS);
}

/**
 * Check if a date (in IST) is a weekend
 */
function isWeekend(year, month, day) {
  const d = new Date(Date.UTC(year, month, day));
  const dow = d.getUTCDay();
  return dow === 0 || dow === 6;
}

export function generateIntradayOHLC(ltp, changePercent, interval = '5min', tradingDays = 5) {
  const candles = [];
  if (!ltp || ltp <= 0) return candles;

  const intervalMinutes = interval === '5min' ? 5 : 15;
  const candlesPerDay = Math.floor(375 / intervalMinutes); // NSE: 9:15 AM – 3:30 PM = 375 mins

  // Estimate daily volatility from change%
  const dailyVol = Math.max(Math.abs(changePercent) * 0.01, 0.012);
  const candleVol = dailyVol / Math.sqrt(candlesPerDay);

  // Start price: work backward from LTP
  let currentPrice = ltp * (1 - (changePercent / 100) * tradingDays * 0.2);

  // Get current IST date
  const nowIST = getNowIST();
  const todayYear = nowIST.getUTCFullYear();
  const todayMonth = nowIST.getUTCMonth();
  const todayDate = nowIST.getUTCDate();

  // Collect trading days going backward from today
  const tradingDates = [];
  let checkDate = new Date(Date.UTC(todayYear, todayMonth, todayDate));
  while (tradingDates.length < tradingDays) {
    const y = checkDate.getUTCFullYear();
    const m = checkDate.getUTCMonth();
    const d = checkDate.getUTCDate();
    if (!isWeekend(y, m, d)) {
      tradingDates.unshift({ year: y, month: m, day: d }); // prepend so oldest first
    }
    checkDate.setUTCDate(checkDate.getUTCDate() - 1);
  }

  // Generate candles for each trading day
  for (const td of tradingDates) {
    for (let c = 0; c < candlesPerDay; c++) {
      const candleHour = 9 + Math.floor((15 + c * intervalMinutes) / 60);
      const candleMin = (15 + c * intervalMinutes) % 60;

      // Get UTC timestamp for this IST time
      const utcMoment = istToUTC(td.year, td.month, td.day, candleHour, candleMin);
      const timestamp = Math.floor(utcMoment.getTime() / 1000);

      const open = currentPrice;
      const bias = changePercent >= 0 ? 0.48 : 0.52;
      const move1 = open * candleVol * (Math.random() - bias);
      const move2 = open * candleVol * (Math.random() - 0.5);
      const close = open + move1;
      const high = Math.max(open, close) + Math.abs(move2) * 0.5;
      const low = Math.min(open, close) - Math.abs(move2) * 0.5;

      candles.push({
        time: timestamp,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: Math.floor(50000 + Math.random() * 200000),
      });

      currentPrice = close;
    }
  }

  // Scale all candles so the last candle's close matches actual LTP
  if (candles.length > 0) {
    const scaleFactor = ltp / candles[candles.length - 1].close;
    if (isFinite(scaleFactor) && scaleFactor > 0) {
      candles.forEach(c => {
        c.open = parseFloat((c.open * scaleFactor).toFixed(2));
        c.high = parseFloat((c.high * scaleFactor).toFixed(2));
        c.low = parseFloat((c.low * scaleFactor).toFixed(2));
        c.close = parseFloat((c.close * scaleFactor).toFixed(2));
      });
    }
  }

  return candles;
}
