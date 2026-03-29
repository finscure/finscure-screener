import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const TICKER_DATA = [
  { symbol: "NIFTY 50", price: "23,306", change: +1.72 },
  { symbol: "SENSEX", price: "75,273", change: +1.63 },
  { symbol: "RELIANCE", price: "2,487.50", change: +1.82 },
  { symbol: "TCS", price: "3,720", change: +0.45 },
  { symbol: "HDFCBANK", price: "1,685", change: -0.32 },
  { symbol: "INFY", price: "1,523", change: +0.72 },
  { symbol: "ITC", price: "442", change: +0.38 },
  { symbol: "SBIN", price: "780", change: -0.28 },
  { symbol: "TATAMOTORS", price: "892", change: +3.21 },
  { symbol: "BAJFINANCE", price: "8,120", change: +4.12 },
];

const NEWS_ITEMS = [
  { tag: "Breaking", tagColor: "red", title: "FPI Outflows Cross ₹1 Trillion in 2026 — ₹88,180 Cr Pulled in March", source: "Angel One", time: "3d ago", impact: "High", impactColor: "red", sectors: [{ name: "Banking ↓", dir: "down" }, { name: "Large Caps ↓", dir: "down" }, { name: "DII-backed ↑", dir: "up" }] },
  { tag: "Market", tagColor: "green", title: "Sensex Surges 1,205 Pts on Iran Ceasefire Hopes", source: "ET", time: "6h ago", impact: "Med", impactColor: "amber", sectors: [{ name: "Titan ↑ 4.7%", dir: "up" }, { name: "L&T ↑ 4%", dir: "up" }, { name: "UltraTech ↑", dir: "up" }] },
  { tag: "Economy", tagColor: "amber", title: "Rupee Hits Record Lows Near ₹93.9/USD", source: "BT", time: "5d ago", impact: "High", impactColor: "red", sectors: [{ name: "IT Export ↑", dir: "up" }, { name: "Pharma ↑", dir: "up" }, { name: "Importers ↓", dir: "down" }] },
  { tag: "Geopolitics", tagColor: "red", title: "West Asia Conflict Week 4 — Hormuz Threat Elevates Oil Risks", source: "ICICI Direct", time: "5d ago", impact: "High", impactColor: "red", sectors: [{ name: "Oil & Gas ↓", dir: "down" }, { name: "Defence ↑", dir: "up" }] },
  { tag: "Policy", tagColor: "blue", title: "RBI Sells $15B+ to Defend Rupee", source: "ET", time: "2h ago", impact: "Med", impactColor: "amber", sectors: [] },
  { tag: "Sector", tagColor: "purple", title: "HSBC Flash PMI Falls to 56.5 — Weakest Since Oct 2022", source: "Trading Econ", time: "1d ago", impact: "Low", impactColor: "green", sectors: [] },
];

const ACHIEVEMENTS = [
  { icon: "🥇", name: "First Trade", desc: "Execute your first mock trade", locked: false },
  { icon: "📊", name: "Chart Master", desc: "Complete all TA modules", locked: false },
  { icon: "🔥", name: "7-Day Streak", desc: "Learn for 7 days in a row", locked: false },
  { icon: "🎖️", name: "Top 100", desc: "Reach top 100 leaderboard", locked: true },
  { icon: "💎", name: "Diamond Hands", desc: "Hold a position for 30 days", locked: true },
];

