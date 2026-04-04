import { useState } from "react";

export default function LandingPage({ onNotYet, onHaveExperience }) {
  const [hover, setHover] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* Logo */}
      <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--gradient-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "var(--btn-text)", marginBottom: 24 }}>F</div>

      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 8, lineHeight: 1.2 }}>
        Learn to Invest.<br />
        <span style={{ color: "var(--green)" }}>For Real.</span>
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", textAlign: "center", maxWidth: 420, marginBottom: 48, lineHeight: 1.6 }}>
        India's step-by-step stock market learning platform.
        Practice with virtual money. Learn at your pace.
      </p>

      {/* The Gate Question */}
      <div style={{ width: "100%", maxWidth: 500 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, textAlign: "center", marginBottom: 20 }}>
          Have you ever invested in the stock market?
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Option A: Not yet */}
          <button onClick={onNotYet}
            onMouseEnter={() => setHover("not-yet")} onMouseLeave={() => setHover(null)}
            style={{
              width: "100%", padding: "22px 24px", borderRadius: 14, border: `2px solid ${hover === "not-yet" ? "var(--green)" : "var(--border)"}`,
              background: hover === "not-yet" ? "var(--green-dim)" : "var(--bg-card)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s", textAlign: "left",
            }}>
            <span style={{ fontSize: 32 }}>🌱</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Not yet</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>I'm new and want to learn from scratch</div>
            </div>
          </button>

          {/* Option B: Yes, I have experience */}
          <button onClick={onHaveExperience}
            onMouseEnter={() => setHover("experienced")} onMouseLeave={() => setHover(null)}
            style={{
              width: "100%", padding: "22px 24px", borderRadius: 14, border: `2px solid ${hover === "experienced" ? "var(--blue)" : "var(--border)"}`,
              background: hover === "experienced" ? "var(--blue-dim)" : "var(--bg-card)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s", textAlign: "left",
            }}>
            <span style={{ fontSize: 32 }}>📊</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Yes, I have some experience</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>I've traded before and want to level up</div>
            </div>
          </button>
        </div>
      </div>

      {/* Subtle trust indicators */}
      <div style={{ display: "flex", gap: 24, marginTop: 48, fontSize: 12, color: "var(--text-muted)" }}>
        <span>📚 30 Modules</span>
        <span>💹 Mock Trading</span>
        <span>🆓 Free to Start</span>
      </div>
    </div>
  );
}
