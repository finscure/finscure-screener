import { useState } from "react";

const QUESTIONS = [
  {
    competency: "Basic Numeracy",
    q: "A stock goes from ₹100 to ₹110. What is the percentage return?",
    options: ["₹10", "10%", "11%", "110%"],
    answer: 1,
  },
  {
    competency: "Fundamentals",
    q: "A stock has a P/E ratio of 40. What does this mean?",
    options: [
      "The stock price is ₹40",
      "Investors pay ₹40 for every ₹1 of the company's earnings",
      "The company has 40 employees",
      "The stock will grow by 40%",
    ],
    answer: 1,
  },
  {
    competency: "Chart Literacy",
    q: "A candlestick with a green body means:",
    options: [
      "The stock hit its 52-week low",
      "Trading volume was high",
      "The closing price was higher than the opening price",
      "The stock paid a dividend",
    ],
    answer: 2,
  },
  {
    competency: "Trading Mechanics",
    q: "You buy a stock at ₹100 and place a stop-loss at ₹95. What happens when the price hits ₹95?",
    options: [
      "Nothing — stop-loss is just a reminder",
      "Your stock is automatically sold to limit your loss",
      "You receive a ₹5 refund",
      "The stock is frozen and cannot be traded",
    ],
    answer: 1,
  },
  {
    competency: "Risk Understanding",
    q: "A stock drops 50% from ₹200 to ₹100. How much must it rise from ₹100 to get back to ₹200?",
    options: ["50%", "75%", "100%", "200%"],
    answer: 2,
  },
];

// Score → placement
function getPlacement(score) {
  if (score <= 1) return {
    placement_level: "aware_beginner",
    interface_stage: 1,
    starting_module: 2,
    mock_portfolio_value: 100000,
    label: "Aware Beginner",
    message: "Looks like you already know some basics — we've skipped ahead to where things get interesting. You can always go back to the fundamentals if you want a refresher.",
    emoji: "🌱",
  };
  if (score <= 3) return {
    placement_level: "intermediate",
    interface_stage: 2,
    starting_module: 5,
    mock_portfolio_value: 500000,
    label: "Intermediate",
    message: "You've got a solid foundation. We're starting you at Module 5 with access to the Screener and Watchlist. Modules 1-4 are marked as reviewed — revisit them anytime.",
    emoji: "📊",
  };
  return {
    placement_level: "experienced",
    interface_stage: 3,
    starting_module: 8,
    mock_portfolio_value: 1000000,
    label: "Experienced Trader",
    message: "You know your way around the markets. Full tools are unlocked — Screener, Charts, Sector Analytics, and more. Courses are available as reference material whenever you need them.",
    emoji: "⚡",
  };
}

export default function PlacementQuiz({ onComplete, onBack }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function handleNext() {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  }

  if (showResult) {
    const score = answers.filter((a, i) => a === QUESTIONS[i].answer).length;
    const placement = getPlacement(score);

    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{placement.emoji}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Your Level</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>{placement.label}</h1>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--green)", marginBottom: 20, fontFamily: "'JetBrains Mono',monospace" }}>{score} / {QUESTIONS.length} correct</div>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>{placement.message}</p>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 24px", marginBottom: 24, textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 12 }}>Your personalized setup:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Starting from</span>
                <span style={{ fontWeight: 600 }}>Module {placement.starting_module}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Virtual portfolio</span>
                <span style={{ fontWeight: 600 }}>₹{(placement.mock_portfolio_value / 100000).toFixed(0)}L</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Interface</span>
                <span style={{ fontWeight: 600 }}>Stage {placement.interface_stage} ({placement.interface_stage === 1 ? "3 tabs" : placement.interface_stage === 2 ? "5 tabs" : "Full access"})</span>
              </div>
            </div>
          </div>

          <button onClick={() => onComplete(placement)} className="btn-primary" style={{ padding: "14px 40px", fontSize: 16 }}>
            Start Learning →
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 560, display: "flex", alignItems: "center", gap: 12, marginBottom: 32, marginTop: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 20, cursor: "pointer", padding: "4px 8px" }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ width: "100%", height: 4, background: "var(--surface)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "var(--gradient-green)", borderRadius: 2, transition: "width 0.3s" }} />
          </div>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace" }}>{current + 1}/{QUESTIONS.length}</span>
      </div>

      {/* Question Card */}
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{q.competency}</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, lineHeight: 1.4 }}>{q.q}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{
                width: "100%", padding: "16px 20px", borderRadius: 12, fontSize: 15, textAlign: "left",
                border: `2px solid ${selected === i ? "var(--green)" : "var(--border)"}`,
                background: selected === i ? "var(--green-dim)" : "var(--bg-card)",
                color: selected === i ? "var(--green)" : "var(--text-primary)",
                cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans',sans-serif",
              }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", border: `2px solid ${selected === i ? "var(--green)" : "var(--border)"}`, marginRight: 12, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                {selected === i ? "✓" : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        <button onClick={handleNext} disabled={selected === null}
          className="btn-primary"
          style={{ width: "100%", marginTop: 24, padding: "14px", fontSize: 15, opacity: selected === null ? 0.4 : 1 }}>
          {current === QUESTIONS.length - 1 ? "See My Results" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
