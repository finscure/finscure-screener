// Course data — user copies their comprehensive files alongside this
// For now, inline all 7 courses with enough structure to render

export const COURSES = [
  {
    id: "stock-market-basics", title: "Stock Market Basics", icon: "📊", color: "#7c3aed",
    description: "Complete beginner's guide to the Indian stock market — from understanding stocks to placing your first trade.",
    duration: "12 hours", lessons: 42, level: "Beginner", thumb: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    modules: [
      { id: "m1", title: "What is the Stock Market?", lessons: [
        { id: "m1-l1", title: "What is a Stock?", type: "article", duration: "12 min", content: [{ type: "heading", text: "Understanding Stocks" },{ type: "paragraph", text: "A stock represents a unit of ownership in a company. When you buy a stock of Reliance Industries, you become a part-owner of that company." },{ type: "callout", text: "Key Takeaway: Stocks represent ownership. You profit through price appreciation or dividends." }] },
        { id: "m1-l2", title: "History of the Indian Stock Market", type: "article", duration: "10 min", content: [{ type: "heading", text: "From Banyan Trees to Billion-Dollar Exchanges" },{ type: "paragraph", text: "India's stock market dates back to 1875 when BSE was established as Asia's oldest exchange." }] },
        { id: "m1-l3", title: "NSE vs BSE", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "India has two major exchanges. NSE leads in volume, BSE in history." }] },
        { id: "m1-l4", title: "Understanding NIFTY & SENSEX", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Market indices are barometers of market health." }] },
        { id: "m1-l5", title: "How Stock Prices Move", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Supply and demand, company earnings, and market sentiment drive prices." }] },
      ], quiz: { id: "m1-quiz", questions: [
        { q: "What does a stock represent?", options: ["A loan to a company", "Ownership in a company", "A government bond", "A fixed deposit"], answer: 1 },
        { q: "Which is India's oldest stock exchange?", options: ["NSE", "BSE", "MCX", "NCDEX"], answer: 1 },
        { q: "NIFTY 50 tracks how many companies?", options: ["30", "50", "100", "500"], answer: 1 },
      ]}},
      { id: "m2", title: "Market Participants & Regulators", lessons: [
        { id: "m2-l1", title: "SEBI — The Market Watchdog", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "SEBI regulates the Indian securities market to protect investors." }] },
        { id: "m2-l2", title: "Types of Investors", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Retail, FII, DII, and HNI investors all participate." }] },
      ], quiz: { id: "m2-quiz", questions: [{ q: "FII stands for:", options: ["Fixed Income Investors", "Foreign Institutional Investors", "Federal Indian Investments", "Financial Investors"], answer: 1 }] }},
      { id: "m3", title: "Your First Investment", lessons: [
        { id: "m3-l1", title: "Opening a Demat & Trading Account", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "You need a bank, trading, and Demat account to start investing." }] },
        { id: "m3-l2", title: "Order Types — Market, Limit, Stop-Loss", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Different order types give you different levels of price control." }] },
      ], quiz: { id: "m3-quiz", questions: [{ q: "A limit order guarantees:", options: ["Execution", "Price", "Both", "Neither"], answer: 1 }] }},
    ],
  },
  {
    id: "technical-analysis", title: "Technical Analysis", icon: "📈", color: "#16a34a",
    description: "Read price charts, identify patterns, and use indicators to time entries and exits.",
    duration: "10 hours", lessons: 25, level: "Intermediate", thumb: "linear-gradient(135deg, #065f46 0%, #16a34a 100%)",
    modules: [
      { id: "m1", title: "Foundations of TA", lessons: [
        { id: "m1-l1", title: "What is Technical Analysis?", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "TA studies past price and volume to forecast future movements." }] },
        { id: "m1-l2", title: "Chart Types", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Line, bar, and candlestick charts display price data differently." }] },
      ], quiz: { id: "m1-quiz", questions: [{ q: "Which chart type originated in Japan?", options: ["Line", "Bar", "Candlestick", "Point & figure"], answer: 2 }] }},
      { id: "m2", title: "Support & Resistance", lessons: [
        { id: "m2-l1", title: "Support & Resistance Levels", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Key price levels where buying or selling pressure is strong." }] },
      ], quiz: { id: "m2-quiz", questions: [{ q: "When support breaks it becomes:", options: ["Stronger support", "Resistance", "Irrelevant", "A gap"], answer: 1 }] }},
    ],
  },
  {
    id: "fundamental-analysis", title: "Fundamental Analysis", icon: "🏦", color: "#dc2626",
    description: "Evaluate company financials — income statements, balance sheets, and cash flow.",
    duration: "10 hours", lessons: 23, level: "Intermediate", thumb: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
    modules: [
      { id: "m1", title: "Introduction to FA", lessons: [
        { id: "m1-l1", title: "Thinking Like a Business Owner", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "FA evaluates intrinsic value by examining financials, industry, and management." }] },
      ], quiz: { id: "m1-quiz", questions: [{ q: "FA primarily answers:", options: ["When to buy", "What to buy & fair price", "Tomorrow's price", "Volume"], answer: 1 }] }},
    ],
  },
  {
    id: "trading-strategies", title: "Trading Strategies", icon: "⚡", color: "#ea580c",
    description: "Intraday, swing, and positional trading strategies used by professionals.",
    duration: "5 hours", lessons: 13, level: "Advanced", thumb: "linear-gradient(135deg, #9a3412 0%, #ea580c 100%)",
    modules: [{ id: "m1", title: "Intraday Trading", lessons: [{ id: "m1-l1", title: "What is Intraday Trading?", type: "article", duration: "12 min", content: [{ type: "paragraph", text: "Intraday means buying and selling on the same day." }] }], quiz: { id: "m1-quiz", questions: [{ q: "Intraday trades close:", options: ["Within a week", "Same day", "3 days", "Anytime"], answer: 1 }] }}],
  },
  {
    id: "risk-management", title: "Risk Management", icon: "🛡️", color: "#0891b2",
    description: "Stop-loss strategies, position sizing, and capital protection.",
    duration: "3 hours", lessons: 10, level: "Beginner", thumb: "linear-gradient(135deg, #155e75 0%, #0891b2 100%)",
    modules: [{ id: "m1", title: "Protecting Capital", lessons: [{ id: "m1-l1", title: "Why Risk Management Matters", type: "article", duration: "10 min", content: [{ type: "paragraph", text: "Risk management is the #1 skill for long-term survival." }] }], quiz: { id: "m1-quiz", questions: [{ q: "2% rule limits:", options: ["Stock price", "Portfolio risk per trade", "Annual income", "Volume"], answer: 1 }] }}],
  },
  {
    id: "ipo-mutual-funds", title: "IPO & Mutual Funds", icon: "🏗️", color: "#9333ea",
    description: "How IPOs work, mutual fund investing, SIPs, and long-term wealth.",
    duration: "3 hours", lessons: 10, level: "Beginner", thumb: "linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)",
    modules: [{ id: "m1", title: "IPO Fundamentals", lessons: [{ id: "m1-l1", title: "What is an IPO?", type: "article", duration: "14 min", content: [{ type: "paragraph", text: "Companies go public through IPOs to raise capital." }] }], quiz: { id: "m1-quiz", questions: [{ q: "IPO stands for:", options: ["Initial Price Offering", "Initial Public Offering", "Indian Public Offering", "Investment Option"], answer: 1 }] }}],
  },
  {
    id: "options-futures", title: "Options & Futures", icon: "🎯", color: "#b91c1c",
    description: "Derivatives — options chains, futures, Greeks, and hedging strategies.",
    duration: "7 hours", lessons: 18, level: "Advanced", thumb: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)",
    modules: [{ id: "m1", title: "Futures Contracts", lessons: [{ id: "m1-l1", title: "What are Futures?", type: "article", duration: "15 min", content: [{ type: "paragraph", text: "Futures are derivative contracts obligating buying/selling at a set price." }] }], quiz: { id: "m1-quiz", questions: [{ q: "Futures expire on:", options: ["First Thursday", "Last Thursday", "Last Friday", "Any day"], answer: 1 }] }}],
  },
];
