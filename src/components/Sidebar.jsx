import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// ═══════════════════════════════════════════════
// NAV ITEMS — minStage determines when each appears
// Stage 1: Learn, Practice, Progress
// Stage 2: +Screener (Nifty50), +Watchlist, +News
// Stage 3: Full screener, Charts, Sectors, FVM, Community
// Stage 4: Backtester, F&O, Strategy Builder, Scanner, Query Builder
// ═══════════════════════════════════════════════

const NAV_ITEMS = [
  // Stage 1: Core 3
  { id: "learn",     icon: "📚", label: "Learn",         minStage: 1, section: "Core" },
  { id: "trading",   icon: "💹", label: "Practice",      minStage: 1, section: "Core" },
  { id: "progress",  icon: "📊", label: "My Progress",   minStage: 1, section: "Core" },

  // Stage 2: Expanded
  { id: "screener",  icon: "🔎", label: "Screener",      minStage: 2, section: "Tools", badge: "Nifty 50" },
  { id: "alerts",    icon: "🔔", label: "Watchlist",      minStage: 2, section: "Tools" },
  { id: "news",      icon: "📰", label: "News",           minStage: 2, section: "Discover" },

  // Stage 3: Full tools
  { id: "dashboard", icon: "🏠", label: "Dashboard",      minStage: 3, section: "Core" },
  { id: "chart",     icon: "📈", label: "Charts",         minStage: 3, section: "Tools" },
  { id: "fvm",       icon: "⭐", label: "FVM Score",      minStage: 3, section: "Tools" },
  { id: "sectors",   icon: "🏭", label: "Sectors",        minStage: 3, section: "Research" },
  { id: "fiidii",    icon: "🏛", label: "FII / DII",      minStage: 3, section: "Research" },
  { id: "calendar",  icon: "📅", label: "Calendar",       minStage: 3, section: "Discover" },
  { id: "ipo",       icon: "🚀", label: "IPO Tracker",    minStage: 3, section: "Discover" },
  { id: "community", icon: "💬", label: "Community",      minStage: 3, section: "Discover" },
  { id: "recommendations", icon: "💡", label: "SEBI RA Picks", minStage: 3, section: "Research" },
  { id: "strategies",icon: "🎯", label: "Strategies",     minStage: 3, section: "Research" },

  // Stage 4: Premium
  { id: "backtest",  icon: "⏪", label: "Backtester",     minStage: 4, section: "Advanced" },
  { id: "fno",       icon: "⚡", label: "F&O Derivatives", minStage: 4, section: "Advanced" },
  { id: "builder",   icon: "🧮", label: "Strategy Builder",minStage: 4, section: "Advanced" },
  { id: "candle",    icon: "🕯", label: "Candle Scanner", minStage: 4, section: "Advanced" },
  { id: "thematic",  icon: "📦", label: "Portfolios",     minStage: 4, section: "Advanced" },
];

const STAGE_META = {
  1: { emoji: "🌱", label: "Beginner", color: "var(--green)", bg: "var(--green-dim)" },
  2: { emoji: "🧭", label: "Explorer", color: "var(--blue)", bg: "var(--blue-dim)" },
  3: { emoji: "📊", label: "Active Learner", color: "var(--amber)", bg: "var(--amber-dim)" },
  4: { emoji: "⚡", label: "Serious Trader", color: "var(--purple)", bg: "rgba(139,92,246,0.12)" },
};

export default function Sidebar({ activePage, onNavigate }) {
  const { userProfile } = useAuth();
  const stage = userProfile?.interface_stage || 1;
  const meta = STAGE_META[stage] || STAGE_META[1];
  const [showMore, setShowMore] = useState(false);

  const visible = NAV_ITEMS.filter(n => n.minStage <= stage);
  const hidden = NAV_ITEMS.filter(n => n.minStage > stage);

  // Group visible items by section
  const sections = {};
  for (const item of visible) {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push(item);
  }

  return (
    <aside style={{
      width: 220, minWidth: 220, height: "100%",
      background: "var(--bg-secondary)", borderRight: "1px solid var(--border)",
      padding: "16px 12px", overflowY: "auto",
    }}>
      {/* Stage Badge */}
      <div style={{ margin: "0 8px 16px", padding: "10px 12px", borderRadius: 10, background: meta.bg, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>{meta.emoji}</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>{meta.label}</div>
          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Stage {stage} · {visible.length} features</div>
        </div>
      </div>

      {/* Nav Sections */}
      {Object.entries(sections).map(([sectionName, items]) => (
        <div key={sectionName} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--text-muted)", padding: "0 12px", marginBottom: 6 }}>{sectionName}</div>
          {items.map(item => {
            const isActive = activePage === item.id;
            return (
              <div key={item.id} onClick={() => onNavigate(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 8, fontSize: 14,
                  color: isActive ? "var(--green)" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.15s",
                  background: isActive ? "var(--green-dim)" : "transparent",
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "var(--hover-subtle)"; e.currentTarget.style.color = "var(--text-primary)"; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
              >
                <span style={{ width: 20, textAlign: "center", fontSize: 16 }}>{item.icon}</span>
                {item.label}
                {item.badge && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, background: "var(--surface)", color: "var(--text-muted)", padding: "1px 6px", borderRadius: 8 }}>{item.badge}</span>}
              </div>
            );
          })}
        </div>
      ))}

      {/* Explore More (hidden items) */}
      {hidden.length > 0 && (
        <div style={{ margin: "8px 8px 16px" }}>
          <button onClick={() => setShowMore(!showMore)}
            style={{
              width: "100%", padding: "9px 12px", borderRadius: 8,
              background: showMore ? "var(--blue-dim)" : "var(--surface)",
              border: `1px solid ${showMore ? "rgba(96,165,250,0.2)" : "var(--border)"}`,
              color: showMore ? "var(--blue)" : "var(--text-muted)",
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
            {showMore ? "Show Less" : `Explore More (${hidden.length})`}
            <span style={{ fontSize: 10, transition: "transform 0.2s", transform: showMore ? "rotate(180deg)" : "none" }}>▼</span>
          </button>
          {showMore && (
            <div style={{ marginTop: 8 }}>
              {hidden.map(item => (
                <div key={item.id} onClick={() => onNavigate(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                    borderRadius: 8, fontSize: 13, color: "var(--text-muted)", cursor: "pointer",
                    opacity: 0.6, transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <span style={{ width: 20, textAlign: "center", fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                  <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 600, padding: "1px 5px", borderRadius: 4, background: "var(--surface)", color: "var(--text-muted)" }}>Stage {item.minStage}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Streak / Progress */}
      <div style={{ margin: "8px 8px 0", padding: 12, background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>🔥 Streak</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--amber)" }}>{userProfile?.streak_current || 0} days</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>💰 Portfolio</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>₹{((userProfile?.virtual_portfolio_value || 100000) / 100000).toFixed(1)}L</span>
        </div>
      </div>
    </aside>
  );
}
