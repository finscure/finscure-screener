export const COURSES = [
  {
    id: "stock-market-basics",
    title: "Stock Market Basics",
    description: "Understand what stocks are, how exchanges work, and the fundamentals of investing in the Indian stock market.",
    icon: "📊",
    color: "#7c3aed",
    duration: "4 hours",
    lessons: 12,
    level: "Beginner",
    modules: [
      {
        id: "m1",
        title: "Introduction to Stock Markets",
        lessons: [
          { id: "l1", title: "What is a Stock Market?", type: "video", videoUrl: "", duration: "12 min" },
          { id: "l2", title: "NSE vs BSE — Understanding Indian Exchanges", type: "article", duration: "8 min" },
          { id: "l3", title: "How Stock Prices are Determined", type: "video", videoUrl: "", duration: "15 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "What does NSE stand for?", options: ["National Stock Exchange", "New Stock Exchange", "National Securities Exchange", "None of the above"], answer: 0 },
            { q: "Who regulates the Indian stock market?", options: ["RBI", "SEBI", "NSDL", "BSE"], answer: 1 },
            { q: "What is the primary index of NSE?", options: ["SENSEX", "NIFTY 50", "BSE 500", "NIFTY Bank"], answer: 1 },
          ],
        },
      },
      {
        id: "m2",
        title: "Types of Market Participants",
        lessons: [
          { id: "l4", title: "Retail Investors vs Institutional Investors", type: "article", duration: "10 min" },
          { id: "l5", title: "Role of Brokers, SEBI, and Depositories", type: "video", videoUrl: "", duration: "18 min" },
          { id: "l6", title: "Understanding Demat & Trading Accounts", type: "article", duration: "8 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "What is a Demat account used for?", options: ["Trading stocks", "Holding stocks electronically", "Paying taxes", "Getting loans"], answer: 1 },
            { q: "Which entity acts as a depository in India?", options: ["SEBI", "RBI", "NSDL/CDSL", "NSE"], answer: 2 },
          ],
        },
      },
      {
        id: "m3",
        title: "Placing Your First Trade",
        lessons: [
          { id: "l7", title: "Market Orders vs Limit Orders", type: "video", videoUrl: "", duration: "14 min" },
          { id: "l8", title: "Understanding Bid-Ask Spread", type: "article", duration: "6 min" },
          { id: "l9", title: "Reading a Stock Quote", type: "article", duration: "10 min" },
        ],
        quiz: {
          id: "q3",
          questions: [
            { q: "A market order executes at:", options: ["A fixed price", "The best available price", "Yesterday's closing price", "Opening price"], answer: 1 },
            { q: "What does 'LTP' stand for?", options: ["Last Traded Price", "Latest Trading Point", "Low Trading Price", "Limit Trade Price"], answer: 0 },
          ],
        },
      },
    ],
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis",
    description: "Learn to read charts, identify patterns, and use technical indicators to make informed trading decisions.",
    icon: "📈",
    color: "#16a34a",
    duration: "6 hours",
    lessons: 15,
    level: "Intermediate",
    modules: [
      {
        id: "m1",
        title: "Chart Basics",
        lessons: [
          { id: "l1", title: "Types of Charts — Line, Bar, Candlestick", type: "video", videoUrl: "", duration: "15 min" },
          { id: "l2", title: "Reading Candlestick Patterns", type: "article", duration: "12 min" },
          { id: "l3", title: "Support and Resistance Levels", type: "video", videoUrl: "", duration: "18 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "Which chart type shows open, high, low, and close?", options: ["Line chart", "Bar chart", "Candlestick chart", "Both B and C"], answer: 3 },
            { q: "A 'Doji' candlestick indicates:", options: ["Strong bullish trend", "Strong bearish trend", "Market indecision", "Gap up opening"], answer: 2 },
          ],
        },
      },
      {
        id: "m2",
        title: "Key Indicators",
        lessons: [
          { id: "l4", title: "Moving Averages — SMA & EMA", type: "video", videoUrl: "", duration: "20 min" },
          { id: "l5", title: "RSI — Relative Strength Index", type: "article", duration: "15 min" },
          { id: "l6", title: "MACD — Moving Average Convergence Divergence", type: "video", videoUrl: "", duration: "18 min" },
          { id: "l7", title: "Bollinger Bands", type: "article", duration: "12 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "An RSI above 70 typically indicates:", options: ["Oversold", "Overbought", "Neutral", "Bullish reversal"], answer: 1 },
            { q: "What does MACD stand for?", options: ["Market Average Convergence Divergence", "Moving Average Convergence Divergence", "Moving Average Cross Direction", "Market Analysis Chart Data"], answer: 1 },
          ],
        },
      },
      {
        id: "m3",
        title: "Chart Patterns",
        lessons: [
          { id: "l8", title: "Head and Shoulders Pattern", type: "video", videoUrl: "", duration: "16 min" },
          { id: "l9", title: "Double Top and Double Bottom", type: "article", duration: "10 min" },
          { id: "l10", title: "Triangles, Flags, and Wedges", type: "video", videoUrl: "", duration: "20 min" },
        ],
        quiz: {
          id: "q3",
          questions: [
            { q: "A Head and Shoulders pattern is typically:", options: ["Bullish continuation", "Bearish reversal", "Bullish reversal", "Neutral"], answer: 1 },
          ],
        },
      },
    ],
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis",
    description: "Master the art of evaluating company financials — P/E ratios, balance sheets, and intrinsic valuations.",
    icon: "🏦",
    color: "#dc2626",
    duration: "5 hours",
    lessons: 14,
    level: "Intermediate",
    modules: [
      {
        id: "m1",
        title: "Financial Statements",
        lessons: [
          { id: "l1", title: "Understanding Income Statements", type: "video", videoUrl: "", duration: "18 min" },
          { id: "l2", title: "Balance Sheet Deep Dive", type: "article", duration: "15 min" },
          { id: "l3", title: "Cash Flow Statements Explained", type: "video", videoUrl: "", duration: "16 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "Revenue minus expenses equals:", options: ["Gross Profit", "Net Profit", "EBITDA", "Operating Profit"], answer: 1 },
            { q: "Which statement shows a company's assets and liabilities?", options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Annual Report"], answer: 2 },
          ],
        },
      },
      {
        id: "m2",
        title: "Valuation Ratios",
        lessons: [
          { id: "l4", title: "P/E Ratio — Price to Earnings", type: "video", videoUrl: "", duration: "14 min" },
          { id: "l5", title: "P/B Ratio, EV/EBITDA, and PEG Ratio", type: "article", duration: "18 min" },
          { id: "l6", title: "Dividend Yield and ROE", type: "video", videoUrl: "", duration: "12 min" },
          { id: "l7", title: "Comparing Companies Using Ratios", type: "article", duration: "15 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "A lower P/E ratio generally indicates:", options: ["Overvalued stock", "Undervalued or slow growth", "High debt", "Strong momentum"], answer: 1 },
            { q: "ROE stands for:", options: ["Return on Equity", "Rate of Exchange", "Revenue over Expenses", "Return on Enterprise"], answer: 0 },
          ],
        },
      },
    ],
  },
  {
    id: "trading-strategies",
    title: "Trading Strategies",
    description: "Explore intraday, swing, and positional trading strategies used by professional traders.",
    icon: "⚡",
    color: "#ea580c",
    duration: "5 hours",
    lessons: 13,
    level: "Advanced",
    modules: [
      {
        id: "m1",
        title: "Intraday Trading",
        lessons: [
          { id: "l1", title: "What is Intraday Trading?", type: "video", videoUrl: "", duration: "12 min" },
          { id: "l2", title: "Scalping Strategies", type: "article", duration: "15 min" },
          { id: "l3", title: "Gap Up and Gap Down Trading", type: "video", videoUrl: "", duration: "18 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "Intraday trades must be closed:", options: ["Within a week", "Before market close same day", "Within 3 days", "Anytime"], answer: 1 },
          ],
        },
      },
      {
        id: "m2",
        title: "Swing & Positional Trading",
        lessons: [
          { id: "l4", title: "Swing Trading — Holding for Days to Weeks", type: "video", videoUrl: "", duration: "16 min" },
          { id: "l5", title: "Positional Trading — Riding the Trend", type: "article", duration: "14 min" },
          { id: "l6", title: "Identifying Entry and Exit Points", type: "video", videoUrl: "", duration: "20 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "Swing trading typically holds positions for:", options: ["Minutes", "Hours", "Days to weeks", "Months to years"], answer: 2 },
          ],
        },
      },
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "Learn stop-loss strategies, position sizing, and portfolio management to protect your capital.",
    icon: "🛡️",
    color: "#0891b2",
    duration: "3 hours",
    lessons: 10,
    level: "Beginner",
    modules: [
      {
        id: "m1",
        title: "Protecting Your Capital",
        lessons: [
          { id: "l1", title: "Why Risk Management Matters", type: "video", videoUrl: "", duration: "10 min" },
          { id: "l2", title: "Setting Stop-Loss Orders", type: "article", duration: "12 min" },
          { id: "l3", title: "Position Sizing — The 1% and 2% Rules", type: "video", videoUrl: "", duration: "15 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "The 2% rule suggests you should risk no more than:", options: ["2% of a stock's price", "2% of your portfolio per trade", "2% of your annual income", "2% of daily volume"], answer: 1 },
          ],
        },
      },
      {
        id: "m2",
        title: "Portfolio Management",
        lessons: [
          { id: "l4", title: "Diversification — Don't Put All Eggs in One Basket", type: "video", videoUrl: "", duration: "14 min" },
          { id: "l5", title: "Risk-Reward Ratio", type: "article", duration: "10 min" },
          { id: "l6", title: "Trailing Stop-Loss Strategies", type: "article", duration: "8 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "A risk-reward ratio of 1:3 means:", options: ["Risk ₹3 to make ₹1", "Risk ₹1 to make ₹3", "Risk 3% of portfolio", "Take 3 trades per day"], answer: 1 },
          ],
        },
      },
    ],
  },
  {
    id: "ipo-mutual-funds",
    title: "IPO & Mutual Funds",
    description: "Understand how IPOs work, how to invest in mutual funds, SIPs, and build long-term wealth.",
    icon: "🏗️",
    color: "#9333ea",
    duration: "3 hours",
    lessons: 10,
    level: "Beginner",
    modules: [
      {
        id: "m1",
        title: "IPO Fundamentals",
        lessons: [
          { id: "l1", title: "What is an IPO and Why Companies Go Public", type: "video", videoUrl: "", duration: "14 min" },
          { id: "l2", title: "How to Apply for an IPO in India", type: "article", duration: "10 min" },
          { id: "l3", title: "Analysing an IPO — Red Flags & Green Flags", type: "video", videoUrl: "", duration: "16 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "IPO stands for:", options: ["Initial Price Offering", "Initial Public Offering", "Indian Public Offering", "Investment Portfolio Option"], answer: 1 },
          ],
        },
      },
      {
        id: "m2",
        title: "Mutual Funds & SIPs",
        lessons: [
          { id: "l4", title: "Types of Mutual Funds — Equity, Debt, Hybrid", type: "video", videoUrl: "", duration: "18 min" },
          { id: "l5", title: "SIP vs Lumpsum Investment", type: "article", duration: "12 min" },
          { id: "l6", title: "Choosing the Right Mutual Fund", type: "article", duration: "14 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "SIP stands for:", options: ["Stock Investment Plan", "Systematic Investment Plan", "Standard Investment Portfolio", "Simple Interest Payment"], answer: 1 },
          ],
        },
      },
    ],
  },
  {
    id: "options-futures",
    title: "Options & Futures",
    description: "Dive into derivatives — understand options chains, futures contracts, Greeks, and hedging strategies.",
    icon: "🎯",
    color: "#b91c1c",
    duration: "7 hours",
    lessons: 18,
    level: "Advanced",
    modules: [
      {
        id: "m1",
        title: "Futures Contracts",
        lessons: [
          { id: "l1", title: "What are Futures? — The Basics", type: "video", videoUrl: "", duration: "15 min" },
          { id: "l2", title: "Lot Size, Margin, and Expiry", type: "article", duration: "12 min" },
          { id: "l3", title: "Long vs Short Futures Positions", type: "video", videoUrl: "", duration: "16 min" },
        ],
        quiz: {
          id: "q1",
          questions: [
            { q: "Futures contracts in India expire on:", options: ["First Thursday of month", "Last Thursday of month", "Last Friday of month", "Any day"], answer: 1 },
          ],
        },
      },
      {
        id: "m2",
        title: "Options Basics",
        lessons: [
          { id: "l4", title: "Call Options vs Put Options", type: "video", videoUrl: "", duration: "18 min" },
          { id: "l5", title: "Strike Price, Premium, and Expiry", type: "article", duration: "14 min" },
          { id: "l6", title: "Reading an Options Chain", type: "video", videoUrl: "", duration: "20 min" },
          { id: "l7", title: "ITM, ATM, and OTM Explained", type: "article", duration: "10 min" },
        ],
        quiz: {
          id: "q2",
          questions: [
            { q: "A Call option gives you the right to:", options: ["Sell at strike price", "Buy at strike price", "Hold at market price", "Short the stock"], answer: 1 },
            { q: "What does 'OTM' mean?", options: ["On The Market", "Out of The Money", "Over The Maximum", "Open Trade Margin"], answer: 1 },
          ],
        },
      },
      {
        id: "m3",
        title: "Option Greeks & Strategies",
        lessons: [
          { id: "l8", title: "Delta, Gamma, Theta, and Vega", type: "video", videoUrl: "", duration: "22 min" },
          { id: "l9", title: "Covered Call Strategy", type: "article", duration: "12 min" },
          { id: "l10", title: "Iron Condor and Straddle", type: "video", videoUrl: "", duration: "18 min" },
        ],
        quiz: {
          id: "q3",
          questions: [
            { q: "Theta measures:", options: ["Price sensitivity", "Time decay", "Volatility impact", "Interest rate effect"], answer: 1 },
          ],
        },
      },
    ],
  },
];
