// Simulated OHLC for intraday timeframes
// Generates candles with IST timestamps (9:15 AM - 3:30 PM)

export function generateIntradayOHLC(ltp, changePercent, interval = '5min', tradingDays = 5) {
  const candles = [];
  if (!ltp || ltp <= 0) return candles;

  const intervalMinutes = interval === '5min' ? 5 : 15;
  const candlesPerDay = Math.floor(375 / intervalMinutes); // NSE: 9:15 AM – 3:30 PM = 375 mins
  const dailyVol = Math.max(Math.abs(changePercent) * 0.01, 0.012);
  const candleVol = dailyVol / Math.sqrt(candlesPerDay);

  let currentPrice = ltp * (1 - (changePercent / 100) * tradingDays * 0.2);
  const now = new Date();

  // Get current IST date
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  for (let day = tradingDays - 1; day >= 0; day--) {
    const date = new Date(istNow);
    date.setDate(date.getDate() - day);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    for (let c = 0; c < candlesPerDay; c++) {
      // Create IST time: 9:15 AM + c * interval
      const hour = Math.floor((9 * 60 + 15 + c * intervalMinutes) / 60);
      const minute = (9 * 60 + 15 + c * intervalMinutes) % 60;

      // Build a Date object in IST, then convert to UTC unix timestamp
      const istDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0);
      // Convert IST to UTC: subtract 5h30m
      const utcTimestamp = Math.floor(istDate.getTime() / 1000) - 19800;

      const open = currentPrice;
      const bias = changePercent >= 0 ? 0.48 : 0.52;
      const move1 = open * candleVol * (Math.random() - bias);
      const move2 = open * candleVol * (Math.random() - 0.5);
      const close = open + move1;
      const high = Math.max(open, close) + Math.abs(move2) * 0.5;
      const low = Math.min(open, close) - Math.abs(move2) * 0.5;

      candles.push({
        time: utcTimestamp,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: Math.floor(50000 + Math.random() * 200000),
      });

      currentPrice = close;
    }
  }

  // Scale all candles so last close matches actual LTP
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
