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

// Import detailed module content (populated modules)
import { MODULE_01 } from "./modules/module_01";
import { MODULE_02 } from "./modules/module_02";
import { MODULE_03 } from "./modules/module_03";
import { MODULE_04 } from "./modules/module_04";
import { MODULE_05 } from "./modules/module_05";
import { MODULE_06 } from "./modules/module_06";
import { MODULE_07 } from "./modules/module_07";
import { MODULE_08 } from "./modules/module_08";
import { MODULE_09 } from "./modules/module_09";
import { MODULE_10 } from "./modules/module_10";
import { MODULE_11 } from "./modules/module_11";
import { MODULE_12 } from "./modules/module_12";
import { MODULE_13 } from "./modules/module_13";
import { MODULE_14 } from "./modules/module_14";
import { MODULE_15 } from "./modules/module_15";
import { MODULE_16 } from "./modules/module_16";
import { MODULE_17 } from "./modules/module_17";
import { MODULE_18 } from "./modules/module_18";
import { MODULE_19 } from "./modules/module_19";
import { MODULE_20 } from "./modules/module_20";
import { MODULE_21 } from "./modules/module_21";
import { MODULE_22 } from "./modules/module_22";
import { MODULE_23 } from "./modules/module_23";
import { MODULE_24 } from "./modules/module_24";
import { MODULE_25 } from "./modules/module_25";
import { MODULE_26 } from "./modules/module_26";
import { MODULE_27 } from "./modules/module_27";
import { MODULE_28 } from "./modules/module_28";
import { MODULE_29 } from "./modules/module_29";
import { MODULE_30 } from "./modules/module_30";

const DETAILED_MODULES = {
  "01-getting-started": MODULE_01,
  "02-stock-exchanges": MODULE_02,
  "03-candlestick-charts": MODULE_03,
  "04-volume-price-action": MODULE_04,
  "05-placing-orders": MODULE_05,
  "06-financial-statements": MODULE_06,
  "07-valuation-methods": MODULE_07,
  "08-sector-analysis": MODULE_08,
  "09-annual-reports": MODULE_09,
  "10-support-resistance": MODULE_10,
  "11-chart-patterns": MODULE_11,
  "12-technical-indicators": MODULE_12,
  "13-candlestick-patterns": MODULE_13,
  "14-institutional-trading": MODULE_14,
  "15-order-blocks-fvg": MODULE_15,
  "16-liquidity-market-structure": MODULE_16,
  "17-demand-supply-zones": MODULE_17,
  "18-futures-trading": MODULE_18,
  "19-options-greeks": MODULE_19,
  "20-options-strategies": MODULE_20,
  "21-open-interest-pcr": MODULE_21,
  "22-commodity-trading": MODULE_22,
  "23-forex-global": MODULE_23,
  "24-risk-management": MODULE_24,
  "25-trading-psychology": MODULE_25,
  "26-trade-journaling": MODULE_26,
  "27-algo-trading": MODULE_27,
  "28-backtesting": MODULE_28,
  "29-trading-system": MODULE_29,
  "30-portfolio-construction": MODULE_30,
};

