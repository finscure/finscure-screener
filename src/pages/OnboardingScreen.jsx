import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LEVELS = [
  {
    id: "beginner",
    emoji: "🌱",
    title: "Beginner",
    subtitle: "I'm new to stocks",
    description: "Perfect for first-time investors. We'll start with the basics — what stocks are, how markets work, and guide you step-by-step.",
    features: ["Guided learning path", "Simplified dashboard", "Mock trading with guidance", "Essential news only"],
    color: "var(--green)",
    bg: "var(--green-dim)",
  },
  {
    id: "intermediate",
    emoji: "📊",
    title: "Intermediate",
    subtitle: "I know the basics",
    description: "You understand stocks and want to level up. Access screeners, charts, strategies, and deeper analysis tools.",
    features: ["Full course library", "Stock screener", "Charts & indicators", "SEBI RA picks", "FII/DII data"],
    color: "var(--blue)",
    bg: "var(--blue-dim)",
  },
  {
    id: "advanced",
    emoji: "⚡",
    title: "Advanced",
    subtitle: "I trade actively",
    description: "Full access to everything — F&O data, candlestick scanner, backtester, FVM scores, and quantitative tools.",
    features: ["All 20+ modules unlocked", "F&O & options chain", "Backtester & query builder", "FVM scoring", "Competitions"],
    color: "var(--amber)",
    bg: "var(--amber-dim)",
  },
];

export default function OnboardingScreen() {
  const { user, setExperienceLevel } = useAuth();
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const name = user?.displayName?.split(" ")[0] || "there";

  async function handleContinue() {
    if (!selected) return;
    setSaving(true);
    await setExperienceLevel(selected);
    setSaving(false);
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg-primary)", padding: 20,
    }}>
      <div style={{ maxWidth: 820, width: "100%", textAlign: "center" }}>
        {/* Header */}
        <div style={{
          width: 48, height: 48, borderRadius: 12, background: "var(--gradient-green)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, color: "var(--btn-text)", marginBottom: 20,
        }}>F</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Welcome, {name}!
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>
          Help us personalize your experience. You can change this anytime from settings.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>What best describes you?</h2>

        {/* Level Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {LEVELS.map(level => {
            const isSelected = selected === level.id;
            return (
              <div key={level.id} onClick={() => setSelected(level.id)}
                style={{
                  border: `2px solid ${isSelected ? level.color : "var(--border)"}`,
                  borderRadius: 16, padding: "28px 20px", cursor: "pointer",
                  background: isSelected ? level.bg : "var(--bg-card)",
                  transition: "all 0.2s", textAlign: "left",
                  transform: isSelected ? "translateY(-4px)" : "none",
                  boxShadow: isSelected ? "var(--shadow-lg)" : "none",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = level.color; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{level.emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{level.title}</div>
                <div style={{ fontSize: 13, color: level.color, fontWeight: 600, marginBottom: 12 }}>{level.subtitle}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>{level.description}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {level.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)" }}>
                      <span style={{ color: level.color, fontSize: 10 }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                {/* Selection indicator */}
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", marginTop: 16,
                  border: `2px solid ${isSelected ? level.color : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}>
                  {isSelected && <div style={{ width: 12, height: 12, borderRadius: "50%", background: level.color }} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <button onClick={handleContinue} disabled={!selected || saving}
          className="btn-primary"
          style={{
            padding: "14px 48px", fontSize: 16, borderRadius: 12,
            opacity: !selected || saving ? 0.4 : 1,
          }}>
          {saving ? "Setting up..." : "Continue →"}
        </button>

        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 16 }}>
          You can always access all features from the sidebar's "Explore More" section
        </p>
      </div>
    </div>
  );
}
