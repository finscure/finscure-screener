export default async function handler(req, res) {
  const { symbol, interval = 'D' } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  // Map Finscure intervals to Yahoo Finance parameters
  const yahooRangeMap = {
    'D':    { interval: '1d', range: '6mo' },
    'W':    { interval: '1d', range: '1y' },
    'M':    { interval: '1d', range: '2y' },
    '3M':   { interval: '1wk', range: '3y' },
    'Y':    { interval: '1wk', range: '5y' },
    'SEASONALITY': { interval: '1mo', range: 'max' },
  };

  const config = yahooRangeMap[interval] || yahooRangeMap['D'];
  const nseSym = `${symbol}.NS`;

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(nseSym)}?interval=${config.interval}&range=${config.range}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Yahoo Finance returned ${response.status}` });
    }

    const data = await response.json();
    
    if (!data.chart || !data.chart.result || !data.chart.result[0]) {
      return res.status(404).json({ error: 'No data found for this symbol' });
    }

    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0];

    if (!timestamps || !quote) {
      return res.status(404).json({ error: 'Incomplete data from Yahoo Finance' });
    }

    const ohlc = timestamps.map((t, i) => ({
      time: Math.floor(t),
      open: quote.open[i],
      high: quote.high[i],
      low: quote.low[i],
      close: quote.close[i],
      volume: quote.volume[i],
    })).filter(d => d.open !== null && d.close !== null);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    
    return res.status(200).json({ symbol, data: ohlc });
  } catch (error) {
    console.error('Yahoo Finance error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch stock data: ' + error.message });
  }
}
