// ═══════════════════════════════════════════════════════
// Simulated OHLC data for intraday timeframes (5min, 15min)
// Generates realistic candles from LTP + change% data
// Used when Yahoo Finance data is unavailable (intraday)
// ═══════════════════════════════════════════════════════

export function generateIntradayOHLC(ltp, changePercent, interval = '5min', tradingDays = 5) {
  const candles = [];
  if (!ltp || ltp <= 0) return candles;

  const intervalMinutes = interval === '5min' ? 5 : 15;
  const candlesPerDay = Math.floor(375 / intervalMinutes); // NSE: 9:15 AM – 3:30 PM = 375 mins

  // Estimate daily volatility from change%
  const dailyVol = Math.max(Math.abs(changePercent) * 0.01, 0.012); // min 1.2% daily vol
  const candleVol = dailyVol / Math.sqrt(candlesPerDay);

  // Start price: work backward from LTP
  let currentPrice = ltp * (1 - (changePercent / 100) * tradingDays * 0.2);
  const now = new Date();

  for (let day = tradingDays - 1; day >= 0; day--) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    // Set to 9:15 AM IST (UTC+5:30)
    date.setHours(9, 15, 0, 0);

    for (let c = 0; c < candlesPerDay; c++) {
      const candleTime = new Date(date.getTime() + c * intervalMinutes * 60000);
      const timestamp = Math.floor(candleTime.getTime() / 1000);

      const open = currentPrice;
      // Slight directional bias based on overall change
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
