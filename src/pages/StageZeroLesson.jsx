import { useState } from "react";

// Stage 0: Zero Friction Entry — Lesson 1.1 without any auth
// After completing the lesson + mini quiz, prompt to save progress (signup)

const LESSON_CONTENT = [
  { type: "heading", text: "What is a Stock? (And Why Should You Care?)" },
  { type: "video", text: "What is a Stock? — Explained Simply", duration: "4 min" },
  { type: "paragraph", text: "Imagine you and 4 friends pool ₹10,000 each to open a chai stall. Together you invest ₹50,000. Each of you owns 20% — that's your \"share\" of the business." },
  { type: "paragraph", text: "Now imagine that chai stall grows into a chain of 100 stores. Your 20% is now worth crores. But if the business fails, your ₹10,000 is gone." },
  { type: "paragraph", text: "A stock works exactly the same way — but instead of 5 friends, millions of people buy tiny slices of a company." },
  { type: "callout", text: "When you buy 1 share of Reliance Industries, you become a part-owner of the company. You share in its profits and losses." },
  { type: "heading", text: "How Do You Make Money?" },
  { type: "paragraph", text: "There are two ways to earn from stocks:" },
  { type: "list", items: [
    "Price goes up — You buy at ₹100, sell at ₹150. You made ₹50 per share. This is called capital appreciation.",
    "Company shares profits — Some companies pay you a portion of their profits every year. This is called a dividend.",
  ]},
  { type: "heading", text: "The Indian Stock Market" },
  { type: "paragraph", text: "In India, stocks are bought and sold on two exchanges: NSE (National Stock Exchange) and BSE (Bombay Stock Exchange). Think of them as giant marketplaces where millions of buyers and sellers meet electronically." },
  { type: "paragraph", text: "The market is open from 9:15 AM to 3:30 PM, Monday to Friday. All you need to start is a phone and a Demat account — or, for practice, Finscure's mock trading platform." },
  { type: "callout", text: "You don't need lakhs to start investing. Many stocks cost less than ₹100 per share. Learning before investing is the smartest first step." },
];

const QUIZ_QUESTION = {
  q: "When you buy a stock of Reliance, you become:",
  options: ["A lender to Reliance", "A part-owner of Reliance", "An employee of Reliance", "A customer of Reliance"],
  answer: 1,
  explanation: "Buying a stock makes you a shareholder — a part-owner of the company, no matter how small your holding."
};

export default function StageZeroLesson({ onComplete }) {
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);

  const isCorrect = quizAnswer === QUIZ_QUESTION.answer;

  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < 60) setScrolledToEnd(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px" }}>
      {/* Minimal header */}
      <div style={{ width: "100%", maxWidth: 680, display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--gradient-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--btn-text)" }}>F</div>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Lesson 1 of 268</span>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>~4 min read</div>
      </div>

      {/* Lesson Content */}
      <div onScroll={handleScroll} style={{
        width: "100%", maxWidth: 680, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16,
        padding: "32px 28px", maxHeight: lessonDone ? "none" : "calc(100vh - 120px)", overflowY: "auto",
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--green)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Module 1 · Lesson 1</div>

        {/* Render content blocks */}
        <div style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-secondary)" }}>
          {LESSON_CONTENT.map((block, i) => {
            if (block.type === "heading") return <h2 key={i} style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 12px", fontFamily: "'Playfair Display',serif", lineHeight: 1.3 }}>{block.text}</h2>;
            if (block.type === "callout") return <div key={i} style={{ padding: "14px 18px", borderRadius: 10, background: "var(--green-dim)", borderLeft: "4px solid var(--green)", margin: "20px 0", fontSize: 14, color: "var(--green)", lineHeight: 1.6 }}>{block.text}</div>;
            if (block.type === "list") return <ul key={i} style={{ margin: "12px 0 16px", paddingLeft: 20 }}>{block.items.map((item, j) => <li key={j} style={{ marginBottom: 10, lineHeight: 1.7 }}>{item}</li>)}</ul>;
            if (block.type === "video") return (
              <div key={i} style={{ margin: "24px 0", borderRadius: 12, overflow: "hidden", background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                <div style={{ height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--surface) 100%)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green-dim)", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 12 }}>▶</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{block.text}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Video coming soon</div>
                </div>
                {block.duration && <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)" }}>🎬 {block.duration}</div>}
              </div>
            );
            return <p key={i} style={{ marginBottom: 16 }}>{block.text}</p>;
          })}
        </div>

        {/* Mini Quiz */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "2px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>
            📝 Quick Check — Did you get it?
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, color: "var(--text-primary)" }}>{QUIZ_QUESTION.q}</div>
          {QUIZ_QUESTION.options.map((opt, i) => {
            const sel = quizAnswer === i;
            const correct = quizSubmitted && i === QUIZ_QUESTION.answer;
            const wrong = quizSubmitted && sel && i !== QUIZ_QUESTION.answer;
            return (
              <div key={i} onClick={() => { if (!quizSubmitted) setQuizAnswer(i); }}
                style={{
                  padding: "12px 16px", borderRadius: 10, fontSize: 14, marginBottom: 8,
                  cursor: quizSubmitted ? "default" : "pointer", transition: "all 0.15s",
                  border: `2px solid ${correct ? "var(--green)" : wrong ? "var(--red)" : sel ? "var(--blue)" : "var(--border)"}`,
                  background: correct ? "var(--green-dim)" : wrong ? "var(--red-dim)" : sel ? "var(--blue-dim)" : "transparent",
                  color: correct ? "var(--green)" : wrong ? "var(--red)" : "var(--text-primary)",
                }}>
                {opt}{correct && " ✓"}{wrong && " ✗"}
              </div>
            );
          })}

          {!quizSubmitted && (
            <button onClick={() => { if (quizAnswer !== null) { setQuizSubmitted(true); if (quizAnswer === QUIZ_QUESTION.answer) setLessonDone(true); }}}
              disabled={quizAnswer === null} className="btn-primary"
              style={{ marginTop: 12, padding: "12px 28px", opacity: quizAnswer === null ? 0.4 : 1 }}>
              Check Answer
            </button>
          )}

          {quizSubmitted && isCorrect && (
            <div style={{ marginTop: 16, padding: "20px", borderRadius: 12, background: "var(--green-dim)", border: "1px solid var(--green)", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--green)", marginBottom: 4 }}>Correct! You just learned your first stock market concept.</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>{QUIZ_QUESTION.explanation}</div>
            </div>
          )}

          {quizSubmitted && !isCorrect && (
            <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 8, background: "var(--amber-dim)", fontSize: 13, color: "var(--amber)" }}>
              Not quite — {QUIZ_QUESTION.explanation}
              <button onClick={() => { setQuizAnswer(null); setQuizSubmitted(false); }} style={{ display: "block", marginTop: 8, background: "none", border: "none", color: "var(--blue)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Try again →</button>
            </div>
          )}
        </div>

        {/* Save Progress CTA — only after correct answer */}
        {lessonDone && (
          <div style={{ marginTop: 32, padding: "24px", borderRadius: 14, background: "var(--bg-secondary)", border: "1px solid var(--border)", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
              Want to save your progress?
            </div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.5 }}>
              Create a free account to continue learning. You have 267 more lessons waiting.
            </div>
            <button onClick={() => onComplete("signup")} className="btn-primary" style={{ padding: "14px 36px", fontSize: 15, marginBottom: 10 }}>
              Create Free Account →
            </button>
            <div>
              <button onClick={() => onComplete("login")} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: "6px 0" }}>
                Already have an account? Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
