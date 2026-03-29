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

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("finscure-theme") || "dark"; } catch { return "dark"; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("finscure-theme", theme); } catch {}
  }, [theme]);

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
      <TopNav activePage={activePage} onNavigate={navigate} onToggleTheme={toggleTheme} theme={theme} />
      <div className="app-layout">
        <Sidebar activePage={activePage} onNavigate={navigate} />
        <main className="main-content" key={activePage} style={{ animation: "fadeUp 0.4s ease" }}>
          {renderPage()}
        </main>
      </div>
    </AuthProvider>
  );
}
