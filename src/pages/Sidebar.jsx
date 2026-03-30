import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// ═══════════════════════════════════════════════
// SIDEBAR NAV ITEMS — organized by visibility level
// "all" = always visible regardless of level
// "beginner" = visible to beginner and above
// "intermediate" = visible to intermediate and above
// "advanced" = visible to advanced only (or via Explore More)
// ═══════════════════════════════════════════════

const ALL_SECTIONS = [
  {
    label: "Main", items: [
      { id: "dashboard", icon: "📊", label: "Dashboard", minLevel: "all" },
      { id: "screener", icon: "🔎", label: "Screener", badge: "50+", minLevel: "intermediate" },
      { id: "chart", icon: "📈", label: "Charts", minLevel: "intermediate" },
      { id: "trading", icon: "💹", label: "Mock Trade", minLevel: "all" },
    ]
  },
  {
    label: "Learn", items: [
      { id: "courses", icon: "📚", label: "Courses", badge: "30", minLevel: "all" },
      { id: "strategies", icon: "🎯", label: "Strategies", minLevel: "intermediate" },
      { id: "recommendations", icon: "💡", label: "SEBI RA Picks", minLevel: "intermediate" },
    ]
  },
  {
    label: "Research", items: [
      { id: "fno", icon: "⚡", label: "F&O Derivatives", minLevel: "advanced" },
      { id: "candle", icon: "🕯", label: "Candlestick Scan", minLevel: "advanced" },
      { id: "fvm", icon: "⭐", label: "FVM Score", minLevel: "advanced" },
      { id: "sectors", icon: "🏭", label: "Sector Analytics", minLevel: "intermediate" },
      { id: "backtest", icon: "⏪", label: "Backtester", minLevel: "advanced" },
      { id: "builder", icon: "🧮", label: "Query Builder", minLevel: "advanced" },
    ]
  },
  {
    label: "Discover", items: [
      { id: "news", icon: "📰", label: "News", minLevel: "all" },
      { id: "fiidii", icon: "🏛", label: "FII / DII", minLevel: "all" },
      { id: "calendar", icon: "📅", label: "Calendar", minLevel: "all" },
      { id: "alerts", icon: "🔔", label: "Alerts", minLevel: "all" },
      { id: "ipo", icon: "🚀", label: "IPO Tracker", minLevel: "intermediate" },
      { id: "thematic", icon: "📦", label: "Portfolios", minLevel: "advanced" },
      { id: "community", icon: "💬", label: "Community", minLevel: "intermediate" },
    ]
  },
];

const LEVEL_PRIORITY = { all: 0, beginner: 1, intermediate: 2, advanced: 3 };

function getUserLevelNum(level) {
  if (level === "advanced") return 3;
  if (level === "intermediate") return 2;
  return 1; // beginner or undefined
}

function isItemVisible(item, userLevel) {
  const required = LEVEL_PRIORITY[item.minLevel] || 0;
  if (required === 0) return true; // "all" items always visible
  return getUserLevelNum(userLevel) >= required;
}

export default function Sidebar({ activePage, onNavigate }) {
  const { userProfile } = useAuth();
  const userLevel = userProfile?.level || "beginner";
  const [showExplore, setShowExplore] = useState(false);

  // Count hidden items
  const allItems = ALL_SECTIONS.flatMap(s => s.items);
  const visibleItems = allItems.filter(i => isItemVisible(i, userLevel));
  const hiddenItems = allItems.filter(i => !isItemVisible(i, userLevel));
  const hasHidden = hiddenItems.length > 0;

  return (
    <aside style={{
      width: 220, minWidth: 220, minHeight: "calc(100vh - 64px)",
      background: "var(--bg-secondary)", borderRight: "1px solid var(--border)",
      padding: "20px 12px", position: "fixed", top: 64, left: 0, bottom: 0,
      overflowY: "auto", transition: "all 0.35s",
    }}>
      {/* User Level Badge */}
      {userProfile?.level && (
        <div style={{
          margin: "0 12px 16px", padding: "8px 12px", borderRadius: 8,
          background: userLevel === "advanced" ? "var(--amber-dim)" : userLevel === "intermediate" ? "var(--blue-dim)" : "var(--green-dim)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>{userLevel === "advanced" ? "⚡" : userLevel === "intermediate" ? "📊" : "🌱"}</span>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: "capitalize",
              color: userLevel === "advanced" ? "var(--amber)" : userLevel === "intermediate" ? "var(--blue)" : "var(--green)",
            }}>{userLevel}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{visibleItems.length} modules</div>
          </div>
        </div>
      )}

      {/* Visible Sections */}
      {ALL_SECTIONS.map(section => {
        const sectionItems = section.items.filter(i => showExplore || isItemVisible(i, userLevel));
        if (sectionItems.length === 0) return null;

        return (
          <div key={section.label} style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 10, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: 1.2, color: "var(--text-muted)", padding: "0 12px", marginBottom: 8,
            }}>{section.label}</div>
            {sectionItems.map(item => {
              const isActive = activePage === item.id;
              const isHidden = !isItemVisible(item, userLevel);
              return (
                <div key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 12px", borderRadius: 8, fontSize: 14,
                    color: isActive ? "var(--green)" : isHidden ? "var(--text-muted)" : "var(--text-secondary)",
                    cursor: "pointer", transition: "all 0.15s",
                    background: isActive ? "var(--green-dim)" : "transparent",
                    fontWeight: isActive ? 600 : 400,
                    opacity: isHidden ? 0.6 : 1,
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "var(--hover-subtle)"; e.currentTarget.style.color = "var(--text-primary)"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = isHidden ? "var(--text-muted)" : "var(--text-secondary)"; }}}
                >
                  <span style={{ width: 20, textAlign: "center", fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                  {item.badge && (
                    <span style={{
                      marginLeft: "auto", fontSize: 11, fontWeight: 600,
                      background: "var(--green-dim)", color: "var(--green)",
                      padding: "1px 8px", borderRadius: 10,
                    }}>{item.badge}</span>
                  )}
                  {isHidden && (
                    <span style={{
                      marginLeft: "auto", fontSize: 9, fontWeight: 600, padding: "1px 6px",
                      borderRadius: 4, background: "var(--surface)", color: "var(--text-muted)",
                    }}>NEW</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Explore More */}
      {hasHidden && (
        <div style={{ margin: "0 12px 16px" }}>
          <button onClick={() => setShowExplore(!showExplore)}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: 8,
              background: showExplore ? "var(--blue-dim)" : "var(--surface)",
              border: `1px solid ${showExplore ? "rgba(96,165,250,0.2)" : "var(--border)"}`,
              color: showExplore ? "var(--blue)" : "var(--text-muted)",
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
            {showExplore ? "Show Less" : `Explore More (${hiddenItems.length})`}
            <span style={{ fontSize: 10, transition: "transform 0.2s", transform: showExplore ? "rotate(180deg)" : "none" }}>▼</span>
          </button>
        </div>
      )}

      {/* Progress */}
      <div style={{ margin: "0 12px", padding: 14, background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border)" }}>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>Overall Progress</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--green)" }}>42%</div>
        <div style={{ width: "100%", height: 4, background: "var(--surface)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 2, background: "var(--gradient-green)", width: "42%" }} />
        </div>
      </div>
    </aside>
  );
}
