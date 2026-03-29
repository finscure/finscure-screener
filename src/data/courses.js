// ═══════════════════════════════════════════════════════════
// FINSCURE COURSE CURRICULUM — 30 Modules · 268 Lessons · 139 Hours
// Organized in 8 Sections
// ═══════════════════════════════════════════════════════════

export const SECTIONS = [
  {
    id: "foundation",
    title: "Foundation",
    icon: "🏗️",
    color: "var(--green)",
    description: "Build your stock market knowledge from the ground up",
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis",
    icon: "🏦",
    color: "var(--blue)",
    description: "Evaluate companies through financial statements and valuation",
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis",
    icon: "📈",
    color: "var(--amber)",
    description: "Read charts, patterns, and indicators to time your trades",
  },
  {
    id: "smart-money",
    title: "Smart Money Concepts",
    icon: "🧠",
    color: "var(--purple)",
    description: "Understand how institutional traders move markets",
  },
  {
    id: "derivatives",
    title: "Derivatives",
    icon: "⚡",
    color: "var(--red)",
    description: "Master futures, options, Greeks, and derivatives strategies",
  },
  {
    id: "multi-asset",
    title: "Multi-Asset Trading",
    icon: "🌍",
    color: "var(--amber)",
    description: "Expand into commodities, forex, and global markets",
  },
  {
    id: "risk-psychology",
    title: "Risk & Psychology",
    icon: "🛡️",
    color: "var(--green)",
    description: "Protect capital and master the mental game of trading",
  },
  {
    id: "advanced-quant",
    title: "Advanced & Quantitative",
    icon: "🤖",
    color: "var(--blue)",
    description: "Algorithmic trading, backtesting, and portfolio construction",
  },
];

