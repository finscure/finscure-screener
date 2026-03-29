export default function Sidebar({ activePage, onNavigate }) {
  const sections = [
    {
      label: "Main", items: [
        { id: "dashboard", icon: "📊", label: "Dashboard" },
        { id: "screener", icon: "🔎", label: "Screener", badge: "50+" },
        { id: "chart", icon: "📈", label: "Charts" },
        { id: "trading", icon: "💹", label: "Mock Trade" },
      ]
    },
    {
      label: "Learn", items: [
        { id: "courses", icon: "📚", label: "Courses", badge: "7" },
        { id: "strategies", icon: "🎯", label: "Strategies" },
        { id: "recommendations", icon: "💡", label: "SEBI RA Picks" },
      ]
    },
    {
      label: "Research", items: [
        { id: "fno", icon: "⚡", label: "F&O Derivatives" },
        { id: "candle", icon: "🕯", label: "Candlestick Scan" },
        { id: "fvm", icon: "⭐", label: "FVM Score" },
        { id: "sectors", icon: "🏭", label: "Sector Analytics" },
        { id: "backtest", icon: "⏪", label: "Backtester" },
        { id: "builder", icon: "🧮", label: "Query Builder" },
      ]
    },
    {
      label: "Discover", items: [
        { id: "news", icon: "📰", label: "News" },
        { id: "fiidii", icon: "🏛", label: "FII / DII" },
        { id: "calendar", icon: "📅", label: "Calendar" },
        { id: "alerts", icon: "🔔", label: "Alerts" },
        { id: "ipo", icon: "🚀", label: "IPO Tracker" },
        { id: "thematic", icon: "📦", label: "Portfolios" },
        { id: "community", icon: "💬", label: "Community" },
      ]
    },
  ];

  return (
    <aside style={{
      width: 220, minWidth: 220, minHeight: "calc(100vh - 64px)",
      background: "var(--bg-secondary)", borderRight: "1px solid var(--border)",
      padding: "20px 12px", position: "fixed", top: 64, left: 0, bottom: 0,
      overflowY: "auto", transition: "all 0.35s",
    }}>
      {sections.map(section => (
        <div key={section.label} style={{ marginBottom: 28 }}>
          <div style={{
            fontSize: 10, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: 1.2, color: "var(--text-muted)",
            padding: "0 12px", marginBottom: 8,
          }}>{section.label}</div>
          {section.items.map(item => {
            const isActive = activePage === item.id;
            return (
              <div key={item.id}
                onClick={() => onNavigate(item.id)}
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
                {item.badge && (
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 600,
                    background: "var(--green-dim)", color: "var(--green)",
                    padding: "1px 8px", borderRadius: 10,
                  }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}

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
