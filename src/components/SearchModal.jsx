import { useState, useEffect, useRef } from "react";

const PAGES = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "screener", label: "Stock Screener", icon: "🔎" },
  { id: "courses", label: "Courses", icon: "📚" },
  { id: "trading", label: "Mock Trade", icon: "💹" },
  { id: "chart", label: "Charts", icon: "📈" },
  { id: "strategies", label: "Strategies", icon: "🎯" },
  { id: "news", label: "Market News", icon: "📰" },
  { id: "fiidii", label: "FII / DII Activity", icon: "🏛" },
  { id: "calendar", label: "Calendar & Earnings", icon: "📅" },
  { id: "alerts", label: "Alerts & Watchlist", icon: "🔔" },
  { id: "ipo", label: "IPO Tracker", icon: "🚀" },
  { id: "recommendations", label: "SEBI RA Picks", icon: "💡" },
  { id: "fvm", label: "FVM Score", icon: "⭐" },
  { id: "sectors", label: "Sector Analytics", icon: "🏭" },
  { id: "community", label: "Community", icon: "💬" },
];

export default function SearchModal({ onClose, onNavigate, stockPrices }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Search pages
  const pageResults = query.length >= 1
    ? PAGES.filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
    : PAGES.slice(0, 6);

  // Search stocks
  const stockResults = query.length >= 2 && stockPrices
    ? Object.values(stockPrices)
        .filter(s => s.symbol.toLowerCase().includes(query.toLowerCase()) || s.name?.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  function handleSelect(pageId) {
    onNavigate(pageId);
    onClose();
  }

  function handleStockSelect(symbol) {
    onNavigate("screener"); // Navigate to screener when stock is clicked
    onClose();
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center",
      paddingTop: 120, background: "var(--modal-bg)", backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16,
        width: 560, maxWidth: "90vw", boxShadow: "var(--shadow-lg)", overflow: "hidden",
        animation: "fadeUp 0.2s ease",
      }} onClick={e => e.stopPropagation()}>
        {/* Search Input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontSize: 18, color: "var(--text-muted)" }}>🔍</span>
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search stocks, courses, or pages..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 16, color: "var(--text-primary)", fontFamily: "'DM Sans',sans-serif",
            }}
          />
          <kbd style={{ background: "var(--kbd-bg)", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "var(--text-muted)" }}>ESC</kbd>
        </div>

        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {/* Stock Results */}
          {stockResults.length > 0 && (
            <div>
              <div style={{ padding: "10px 20px 6px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)" }}>Stocks</div>
              {stockResults.map(s => (
                <div key={s.symbol} onClick={() => handleStockSelect(s.symbol)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", cursor: "pointer", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>
                    {s.symbol.slice(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{s.symbol}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 600 }}>₹{s.ltp?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, color: s.change >= 0 ? "var(--green)" : "var(--red)" }}>
                      {s.change >= 0 ? "+" : ""}{s.change?.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Page Results */}
          <div>
            <div style={{ padding: "10px 20px 6px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)" }}>
              {query ? "Pages" : "Quick Navigation"}
            </div>
            {pageResults.map(p => (
              <div key={p.id} onClick={() => handleSelect(p.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", cursor: "pointer", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{p.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{p.label}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-muted)" }}>→</span>
              </div>
            ))}
          </div>

          {query && stockResults.length === 0 && pageResults.length === 0 && (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
              No results for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "10px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 16, fontSize: 11, color: "var(--text-muted)" }}>
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