export const COURSES = [
  // ═══════════ FOUNDATION (5 modules) ═══════════
  {
    id: "01-getting-started", num: "01", section: "foundation",
    title: "Getting Started with the Stock Market",
    description: "Understand what stocks are, how exchanges function, key market participants (retail, institutional, FIIs, DIIs), trading sessions, and essential terminology every investor must know.",
    icon: "📊", level: "Beginner", lessons: 8, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #065f46 0%, #10965a 100%)",
    modules: [
      { id: "m1", title: "Introduction to Stocks", lessons: [
        { id: "l1", title: "What is a Stock?", type: "article", duration: "12 min", content: [{ type: "heading", text: "Understanding Stocks" }, { type: "paragraph", text: "A stock represents a unit of ownership in a company. When you buy shares of Reliance Industries, you become a part-owner of that business." }, { type: "callout", text: "Key Takeaway: Stocks = ownership. You profit through price appreciation or dividends." }] },
        { id: "l2", title: "How Stock Exchanges Work", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "NSE and BSE are India's two major exchanges where stocks are bought and sold electronically." }] },
        { id: "l3", title: "Market Participants — Retail, FII, DII", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "The market has retail investors, foreign institutional investors (FIIs), domestic institutional investors (DIIs), and HNIs." }] },
        { id: "l4", title: "Trading Sessions & Market Timings", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "NSE operates from 9:15 AM to 3:30 PM IST with pre-open and post-close sessions." }] },
      ], quiz: { id: "q1", questions: [
        { q: "What does a stock represent?", options: ["A loan", "Ownership in a company", "A bond", "A deposit"], answer: 1 },
        { q: "FII stands for:", options: ["Fixed Income Investors", "Foreign Institutional Investors", "Federal Indian Investments", "Financial Investors"], answer: 1 },
        { q: "NSE normal trading starts at:", options: ["9:00 AM", "9:15 AM", "10:00 AM", "9:30 AM"], answer: 1 },
      ]}},
    ],
  },
  {
    id: "02-stock-exchanges", num: "02", section: "foundation",
    title: "How Stock Exchanges Work",
    description: "Deep dive into NSE and BSE infrastructure, order matching engines, clearing and settlement (T+1), depositories (CDSL, NSDL), demat accounts, and the role of SEBI in market regulation.",
    icon: "🏛", level: "Beginner", lessons: 6, duration: "2.5 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
    modules: [{ id: "m1", title: "Exchange Infrastructure", lessons: [
      { id: "l1", title: "NSE vs BSE — Architecture", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "India's two exchanges serve different roles. NSE dominates volume while BSE has historical significance." }] },
      { id: "l2", title: "Order Matching & Settlement (T+1)", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "India moved to T+1 settlement in 2023 — among the fastest in the world." }] },
      { id: "l3", title: "SEBI & Market Regulation", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "SEBI protects investor interests and regulates all market participants." }] },
    ], quiz: { id: "q1", questions: [{ q: "T+1 settlement means:", options: ["Trade in 1 second", "Settlement next business day", "1% bonus", "Trading at 1 PM"], answer: 1 }] }}],
  },
  {
    id: "03-candlestick-charts", num: "03", section: "foundation",
    title: "Reading Candlestick Charts",
    description: "Learn to read Japanese candlestick charts — open, high, low, close (OHLC) data, timeframes, bullish and bearish candles, and how to interpret price action visually.",
    icon: "🕯", level: "Beginner", lessons: 8, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    modules: [{ id: "m1", title: "Candlestick Basics", lessons: [
      { id: "l1", title: "OHLC — The Four Price Points", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Every candle shows four prices: Open, High, Low, and Close — the foundation of all chart reading." }] },
      { id: "l2", title: "Bullish vs Bearish Candles", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "Green candle = close above open (buyers won). Red candle = close below open (sellers won)." }] },
      { id: "l3", title: "Choosing the Right Timeframe", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Daily charts for swing trading, 15-min for intraday, weekly for investing." }] },
    ], quiz: { id: "q1", questions: [{ q: "A green candle means:", options: ["Price fell", "Close > Open", "High volume", "52-week high"], answer: 1 }] }}],
  },
  {
    id: "04-volume-price-action", num: "04", section: "foundation",
    title: "Understanding Volume & Price Action",
    description: "Master the relationship between volume and price movement. Learn to identify accumulation, distribution, volume spikes, climax volume, and how smart money leaves footprints.",
    icon: "📊", level: "Beginner", lessons: 7, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #4a1d96 0%, #7c3aed 100%)",
    modules: [{ id: "m1", title: "Volume Analysis", lessons: [
      { id: "l1", title: "Why Volume Matters", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Volume confirms price moves. High volume = conviction. Low volume = suspicion." }] },
      { id: "l2", title: "Accumulation & Distribution", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Accumulation is quiet buying by institutions. Distribution is quiet selling before a decline." }] },
    ], quiz: { id: "q1", questions: [{ q: "Rising price on LOW volume indicates:", options: ["Strong rally", "Weak rally, likely to reverse", "Institutional buying", "Breakout"], answer: 1 }] }}],
  },
  {
    id: "05-placing-orders", num: "05", section: "foundation",
    title: "Placing Orders & Order Types",
    description: "Practical guide to market orders, limit orders, stop-loss orders, GTT (Good Till Triggered), bracket orders, cover orders, and AMO (After Market Orders) across major Indian brokers.",
    icon: "🛒", level: "Beginner", lessons: 5, duration: "2 hrs",
    thumb: "linear-gradient(135deg, #854d0e 0%, #d97706 100%)",
    modules: [{ id: "m1", title: "Order Types Explained", lessons: [
      { id: "l1", title: "Market vs Limit Orders", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Market orders execute immediately. Limit orders execute only at your specified price." }] },
      { id: "l2", title: "Stop-Loss & GTT Orders", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "Stop-loss orders protect you from large losses. GTT orders stay active for up to a year." }] },
    ], quiz: { id: "q1", questions: [{ q: "A limit order guarantees:", options: ["Execution", "Price", "Both", "Neither"], answer: 1 }] }}],
  },

  // ═══════════ FUNDAMENTAL ANALYSIS (4 modules) ═══════════
  {
    id: "06-financial-statements", num: "06", section: "fundamental-analysis",
    title: "Reading Financial Statements",
    description: "Decode balance sheets, income statements, and cash flow statements. Learn to identify revenue quality, debt levels, profitability ratios, and red flags in company financials.",
    icon: "📋", level: "Beginner", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
    modules: [{ id: "m1", title: "The Three Financial Statements", lessons: [
      { id: "l1", title: "Income Statement Decoded", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Revenue → Gross Profit → Operating Profit → Net Profit. Each level tells a different story." }] },
      { id: "l2", title: "Balance Sheet Deep Dive", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Assets = Liabilities + Equity. This equation always balances." }] },
      { id: "l3", title: "Cash Flow Statement", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Profit is an opinion, cash is a fact. Follow the money." }] },
    ], quiz: { id: "q1", questions: [{ q: "Assets = Liabilities + ?", options: ["Revenue", "Equity", "Profit", "Debt"], answer: 1 }] }}],
  },
  {
    id: "07-valuation-methods", num: "07", section: "fundamental-analysis",
    title: "Valuation Methods & Metrics",
    description: "Master P/E, P/B, EV/EBITDA, PEG ratio, DCF (Discounted Cash Flow) analysis, and relative valuation. Learn when each method is appropriate and how to calculate intrinsic value.",
    icon: "🧮", level: "Intermediate", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #1e40af 0%, #60a5fa 100%)",
    modules: [{ id: "m1", title: "Valuation Ratios", lessons: [
      { id: "l1", title: "P/E Ratio — The Most Popular Metric", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "P/E tells you how much investors pay for each rupee of earnings. Compare within sectors." }] },
      { id: "l2", title: "EV/EBITDA & DCF Analysis", type: "article", duration: "16 min", content: [{ type: "paragraph", text: "EV/EBITDA removes capital structure bias. DCF is theoretically the most correct valuation method." }] },
    ], quiz: { id: "q1", questions: [{ q: "PEG below 1 suggests:", options: ["Overvalued", "Undervalued relative to growth", "No growth", "High debt"], answer: 1 }] }}],
  },
  {
    id: "08-sector-analysis", num: "08", section: "fundamental-analysis",
    title: "Sector & Industry Analysis",
    description: "Framework for analyzing different sectors — banking, IT, pharma, FMCG, metals, auto, and real estate. Understand sector rotation, cyclical vs defensive sectors, and macro drivers.",
    icon: "🏭", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
    modules: [{ id: "m1", title: "Sector-Wise Analysis", lessons: [
      { id: "l1", title: "Banking — NPA, NIM, CASA", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Banking analysis requires sector-specific metrics not used elsewhere." }] },
    ], quiz: { id: "q1", questions: [{ q: "NPA stands for:", options: ["Net Profit Analysis", "Non-Performing Assets", "National Payment Authority", "New Profit Allocation"], answer: 1 }] }}],
  },
  {
    id: "09-annual-reports", num: "09", section: "fundamental-analysis",
    title: "Annual Report Reading Masterclass",
    description: "How to extract actionable insights from annual reports — management discussion, auditor notes, related party transactions, contingent liabilities, and corporate governance indicators.",
    icon: "📖", level: "Intermediate", lessons: 6, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #312e81 0%, #6366f1 100%)",
    modules: [{ id: "m1", title: "Reading Annual Reports", lessons: [
      { id: "l1", title: "Key Sections to Focus On", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Chairman's letter, MD&A, financial statements, notes to accounts, and auditor's report." }] },
    ], quiz: { id: "q1", questions: [{ q: "The most important section for hidden risks is:", options: ["Cover page", "Notes to Accounts", "Photos", "Index"], answer: 1 }] }}],
  },

  // ═══════════ TECHNICAL ANALYSIS (4 modules) ═══════════
  {
    id: "10-support-resistance", num: "10", section: "technical-analysis",
    title: "Support, Resistance & Trend Lines",
    description: "Identify key support and resistance levels, draw accurate trend lines, understand trend channels, and learn breakout vs breakdown dynamics with real NSE chart examples.",
    icon: "📐", level: "Beginner", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
    modules: [{ id: "m1", title: "S/R & Trends", lessons: [
      { id: "l1", title: "Support — The Floor", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Support is where buying pressure prevents further decline. When it breaks, it becomes resistance." }] },
    ], quiz: { id: "q1", questions: [{ q: "When support breaks it becomes:", options: ["Stronger support", "Resistance", "Irrelevant", "A gap"], answer: 1 }] }}],
  },
  {
    id: "11-chart-patterns", num: "11", section: "technical-analysis",
    title: "Chart Patterns Mastery",
    description: "Comprehensive study of reversal and continuation patterns — Head & Shoulders, Double Top/Bottom, Cup & Handle, Flags, Pennants, Wedges, and Triangles with entry/exit rules.",
    icon: "📊", level: "Intermediate", lessons: 12, duration: "6 hrs",
    thumb: "linear-gradient(135deg, #92400e 0%, #f59e0b 100%)",
    modules: [{ id: "m1", title: "Chart Pattern Recognition", lessons: [
      { id: "l1", title: "Head & Shoulders", type: "article", duration: "16 min", content: [{ type: "paragraph", text: "The most reliable reversal pattern. Three peaks with the middle being highest." }] },
    ], quiz: { id: "q1", questions: [{ q: "H&S is confirmed when:", options: ["Right shoulder forms", "Head is highest", "Neckline breaks", "Volume spikes"], answer: 2 }] }}],
  },
  {
    id: "12-technical-indicators", num: "12", section: "technical-analysis",
    title: "Technical Indicators Deep Dive",
    description: "Master RSI, MACD, Bollinger Bands, Moving Averages (SMA, EMA), Stochastic, ADX, and Supertrend. Learn indicator combinations, divergences, and avoiding false signals.",
    icon: "📈", level: "Intermediate", lessons: 14, duration: "7 hrs",
    thumb: "linear-gradient(135deg, #78350f 0%, #ea580c 100%)",
    modules: [{ id: "m1", title: "Key Indicators", lessons: [
      { id: "l1", title: "RSI — Relative Strength Index", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "RSI measures momentum on a 0-100 scale. Above 70 = overbought, below 30 = oversold." }] },
    ], quiz: { id: "q1", questions: [{ q: "RSI above 70 indicates:", options: ["Oversold", "Overbought", "Neutral", "Bullish reversal"], answer: 1 }] }}],
  },
  {
    id: "13-candlestick-patterns", num: "13", section: "technical-analysis",
    title: "Candlestick Pattern Mastery",
    description: "Identify and trade 20+ candlestick patterns — Doji, Hammer, Engulfing, Morning/Evening Star, Harami, Marubozu, Three White Soldiers, and multi-candle formations.",
    icon: "🕯", level: "Intermediate", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #9a3412 0%, #f97316 100%)",
    modules: [{ id: "m1", title: "Candlestick Patterns", lessons: [
      { id: "l1", title: "Single Candle Patterns", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Hammer, Shooting Star, Doji, and Marubozu — each tells a story about buyer/seller strength." }] },
    ], quiz: { id: "q1", questions: [{ q: "A Doji indicates:", options: ["Strong buying", "Strong selling", "Indecision", "Gap up"], answer: 2 }] }}],
  },

  // ═══════════ SMART MONEY CONCEPTS (4 modules) ═══════════
  {
    id: "14-institutional-trading", num: "14", section: "smart-money",
    title: "Introduction to Institutional Trading",
    description: "Understand how institutional traders (FIIs, mutual funds, hedge funds) operate differently from retail traders. Learn about order flow, block deals, bulk deals, and institutional footprints.",
    icon: "🏦", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)",
    modules: [{ id: "m1", title: "Institutional Behavior", lessons: [
      { id: "l1", title: "How Institutions Trade", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Institutions can't enter or exit positions like retail. They must accumulate and distribute over days/weeks." }] },
    ], quiz: { id: "q1", questions: [{ q: "Block deals happen:", options: ["After hours", "In minimum 5L shares at agreed price", "Only on BSE", "Monthly"], answer: 1 }] }}],
  },
  {
    id: "15-order-blocks-fvg", num: "15", section: "smart-money",
    title: "Order Blocks & Fair Value Gaps",
    description: "Deep dive into order block identification, bullish and bearish order blocks, fair value gaps (FVG), imbalances, and how to use them for high-probability trade entries.",
    icon: "🧱", level: "Advanced", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #581c87 0%, #a855f7 100%)",
    modules: [{ id: "m1", title: "Order Blocks", lessons: [
      { id: "l1", title: "What is an Order Block?", type: "article", duration: "16 min", content: [{ type: "paragraph", text: "Order blocks are zones where institutional orders were placed, creating supply/demand imbalances." }] },
    ], quiz: { id: "q1", questions: [{ q: "An order block represents:", options: ["Random noise", "Institutional order zones", "Retail activity", "Circuit limits"], answer: 1 }] }}],
  },
  {
    id: "16-liquidity-market-structure", num: "16", section: "smart-money",
    title: "Liquidity, Inducements & Market Structure",
    description: "Master liquidity concepts — buy-side and sell-side liquidity, liquidity sweeps, inducements, stop hunts, and how market makers engineer price movements to trap retail traders.",
    icon: "💧", level: "Advanced", lessons: 10, duration: "6 hrs",
    thumb: "linear-gradient(135deg, #701a75 0%, #d946ef 100%)",
    modules: [{ id: "m1", title: "Liquidity Concepts", lessons: [
      { id: "l1", title: "Buy-Side vs Sell-Side Liquidity", type: "article", duration: "16 min", content: [{ type: "paragraph", text: "Liquidity rests above highs (buy stops) and below lows (sell stops). Institutions hunt these levels." }] },
    ], quiz: { id: "q1", questions: [{ q: "Stop hunts target:", options: ["Support levels only", "Retail stop-loss clusters", "Institutional orders", "Circuit breakers"], answer: 1 }] }}],
  },
  {
    id: "17-demand-supply-zones", num: "17", section: "smart-money",
    title: "Demand & Supply Zones",
    description: "Identify institutional demand and supply zones, distinguish them from basic support/resistance, learn zone freshness, proximal vs distal lines, and trade management within zones.",
    icon: "📦", level: "Advanced", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    modules: [{ id: "m1", title: "D&S Zones", lessons: [
      { id: "l1", title: "Demand Zones vs Support", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Demand zones are areas of institutional buying. Unlike support, they are one-time-use zones." }] },
    ], quiz: { id: "q1", questions: [{ q: "A fresh demand zone is:", options: ["Tested 5 times", "Never retested since formation", "Always at round numbers", "Only on daily charts"], answer: 1 }] }}],
  },

  // ═══════════ DERIVATIVES (4 modules) ═══════════
  {
    id: "18-futures-trading", num: "18", section: "derivatives",
    title: "Futures Trading Essentials",
    description: "Understand futures contracts, margins (initial, maintenance, MTM), lot sizes, expiry cycles, basis and contango, pair trading, and naked futures strategies on NSE.",
    icon: "📜", level: "Intermediate", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)",
    modules: [{ id: "m1", title: "Futures Basics", lessons: [
      { id: "l1", title: "What is a Futures Contract?", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Futures are standardized contracts to buy/sell an asset at a predetermined price on a future date." }] },
    ], quiz: { id: "q1", questions: [{ q: "Futures expire on:", options: ["First Thursday", "Last Thursday", "Last Friday", "Any day"], answer: 1 }] }}],
  },
  {
    id: "19-options-greeks", num: "19", section: "derivatives",
    title: "Options Greeks & Option Chain Analysis",
    description: "Master Delta, Gamma, Theta, Vega, and Rho. Learn to read and interpret the NSE option chain, identify max pain, and understand implied volatility and its impact on premiums.",
    icon: "🔬", level: "Intermediate", lessons: 12, duration: "6 hrs",
    thumb: "linear-gradient(135deg, #991b1b 0%, #f87171 100%)",
    modules: [{ id: "m1", title: "The Greeks", lessons: [
      { id: "l1", title: "Delta & Gamma", type: "article", duration: "16 min", content: [{ type: "paragraph", text: "Delta measures sensitivity to price. Gamma measures the rate of change of delta." }] },
    ], quiz: { id: "q1", questions: [{ q: "Theta measures:", options: ["Price sensitivity", "Time decay", "Volatility impact", "Interest rate"], answer: 1 }] }}],
  },
  {
    id: "20-options-strategies", num: "20", section: "derivatives",
    title: "Options Trading Strategies",
    description: "Learn Bull Call Spread, Bear Put Spread, Straddle, Strangle, Iron Condor, Butterfly, Covered Call, and Protective Put. Includes payoff diagrams and breakeven analysis.",
    icon: "🎯", level: "Advanced", lessons: 15, duration: "8 hrs",
    thumb: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    modules: [{ id: "m1", title: "Options Strategies", lessons: [
      { id: "l1", title: "Bull Call Spread", type: "article", duration: "16 min", content: [{ type: "paragraph", text: "Buy a call at a lower strike and sell a call at a higher strike. Limited risk, limited reward." }] },
    ], quiz: { id: "q1", questions: [{ q: "An Iron Condor combines:", options: ["Only calls", "Only puts", "Both bull put spread and bear call spread", "Only buying"], answer: 2 }] }}],
  },
  {
    id: "21-open-interest-pcr", num: "21", section: "derivatives",
    title: "Open Interest & PCR Analysis",
    description: "Decode OI buildup (long/short), OI unwinding, Put-Call Ratio interpretation, change in OI vs price analysis, and how to track institutional positioning through derivatives data.",
    icon: "🔢", level: "Advanced", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #991b1b 0%, #ef4444 100%)",
    modules: [{ id: "m1", title: "OI Analysis", lessons: [
      { id: "l1", title: "Reading Open Interest", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Rising OI + Rising Price = Long Buildup. Rising OI + Falling Price = Short Buildup." }] },
    ], quiz: { id: "q1", questions: [{ q: "PCR > 1 generally indicates:", options: ["Bearish", "Bullish sentiment", "Neutral", "Low volume"], answer: 1 }] }}],
  },

  // ═══════════ MULTI-ASSET TRADING (2 modules) ═══════════
  {
    id: "22-commodity-trading", num: "22", section: "multi-asset",
    title: "Commodity Trading — Gold, Silver & Crude",
    description: "Introduction to MCX commodity markets — gold, silver, crude oil, natural gas. Understand contract specifications, margin requirements, global price drivers, and India-specific factors.",
    icon: "🪙", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
    modules: [{ id: "m1", title: "Commodities", lessons: [
      { id: "l1", title: "Gold & Silver Trading", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Gold is a safe-haven asset. Its price is driven by USD strength, inflation, and geopolitical risk." }] },
    ], quiz: { id: "q1", questions: [{ q: "MCX trades in:", options: ["Stocks only", "Commodities", "Currency only", "Mutual funds"], answer: 1 }] }}],
  },
  {
    id: "23-forex-global", num: "23", section: "multi-asset",
    title: "Introduction to Forex & Global Markets",
    description: "Understand currency pairs, USD/INR dynamics, RBI intervention, forex correlation with equity markets, global indices (S&P 500, Nasdaq, Nikkei), and inter-market analysis.",
    icon: "🌐", level: "Intermediate", lessons: 7, duration: "3.5 hrs",
    thumb: "linear-gradient(135deg, #854d0e 0%, #f59e0b 100%)",
    modules: [{ id: "m1", title: "Forex Basics", lessons: [
      { id: "l1", title: "USD/INR Dynamics", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Rupee depreciation benefits IT exporters but hurts oil importers. RBI actively manages the rate." }] },
    ], quiz: { id: "q1", questions: [{ q: "Rupee depreciation benefits:", options: ["Importers", "IT exporters", "Both equally", "Neither"], answer: 1 }] }}],
  },

  // ═══════════ RISK & PSYCHOLOGY (3 modules) ═══════════
  {
    id: "24-risk-management", num: "24", section: "risk-psychology",
    title: "Risk Management & Position Sizing",
    description: "Master the art of capital preservation — R-multiples, fixed-fractional position sizing, Kelly Criterion basics, drawdown management, portfolio heat, and correlation-aware risk allocation.",
    icon: "🛡️", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    modules: [{ id: "m1", title: "Position Sizing", lessons: [
      { id: "l1", title: "The 2% Rule", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Never risk more than 2% of your portfolio on a single trade. This ensures survival through losing streaks." }] },
    ], quiz: { id: "q1", questions: [{ q: "The 2% rule means:", options: ["2% of stock price", "2% of portfolio per trade", "2% annual return", "2% brokerage"], answer: 1 }] }}],
  },
  {
    id: "25-trading-psychology", num: "25", section: "risk-psychology",
    title: "Trading Psychology & Emotional Discipline",
    description: "Overcome fear, greed, revenge trading, and FOMO. Learn cognitive biases (confirmation, anchoring, recency), develop a pre-market routine, and build emotional resilience.",
    icon: "🧠", level: "All Levels", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #047857 0%, #34d399 100%)",
    modules: [{ id: "m1", title: "Emotional Mastery", lessons: [
      { id: "l1", title: "Fear, Greed & FOMO", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "The best time to buy is when everyone is fearful. The best time to be cautious is when everyone is greedy." }] },
    ], quiz: { id: "q1", questions: [{ q: "FOMO stands for:", options: ["Fundamental Operations", "Fear of Missing Out", "Finance Options", "Fixed Order"], answer: 1 }] }}],
  },
  {
    id: "26-trade-journaling", num: "26", section: "risk-psychology",
    title: "Trade Journaling & Performance Analytics",
    description: "Build a systematic trade journal — tracking entries, exits, R-multiples, win rate, expectancy, profit factor, and maximum drawdown. Learn to identify and fix recurring mistakes.",
    icon: "📓", level: "All Levels", lessons: 6, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    modules: [{ id: "m1", title: "Journaling System", lessons: [
      { id: "l1", title: "What to Track in Every Trade", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Entry, exit, stop-loss, reason, chart screenshot, and emotional state. Review monthly." }] },
    ], quiz: { id: "q1", questions: [{ q: "A trade journal helps:", options: ["Predict markets", "Identify recurring mistakes", "Guarantee profits", "Avoid taxes"], answer: 1 }] }}],
  },

  // ═══════════ ADVANCED & QUANTITATIVE (4 modules) ═══════════
  {
    id: "27-algo-trading", num: "27", section: "advanced-quant",
    title: "Algorithmic Trading with Python",
    description: "Build, backtest, and deploy your own trading algorithms using Python. Covers data fetching, strategy coding, backtesting frameworks (Backtrader), and paper trading automation.",
    icon: "🐍", level: "Advanced", lessons: 22, duration: "18 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
    modules: [{ id: "m1", title: "Python for Trading", lessons: [
      { id: "l1", title: "Setting Up Your Environment", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Install Python, Jupyter, and key libraries: pandas, numpy, matplotlib, yfinance, and backtrader." }] },
    ], quiz: { id: "q1", questions: [{ q: "Backtrader is used for:", options: ["Web development", "Strategy backtesting", "Mobile apps", "Database management"], answer: 1 }] }}],
  },
  {
    id: "28-backtesting", num: "28", section: "advanced-quant",
    title: "Backtesting Strategies",
    description: "Learn to rigorously backtest any trading strategy — avoid overfitting, survivorship bias, look-ahead bias. Understand walk-forward analysis, Monte Carlo simulation, and out-of-sample testing.",
    icon: "⏪", level: "Advanced", lessons: 8, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #1e40af 0%, #818cf8 100%)",
    modules: [{ id: "m1", title: "Backtesting", lessons: [
      { id: "l1", title: "Avoiding Overfitting", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "A strategy that works perfectly on past data but fails live is overfitted. Use out-of-sample testing." }] },
    ], quiz: { id: "q1", questions: [{ q: "Overfitting means:", options: ["Strategy works too well on live data", "Strategy is curve-fitted to past data", "Strategy has too few rules", "Strategy uses no indicators"], answer: 1 }] }}],
  },
  {
    id: "29-trading-system", num: "29", section: "advanced-quant",
    title: "Building a Trading System",
    description: "Combine technical, fundamental, and quantitative elements into a complete, rule-based trading system. Define entry/exit criteria, risk parameters, and performance benchmarks.",
    icon: "⚙️", level: "Advanced", lessons: 8, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #312e81 0%, #6366f1 100%)",
    modules: [{ id: "m1", title: "System Design", lessons: [
      { id: "l1", title: "From Theory to System", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "A trading system removes emotion. Define exact rules for entry, exit, position size, and risk." }] },
    ], quiz: { id: "q1", questions: [{ q: "A trading system needs:", options: ["Only gut feeling", "Clear rules for entry, exit, and risk", "Only technical indicators", "Only fundamental analysis"], answer: 1 }] }}],
  },
  {
    id: "30-portfolio-construction", num: "30", section: "advanced-quant",
    title: "Portfolio Construction & Asset Allocation",
    description: "Modern Portfolio Theory basics, diversification across asset classes, rebalancing strategies, core-satellite approach, and building a long-term wealth creation portfolio for Indian investors.",
    icon: "🏗️", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #60a5fa 100%)",
    modules: [{ id: "m1", title: "Portfolio Theory", lessons: [
      { id: "l1", title: "Diversification — The Only Free Lunch", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Don't put all eggs in one basket. Spread across sectors, asset classes, and timeframes." }] },
    ], quiz: { id: "q1", questions: [{ q: "Core-satellite approach means:", options: ["Only index funds", "Core index + satellite active picks", "Only active picks", "Only bonds"], answer: 1 }] }}],
  },
];
