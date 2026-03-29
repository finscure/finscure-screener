// Vercel Serverless Function — /api/stock-history
// Proxies Yahoo Finance chart API for NSE stock OHLC data
// Supports daily, weekly, monthly intervals

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { symbol, interval = 'D' } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'Missing symbol parameter' });
  }

  // Map Finscure timeframe keys to Yahoo Finance params
  const configMap = {
    'D':  { interval: '1d',  range: '6mo' },
    'W':  { interval: '1d',  range: '1y'  },
    'M':  { interval: '1d',  range: '2y'  },
    '3M': { interval: '1wk', range: '3y'  },
    'Y':  { interval: '1wk', range: '5y'  },
  };

  const config = configMap[interval] || configMap['D'];
  const nseSym = `${symbol}.NS`;

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(nseSym)}?interval=${config.interval}&range=${config.range}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Yahoo Finance returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      throw new Error('No data returned from Yahoo Finance');
    }

    const result = data.chart.result[0];
    const timestamps = result.timestamp || [];
    const quote = result.indicators.quote[0];

    const ohlc = timestamps.map((t, i) => ({
      time: Math.floor(t), // Unix timestamp in seconds (Lightweight Charts format)
      open: quote.open[i],
      high: quote.high[i],
      low: quote.low[i],
      close: quote.close[i],
      volume: quote.volume[i],
    })).filter(d => d.open !== null && d.close !== null && isFinite(d.open));

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ symbol, interval, data: ohlc });
  } catch (error) {
    console.error('Yahoo Finance fetch error:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch stock data',
      message: error.message,
      symbol,
    });
  }
}