export default function DashboardPage({ onNavigate }) {
  const { user } = useAuth();
  const name = user?.displayName?.split(" ")[0] || "there";

  return (
    <div>
      {/* Ticker Tape */}
      <div className="ticker-tape">
        <div className="tape-inner">
          {[...TICKER_DATA, ...TICKER_DATA].map((t, i) => (
            <div key={i} className="tape-item">
              <span className="tape-symbol">{t.symbol}</span>
              <span className="tape-price">₹{t.price}</span>
              <span className="tape-change" style={{ color: t.change >= 0 ? "var(--green)" : "var(--red)" }}>
                {t.change >= 0 ? "▲" : "▼"} {Math.abs(t.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-layout">
        <div className="dash-main">
          {/* Hero Banner */}
          <div className="hero-banner">
            <div className="hero-grid-bg" />
            <div className="hero-glow" />
            <div className="hero-content">
              <div className="hero-tag"><span className="dot" /> Markets Open</div>
              <h1 className="hero-title">Welcome back, {name}. Your portfolio is up today.</h1>
              <p className="hero-subtitle">You've completed 3 lessons this week. Continue your momentum with today's recommended module on candlestick patterns.</p>
              <div className="hero-stats">
                <div><div className="hero-stat-val green">₹12,47,500</div><div className="hero-stat-label">Mock Portfolio Value</div></div>
                <div><div className="hero-stat-val blue">18</div><div className="hero-stat-label">Lessons Completed</div></div>
                <div><div className="hero-stat-val amber">#124</div><div className="hero-stat-label">Leaderboard Rank</div></div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon green">📈</div><span className="stat-change up">↑ 8.2%</span></div>
              <div className="stat-value">₹1,02,500</div><div className="stat-label">Mock P&L (This Month)</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon blue">🎓</div><span className="stat-change up">+3 this week</span></div>
              <div className="stat-value">18 / 45</div><div className="stat-label">Courses Progress</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon amber">🏆</div><span className="stat-change up">↑ 12</span></div>
              <div className="stat-value">2,840</div><div className="stat-label">XP Points Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon purple">🔥</div></div>
              <div className="stat-value">7 Days</div><div className="stat-label">Current Streak</div>
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

          {/* Market Indicators */}
          <div style={{ marginTop: 32 }}>
            <div className="section-header"><div><div className="section-title">Key Market Indicators</div><div className="section-subtitle">Critical data points driving current market sentiment</div></div></div>
            <div className="stats-row" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              {[
                { icon: "📈", iconC: "green", label: "Sensex (Last Close)", value: "75,273", change: "+1.63%", up: true },
                { icon: "📊", iconC: "blue", label: "Nifty 50 (Last Close)", value: "23,306", change: "+1.72%", up: true },
                { icon: "🛢️", iconC: "amber", label: "Brent Crude ($/bbl)", value: "$98.65", change: "Elevated", up: false },
                { icon: "💱", iconC: "purple", label: "USD/INR Rate", value: "₹93.88", change: "Near Low", up: false },
                { icon: "📉", iconC: "red", label: "FPI Outflow (2026)", value: "₹1T+", change: "-₹88K Cr", up: false },
              ].map((m, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-card-top">
                    <div className={`stat-icon ${m.iconC}`}>{m.icon}</div>
                    <span className={`stat-change ${m.up ? "up" : "down"}`}>{m.change}</span>
                  </div>
                  <div className="stat-value" style={{ fontSize: 22 }}>{m.value}</div>
                  <div className="stat-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Sidebar */}
        <div className="dash-news-sidebar">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--red)", animation: "pulse-dot 1.5s infinite" }} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>Market News</div>
            </div>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate("news"); }} style={{ fontSize: 12, fontWeight: 600, color: "var(--green)", textDecoration: "none" }}>View All →</a>
          </div>
          {NEWS_ITEMS.map((news, i) => (
            <div key={i} style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{
                display: "inline-block", fontSize: 10, fontWeight: 600, padding: "2px 7px",
                borderRadius: 4, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4,
                background: `var(--${news.tagColor}-dim)`, color: `var(--${news.tagColor})`,
              }}>{news.tag}</div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{news.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text-muted)" }}>
                <span>{news.source}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)" }} />
                <span>{news.time}</span>
                {news.impact && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 4,
                    marginLeft: "auto",
                    background: `var(--${news.impactColor}-dim)`, color: `var(--${news.impactColor})`,
                  }}>{news.impactColor === "red" ? "🔴" : news.impactColor === "amber" ? "🟡" : "🟢"} {news.impact}</span>
                )}
              </div>
              {news.sectors.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {news.sectors.map((s, j) => (
                    <span key={j} style={{
                      fontSize: 10, fontWeight: 500, padding: "1px 6px", borderRadius: 3,
                      background: s.dir === "up" ? "var(--green-dim)" : "var(--red-dim)",
                      color: s.dir === "up" ? "var(--green)" : "var(--red)",
                    }}>{s.name}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