export const COURSES = [
  // ═══════════ FOUNDATION (5 modules) ═══════════
  {
    id: "01-getting-started", num: "01", section: "foundation",
    title: "Getting Started with the Stock Market",
    description: "Understand what stocks are, how exchanges function, key market participants (retail, institutional, FIIs, DIIs), trading sessions, and essential terminology every investor must know.",
    icon: "📊", level: "Beginner", lessons: 8, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #065f46 0%, #10965a 100%)",
    modules: DETAILED_MODULES["01-getting-started"] || [],
  },
  {
    id: "02-stock-exchanges", num: "02", section: "foundation",
    title: "How Stock Exchanges Work",
    description: "Deep dive into NSE and BSE infrastructure, order matching engines, clearing and settlement (T+1), depositories (CDSL, NSDL), demat accounts, and the role of SEBI in market regulation.",
    icon: "🏛", level: "Beginner", lessons: 6, duration: "2.5 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
    modules: DETAILED_MODULES["02-stock-exchanges"] || [],
  },
  {
    id: "03-candlestick-charts", num: "03", section: "foundation",
    title: "Reading Candlestick Charts",
    description: "Learn to read Japanese candlestick charts — open, high, low, close (OHLC) data, timeframes, bullish and bearish candles, and how to interpret price action visually.",
    icon: "🕯", level: "Beginner", lessons: 8, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    modules: DETAILED_MODULES["03-candlestick-charts"] || [],
  },
  {
    id: "04-volume-price-action", num: "04", section: "foundation",
    title: "Understanding Volume & Price Action",
    description: "Master the relationship between volume and price movement. Learn to identify accumulation, distribution, volume spikes, climax volume, and how smart money leaves footprints.",
    icon: "📊", level: "Beginner", lessons: 7, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #4a1d96 0%, #7c3aed 100%)",
    modules: DETAILED_MODULES["04-volume-price-action"] || [],
  },
  {
    id: "05-placing-orders", num: "05", section: "foundation",
    title: "Placing Orders & Order Types",
    description: "Practical guide to market orders, limit orders, stop-loss orders, GTT (Good Till Triggered), bracket orders, cover orders, and AMO (After Market Orders) across major Indian brokers.",
    icon: "🛒", level: "Beginner", lessons: 5, duration: "2 hrs",
    thumb: "linear-gradient(135deg, #854d0e 0%, #d97706 100%)",
    modules: DETAILED_MODULES["05-placing-orders"] || [],
  },

  // ═══════════ FUNDAMENTAL ANALYSIS (4 modules) ═══════════
  {
    id: "06-financial-statements", num: "06", section: "fundamental-analysis",
    title: "Reading Financial Statements",
    description: "Decode balance sheets, income statements, and cash flow statements. Learn to identify revenue quality, debt levels, profitability ratios, and red flags in company financials.",
    icon: "📋", level: "Beginner", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
    modules: DETAILED_MODULES["06-financial-statements"] || [],
  },
  {
    id: "07-valuation-methods", num: "07", section: "fundamental-analysis",
    title: "Valuation Methods & Metrics",
    description: "Master P/E, P/B, EV/EBITDA, PEG ratio, DCF (Discounted Cash Flow) analysis, and relative valuation. Learn when each method is appropriate and how to calculate intrinsic value.",
    icon: "🧮", level: "Intermediate", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #1e40af 0%, #60a5fa 100%)",
    modules: DETAILED_MODULES["07-valuation-methods"] || [],
  },
  {
    id: "08-sector-analysis", num: "08", section: "fundamental-analysis",
    title: "Sector & Industry Analysis",
    description: "Framework for analyzing different sectors — banking, IT, pharma, FMCG, metals, auto, and real estate. Understand sector rotation, cyclical vs defensive sectors, and macro drivers.",
    icon: "🏭", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
    modules: DETAILED_MODULES["08-sector-analysis"] || [],
  },
  {
    id: "09-annual-reports", num: "09", section: "fundamental-analysis",
    title: "Annual Report Reading Masterclass",
    description: "How to extract actionable insights from annual reports — management discussion, auditor notes, related party transactions, contingent liabilities, and corporate governance indicators.",
    icon: "📖", level: "Intermediate", lessons: 6, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #312e81 0%, #6366f1 100%)",
    modules: DETAILED_MODULES["09-annual-reports"] || [],
  },

  // ═══════════ TECHNICAL ANALYSIS (4 modules) ═══════════
  {
    id: "10-support-resistance", num: "10", section: "technical-analysis",
    title: "Support, Resistance & Trend Lines",
    description: "Identify key support and resistance levels, draw accurate trend lines, understand trend channels, and learn breakout vs breakdown dynamics with real NSE chart examples.",
    icon: "📐", level: "Beginner", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
    modules: DETAILED_MODULES["10-support-resistance"] || [],
  },
  {
    id: "11-chart-patterns", num: "11", section: "technical-analysis",
    title: "Chart Patterns Mastery",
    description: "Comprehensive study of reversal and continuation patterns — Head & Shoulders, Double Top/Bottom, Cup & Handle, Flags, Pennants, Wedges, and Triangles with entry/exit rules.",
    icon: "📊", level: "Intermediate", lessons: 12, duration: "6 hrs",
    thumb: "linear-gradient(135deg, #92400e 0%, #f59e0b 100%)",
    modules: DETAILED_MODULES["11-chart-patterns"] || [],
  },
  {
    id: "12-technical-indicators", num: "12", section: "technical-analysis",
    title: "Technical Indicators Deep Dive",
    description: "Master RSI, MACD, Bollinger Bands, Moving Averages (SMA, EMA), Stochastic, ADX, and Supertrend. Learn indicator combinations, divergences, and avoiding false signals.",
    icon: "📈", level: "Intermediate", lessons: 14, duration: "7 hrs",
    thumb: "linear-gradient(135deg, #78350f 0%, #ea580c 100%)",
    modules: DETAILED_MODULES["12-technical-indicators"] || [],
  },
  {
    id: "13-candlestick-patterns", num: "13", section: "technical-analysis",
    title: "Candlestick Pattern Mastery",
    description: "Identify and trade 20+ candlestick patterns — Doji, Hammer, Engulfing, Morning/Evening Star, Harami, Marubozu, Three White Soldiers, and multi-candle formations.",
    icon: "🕯", level: "Intermediate", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #9a3412 0%, #f97316 100%)",
    modules: DETAILED_MODULES["13-candlestick-patterns"] || [],
  },

  // ═══════════ SMART MONEY CONCEPTS (4 modules) ═══════════
  {
    id: "14-institutional-trading", num: "14", section: "smart-money",
    title: "Introduction to Institutional Trading",
    description: "Understand how institutional traders (FIIs, mutual funds, hedge funds) operate differently from retail traders. Learn about order flow, block deals, bulk deals, and institutional footprints.",
    icon: "🏦", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)",
    modules: DETAILED_MODULES["14-institutional-trading"] || [],
  },
  {
    id: "15-order-blocks-fvg", num: "15", section: "smart-money",
    title: "Order Blocks & Fair Value Gaps",
    description: "Deep dive into order block identification, bullish and bearish order blocks, fair value gaps (FVG), imbalances, and how to use them for high-probability trade entries.",
    icon: "🧱", level: "Advanced", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #581c87 0%, #a855f7 100%)",
    modules: DETAILED_MODULES["15-order-blocks-fvg"] || [],
  },
  {
    id: "16-liquidity-market-structure", num: "16", section: "smart-money",
    title: "Liquidity, Inducements & Market Structure",
    description: "Master liquidity concepts — buy-side and sell-side liquidity, liquidity sweeps, inducements, stop hunts, and how market makers engineer price movements to trap retail traders.",
    icon: "💧", level: "Advanced", lessons: 10, duration: "6 hrs",
    thumb: "linear-gradient(135deg, #701a75 0%, #d946ef 100%)",
    modules: DETAILED_MODULES["16-liquidity-market-structure"] || [],
  },
  {
    id: "17-demand-supply-zones", num: "17", section: "smart-money",
    title: "Demand & Supply Zones",
    description: "Identify institutional demand and supply zones, distinguish them from basic support/resistance, learn zone freshness, proximal vs distal lines, and trade management within zones.",
    icon: "📦", level: "Advanced", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    modules: DETAILED_MODULES["17-demand-supply-zones"] || [],
  },

  // ═══════════ DERIVATIVES (4 modules) ═══════════
  {
    id: "18-futures-trading", num: "18", section: "derivatives",
    title: "Futures Trading Essentials",
    description: "Understand futures contracts, margins (initial, maintenance, MTM), lot sizes, expiry cycles, basis and contango, pair trading, and naked futures strategies on NSE.",
    icon: "📜", level: "Intermediate", lessons: 10, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)",
    modules: DETAILED_MODULES["18-futures-trading"] || [],
  },
  {
    id: "19-options-greeks", num: "19", section: "derivatives",
    title: "Options Greeks & Option Chain Analysis",
    description: "Master Delta, Gamma, Theta, Vega, and Rho. Learn to read and interpret the NSE option chain, identify max pain, and understand implied volatility and its impact on premiums.",
    icon: "🔬", level: "Intermediate", lessons: 12, duration: "6 hrs",
    thumb: "linear-gradient(135deg, #991b1b 0%, #f87171 100%)",
    modules: DETAILED_MODULES["19-options-greeks"] || [],
  },
  {
    id: "20-options-strategies", num: "20", section: "derivatives",
    title: "Options Trading Strategies",
    description: "Learn Bull Call Spread, Bear Put Spread, Straddle, Strangle, Iron Condor, Butterfly, Covered Call, and Protective Put. Includes payoff diagrams and breakeven analysis.",
    icon: "🎯", level: "Advanced", lessons: 15, duration: "8 hrs",
    thumb: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
    modules: DETAILED_MODULES["20-options-strategies"] || [],
  },
  {
    id: "21-open-interest-pcr", num: "21", section: "derivatives",
    title: "Open Interest & PCR Analysis",
    description: "Decode OI buildup (long/short), OI unwinding, Put-Call Ratio interpretation, change in OI vs price analysis, and how to track institutional positioning through derivatives data.",
    icon: "🔢", level: "Advanced", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #991b1b 0%, #ef4444 100%)",
    modules: DETAILED_MODULES["21-open-interest-pcr"] || [],
  },

  // ═══════════ MULTI-ASSET TRADING (2 modules) ═══════════
  {
    id: "22-commodity-trading", num: "22", section: "multi-asset",
    title: "Commodity Trading — Gold, Silver & Crude",
    description: "Introduction to MCX commodity markets — gold, silver, crude oil, natural gas. Understand contract specifications, margin requirements, global price drivers, and India-specific factors.",
    icon: "🪙", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
    modules: DETAILED_MODULES["22-commodity-trading"] || [],
  },
  {
    id: "23-forex-global", num: "23", section: "multi-asset",
    title: "Introduction to Forex & Global Markets",
    description: "Understand currency pairs, USD/INR dynamics, RBI intervention, forex correlation with equity markets, global indices (S&P 500, Nasdaq, Nikkei), and inter-market analysis.",
    icon: "🌐", level: "Intermediate", lessons: 7, duration: "3.5 hrs",
    thumb: "linear-gradient(135deg, #854d0e 0%, #f59e0b 100%)",
    modules: DETAILED_MODULES["23-forex-global"] || [],
  },

  // ═══════════ RISK & PSYCHOLOGY (3 modules) ═══════════
  {
    id: "24-risk-management", num: "24", section: "risk-psychology",
    title: "Risk Management & Position Sizing",
    description: "Master the art of capital preservation — R-multiples, fixed-fractional position sizing, Kelly Criterion basics, drawdown management, portfolio heat, and correlation-aware risk allocation.",
    icon: "🛡️", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    modules: DETAILED_MODULES["24-risk-management"] || [],
  },
  {
    id: "25-trading-psychology", num: "25", section: "risk-psychology",
    title: "Trading Psychology & Emotional Discipline",
    description: "Overcome fear, greed, revenge trading, and FOMO. Learn cognitive biases (confirmation, anchoring, recency), develop a pre-market routine, and build emotional resilience.",
    icon: "🧠", level: "All Levels", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #047857 0%, #34d399 100%)",
    modules: DETAILED_MODULES["25-trading-psychology"] || [],
  },
  {
    id: "26-trade-journaling", num: "26", section: "risk-psychology",
    title: "Trade Journaling & Performance Analytics",
    description: "Build a systematic trade journal — tracking entries, exits, R-multiples, win rate, expectancy, profit factor, and maximum drawdown. Learn to identify and fix recurring mistakes.",
    icon: "📓", level: "All Levels", lessons: 6, duration: "3 hrs",
    thumb: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    modules: DETAILED_MODULES["26-trade-journaling"] || [],
  },

  // ═══════════ ADVANCED & QUANTITATIVE (4 modules) ═══════════
  {
    id: "27-algo-trading", num: "27", section: "advanced-quant",
    title: "Algorithmic Trading with Python",
    description: "Build, backtest, and deploy your own trading algorithms using Python. Covers data fetching, strategy coding, backtesting frameworks (Backtrader), and paper trading automation.",
    icon: "🐍", level: "Advanced", lessons: 22, duration: "18 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
    modules: DETAILED_MODULES["27-algo-trading"] || [],
  },
  {
    id: "28-backtesting", num: "28", section: "advanced-quant",
    title: "Backtesting Strategies",
    description: "Learn to rigorously backtest any trading strategy — avoid overfitting, survivorship bias, look-ahead bias. Understand walk-forward analysis, Monte Carlo simulation, and out-of-sample testing.",
    icon: "⏪", level: "Advanced", lessons: 8, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #1e40af 0%, #818cf8 100%)",
    modules: DETAILED_MODULES["28-backtesting"] || [],
  },
  {
    id: "29-trading-system", num: "29", section: "advanced-quant",
    title: "Building a Trading System",
    description: "Combine technical, fundamental, and quantitative elements into a complete, rule-based trading system. Define entry/exit criteria, risk parameters, and performance benchmarks.",
    icon: "⚙️", level: "Advanced", lessons: 8, duration: "5 hrs",
    thumb: "linear-gradient(135deg, #312e81 0%, #6366f1 100%)",
    modules: DETAILED_MODULES["29-trading-system"] || [],
  },
  {
    id: "30-portfolio-construction", num: "30", section: "advanced-quant",
    title: "Portfolio Construction & Asset Allocation",
    description: "Modern Portfolio Theory basics, diversification across asset classes, rebalancing strategies, core-satellite approach, and building a long-term wealth creation portfolio for Indian investors.",
    icon: "🏗️", level: "Intermediate", lessons: 8, duration: "4 hrs",
    thumb: "linear-gradient(135deg, #1e3a5f 0%, #60a5fa 100%)",
    modules: DETAILED_MODULES["30-portfolio-construction"] || [],
  },
];
