export default function UpgradeModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--modal-bg)", backdropFilter: "blur(8px)", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18,
        width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)", animation: "fadeUp 0.3s ease",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, margin: 0 }}>✦ Finscure Pro</h2>
          <div onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "var(--text-secondary)",
          }}>✕</div>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {/* Coming Soon Badge */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--amber-dim)", color: "var(--amber)",
              fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 20,
              letterSpacing: 0.5,
            }}>
              🚀 COMING SOON
            </span>
            <div style={{ fontSize: 15, color: "var(--text-secondary)", marginTop: 12, lineHeight: 1.6 }}>
              We're building something special. Pro features will unlock the full power of Finscure.
            </div>
          </div>

          {/* Feature Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {[
              { icon: "🔎", title: "Full NSE/BSE Screener", desc: "50+ filters across 5,000+ stocks" },
              { icon: "📈", title: "Advanced Charts", desc: "TradingView-grade indicators & tools" },
              { icon: "⭐", title: "FVM Score™", desc: "Fundamental + Valuation + Momentum scoring" },
              { icon: "🏭", title: "Sector Analytics", desc: "Rotation tracking & heatmaps" },
              { icon: "⏪", title: "Strategy Backtester", desc: "Test against 10 years of data" },
              { icon: "⚡", title: "F&O Derivatives", desc: "Options chain, OI analysis, PCR" },
              { icon: "🤖", title: "Algo Trading Tools", desc: "Strategy builder & scanner" },
              { icon: "🏆", title: "FPL Competitions", desc: "Compete with real prizes" },
            ].map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
                borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.desc}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "var(--amber)", background: "var(--amber-dim)", padding: "2px 8px", borderRadius: 4 }}>Soon</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            background: "var(--bg-secondary)", borderRadius: 12, padding: 20, textAlign: "center",
            border: "1px solid var(--border)",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              Get notified when Pro launches
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
              Early subscribers get exclusive launch pricing
            </div>
            <button onClick={onClose} className="btn-primary" style={{ padding: "12px 32px", fontSize: 14, width: "100%" }}>
              🔔 Notify Me at Launch
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
            Free users keep full access to Modules 1–3, mock trading, and progress tracking.
          </div>
        </div>
      </div>
    </div>
  );
}
