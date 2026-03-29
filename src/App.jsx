import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ScreenerPage from "./pages/ScreenerPage";
import CoursesPage from "./pages/CoursesPage";
import TradingPage from "./pages/TradingPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import "./styles/theme.css";

const PLACEHOLDER_PAGES = {
  chart: { title: "Interactive Charts", subtitle: "Technical indicators: MA, Bollinger, RSI, MACD", icon: "📈" },
  strategies: { title: "Trading Strategies", subtitle: "Pre-built strategies with backtesting", icon: "🎯" },
  recommendations: { title: "SEBI RA Picks", subtitle: "Stock picks from registered Research Analysts", icon: "💡" },
  fno: { title: "F&O Derivatives", subtitle: "Options Chain · PCR · Open Interest", icon: "⚡" },
  candle: { title: "Candlestick Scanner", subtitle: "AI auto-scan · 4,600+ stocks", icon: "🕯" },
  fvm: { title: "FVM Score™", subtitle: "Fundamental + Valuation + Momentum", icon: "⭐" },
  sectors: { title: "Sector Analytics", subtitle: "Sector rotation & heatmap", icon: "🏭" },
  backtest: { title: "Strategy Backtester", subtitle: "Test against 10 years of data", icon: "⏪" },
  builder: { title: "Custom Screener Builder", subtitle: "AND/OR logic · Save & reuse screens", icon: "🧮" },
  news: { title: "Market News & Insights", subtitle: "Latest developments shaping Indian markets", icon: "📰" },
  fiidii: { title: "FII / DII Activity", subtitle: "Foreign & domestic institutional flows", icon: "🏛" },
  calendar: { title: "Calendar & Earnings", subtitle: "Events, results & holidays", icon: "📅" },
  alerts: { title: "Alerts & Watchlist", subtitle: "Price alerts and tracked stocks", icon: "🔔" },
  ipo: { title: "IPO Tracker", subtitle: "Upcoming, open & recently listed", icon: "🚀" },
  thematic: { title: "Thematic Portfolios", subtitle: "Curated stock baskets by theme", icon: "📦" },
  community: { title: "Community", subtitle: "Discussions, ideas & journeys", icon: "💬" },
};

const SEARCH_SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
];

function parseSearchCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    if (cl[0] && parseFloat(cl[4]) > 0) data[cl[0]] = { symbol: cl[0], name: cl[1]||cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5])||0 };
  }
  return data;
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("finscure-theme") || "dark"; } catch { return "dark"; }
  });
  const [stockPrices, setStockPrices] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("finscure-theme", theme); } catch {}
  }, [theme]);

  // Fetch stock prices for search (shared across app)
  useEffect(() => {
    async function fetchPrices() {
      try {
        const results = await Promise.allSettled(SEARCH_SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const merged = {};
        for (const r of results) if (r.status === "fulfilled") Object.assign(merged, parseSearchCSV(r.value));
        if (Object.keys(merged).length > 0) setStockPrices(merged);
      } catch (e) { console.error(e); }
    }
    fetchPrices();
    const iv = setInterval(fetchPrices, 180000);
    return () => clearInterval(iv);
  }, []);

  function toggleTheme() { setTheme(t => t === "dark" ? "light" : "dark"); }
  function navigate(page) { setActivePage(page); window.scrollTo(0, 0); }

  function renderPage() {
    switch (activePage) {
      case "dashboard": return <DashboardPage onNavigate={navigate} />;
      case "screener": return <ScreenerPage />;
      case "courses": return <CoursesPage />;
      case "trading": return <TradingPage />;
      default: {
        const ph = PLACEHOLDER_PAGES[activePage];
        if (ph) return <PlaceholderPage {...ph} />;
        return <DashboardPage onNavigate={navigate} />;
      }
    }
  }

  return (
    <AuthProvider>
      <TopNav activePage={activePage} onNavigate={navigate} onToggleTheme={toggleTheme} theme={theme} stockPrices={stockPrices} />
      <div className="app-layout">
        <Sidebar activePage={activePage} onNavigate={navigate} />
        <main className="main-content" key={activePage} style={{ animation: "fadeUp 0.4s ease" }}>
          {renderPage()}
        </main>
      </div>
    </AuthProvider>
  );
}
