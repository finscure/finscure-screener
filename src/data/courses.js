import { STOCK_MARKET_BASICS } from "./course_stock_basics";
import { TECHNICAL_ANALYSIS } from "./course_technical_analysis";

export const COURSES = [
  STOCK_MARKET_BASICS,
  TECHNICAL_ANALYSIS,
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
