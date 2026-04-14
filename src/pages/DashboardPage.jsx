import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import NewsSidebar from "../components/NewsSidebar";

const SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
];

function parseCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = [];
  for (const row of rows) {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    if (cl[0] && parseFloat(cl[4]) > 0) data.push({ symbol: cl[0], name: cl[1] || cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5]) || 0 });
  }
  return data;
}

const fmt = n => { if (!n) return "₹0"; const a = Math.abs(n); if (a >= 1e7) return `₹${(n/1e7).toFixed(2)} Cr`; if (a >= 1e5) return `₹${(n/1e5).toFixed(2)} L`; return `₹${n.toLocaleString("en-IN",{maximumFractionDigits:2})}`; };

const ACHIEVEMENTS = [
  { icon: "🥇", name: "First Trade", desc: "Execute your first mock trade", locked: false },
  { icon: "📊", name: "Chart Master", desc: "Complete all TA modules", locked: false },
  { icon: "🔥", name: "7-Day Streak", desc: "Learn for 7 days in a row", locked: false },
  { icon: "🎖️", name: "Top 100", desc: "Reach top 100 leaderboard", locked: true },
  { icon: "💎", name: "Diamond Hands", desc: "Hold a position for 30 days", locked: true },
];

export default function DashboardPage({ onNavigate }) {
  const { user, userProfile } = useAuth();
  const name = user?.displayName?.split(" ")[0] || "there";
  const [tickerData, setTickerData] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [prices, setPrices] = useState({});

  // Fetch live ticker data
  useEffect(() => {
    async function fetchTicker() {
      try {
        const results = await Promise.allSettled(SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const all = [];
        const priceMap = {};
        for (const r of results) if (r.status === "fulfilled") {
          const parsed = parseCSV(r.value);
          all.push(...parsed);
          parsed.forEach(s => { priceMap[s.symbol] = s; });
        }
        // Pick top movers for ticker
        const sorted = all.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
        setTickerData(sorted.slice(0, 15));
        setPrices(priceMap);
      } catch (e) { console.error(e); }
    }
    fetchTicker();
    const iv = setInterval(fetchTicker, 180000);
    return () => clearInterval(iv);
  }, []);

  // Load portfolio
  useEffect(() => {
    if (!user) return;
    async function load() {
      try {
        const snap = await getDoc(doc(db, "mock_portfolios", user.uid));
        if (snap.exists()) setPortfolio(snap.data());
      } catch (e) { console.error(e); }
    }
    load();
  }, [user]);

  // Calculate portfolio stats
  const holdingsValue = portfolio ? portfolio.holdings.reduce((s, h) => s + h.qty * (prices[h.symbol]?.ltp || h.avgPrice), 0) : 0;
  const totalValue = portfolio ? portfolio.cash + holdingsValue : 0;
  const totalPnL = portfolio ? totalValue - portfolio.startingCapital : 0;
  const returnPct = portfolio && portfolio.startingCapital ? (totalPnL / portfolio.startingCapital * 100).toFixed(1) : "0";
  const stockCount = portfolio ? portfolio.holdings.length : 0;

  // Determine market status
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const day = now.getDay();
  const isWeekday = day >= 1 && day <= 5;
  const afterOpen = hour > 9 || (hour === 9 && min >= 15);
  const beforeClose = hour < 15 || (hour === 15 && min <= 30);
  const marketOpen = isWeekday && afterOpen && beforeClose;

  return (
    <div>
      {/* Ticker Tape */}
      {tickerData.length > 0 && (
        <div className="ticker-tape">
          <div className="tape-inner">
            {[...tickerData, ...tickerData].map((t, i) => (
              <div key={i} className="tape-item">
                <span className="tape-symbol">{t.symbol}</span>
                <span className="tape-price">₹{t.ltp?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                <span className="tape-change" style={{ color: t.change >= 0 ? "var(--green)" : "var(--red)" }}>
                  {t.change >= 0 ? "▲" : "▼"} {Math.abs(t.change).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dash-layout">
        <div className="dash-main">
          {/* Hero Banner */}
          <div className="hero-banner">
            <div className="hero-grid-bg" />
            <div className="hero-glow" />
            <div className="hero-content">
              <div className="hero-tag"><span className="dot" /> {marketOpen ? "Markets Open" : "Markets Closed"}</div>
              <h1 className="hero-title">Welcome back, {name}. {totalPnL >= 0 ? "Keep learning, markets are cyclical." : "Stay disciplined, focus on learning."}</h1>
              <p className="hero-subtitle">You've completed {userProfile?.lessons_completed || 0} lessons. Start with Stock Market Basics.</p>
              <div className="hero-stats">
                <div><div className="hero-stat-val green">{fmt(totalValue || (portfolio?.startingCapital || 0))}</div><div className="hero-stat-label">Mock Portfolio Value</div></div>
                <div><div className="hero-stat-val blue">{userProfile?.lessons_completed || 0}</div><div className="hero-stat-label">Lessons Completed</div></div>
                <div><div className={`hero-stat-val ${totalPnL >= 0 ? "green" : "red"}`}>{returnPct}%</div><div className="hero-stat-label">Portfolio Return</div></div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon green">📈</div>{totalPnL !== 0 && <span className={`stat-change ${totalPnL >= 0 ? "up" : "down"}`}>{totalPnL >= 0 ? "↑" : "↓"} {Math.abs(parseFloat(returnPct))}%</span>}</div>
              <div className="stat-value">{fmt(totalPnL)}</div><div className="stat-label">Mock P&L (Overall)</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon blue">🎓</div></div>
              <div className="stat-value">{userProfile?.lessons_completed || 0} / 90</div><div className="stat-label">Lessons Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon amber">🏆</div></div>
              <div className="stat-value">{stockCount}</div><div className="stat-label">Stocks in Portfolio</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon purple">💰</div></div>
              <div className="stat-value">{fmt(portfolio?.cash || 0)}</div><div className="stat-label">Available Cash</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="section-header"><div><div className="section-title">Achievements</div><div className="section-subtitle">Earn badges as you progress</div></div></div>
          <div className="achievements-row">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className={`achievement${a.locked ? " locked" : ""}`}>
                <div className="achievement-icon">{a.icon}</div>
                <div className="achievement-name">{a.name}</div>
                <div className="achievement-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live News Sidebar */}
        <NewsSidebar onViewAll={() => onNavigate("news")} />
      </div>
    </div>
  );
}
