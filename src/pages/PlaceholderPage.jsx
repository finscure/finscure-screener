export default function PlaceholderPage({ title, subtitle, icon }) {
  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{title}</div>
          {subtitle && <div className="section-subtitle">{subtitle}</div>}
        </div>
      </div>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 14, padding: "80px 40px", textAlign: "center",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{icon || "🚧"}</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
          This section is under development and will be available in the next update. Stay tuned!
        </div>
        <div style={{
          display: "inline-block", marginTop: 20, fontSize: 12, fontWeight: 600,
          padding: "6px 16px", borderRadius: 20,
          background: "var(--amber-dim)", color: "var(--amber)",
        }}>Coming Soon</div>
      </div>
    </div>
  );
}
