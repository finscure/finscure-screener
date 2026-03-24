import { useState } from "react";

export default function QuizViewer({ quiz, previousScore, onComplete, onNext }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(!!previousScore);
  const [score, setScore] = useState(previousScore?.score || 0);
  const total = quiz.questions.length;
  const [showRetake, setShowRetake] = useState(false);

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIdx]: optIdx });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    onComplete(correct, total);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowRetake(false);
  };

  const allAnswered = Object.keys(answers).length === total;
  const passed = score >= Math.ceil(total * 0.6); // 60% pass

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 28px 48px" }}>
      {/* Quiz Header */}
      <div style={{ marginBottom: 28 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
          background: "#fef3c7", color: "#d97706",
          letterSpacing: ".04em", textTransform: "uppercase",
        }}>
          📝 Module Quiz · {total} Questions
        </span>
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 24, fontWeight: 700, color: "#1e1b3a",
          margin: "12px 0 6px", lineHeight: 1.3,
        }}>
          Test Your Knowledge
        </h1>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
          Score at least 60% to pass this module quiz.
        </p>
      </div>

      {/* Score Banner (if submitted) */}
      {submitted && (
        <div style={{
          padding: "18px 22px",
          background: passed ? "linear-gradient(135deg, #f0fdf4, #dcfce7)" : "linear-gradient(135deg, #fef2f2, #fecaca)",
          borderRadius: 14,
          border: `1.5px solid ${passed ? "#bbf7d0" : "#fecaca"}`,
          marginBottom: 28,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontSize: 22, fontWeight: 700,
              color: passed ? "#16a34a" : "#dc2626",
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              {score}/{total} correct
            </div>
            <div style={{ fontSize: 13, color: passed ? "#16a34a" : "#dc2626", fontWeight: 500, marginTop: 2 }}>
              {passed ? "🎉 Great job! You passed this quiz." : "Keep learning and try again!"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!passed && (
              <button onClick={handleRetake} style={{
                padding: "9px 18px", background: "#fff",
                border: "1.5px solid #e9e5f5", borderRadius: 8,
                fontSize: 12, fontWeight: 600, color: "#dc2626",
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Retake Quiz
              </button>
            )}
            <button onClick={onNext} style={{
              padding: "9px 18px",
              background: passed ? "#16a34a" : "#7c3aed",
              color: "#fff", border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>
              {passed ? "Next Module →" : "Continue Anyway →"}
            </button>
          </div>
        </div>
      )}

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {quiz.questions.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          const isCorrect = submitted && userAnswer === q.answer;
          const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.answer;

          return (
            <div key={qIdx} style={{
              background: "#fff",
              borderRadius: 12,
              border: `1.5px solid ${isCorrect ? "#bbf7d0" : isWrong ? "#fecaca" : "#ede9fe"}`,
              padding: 22,
              transition: "border-color .3s",
            }}>
              <div style={{
                display: "flex", gap: 10, marginBottom: 14,
                fontSize: 14.5, fontWeight: 600, color: "#1e1b3a", lineHeight: 1.5,
              }}>
                <span style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: 7,
                  background: "#f5f3ff", color: "#7c3aed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                }}>
                  {qIdx + 1}
                </span>
                {q.q}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 36 }}>
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isCorrectAnswer = submitted && optIdx === q.answer;
                  const isWrongSelection = submitted && isSelected && optIdx !== q.answer;

                  let bg = "#faf9fe";
                  let border = "1.5px solid #e9e5f5";
                  let color = "#374151";

                  if (isSelected && !submitted) {
                    bg = "#f5f3ff"; border = "1.5px solid #7c3aed"; color = "#2D1B69";
                  }
                  if (isCorrectAnswer) {
                    bg = "#f0fdf4"; border = "1.5px solid #86efac"; color = "#16a34a";
                  }
                  if (isWrongSelection) {
                    bg = "#fef2f2"; border = "1.5px solid #fca5a5"; color = "#dc2626";
                  }

                  return (
                    <div key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      style={{
                        padding: "10px 14px",
                        background: bg, border, borderRadius: 8,
                        cursor: submitted ? "default" : "pointer",
                        display: "flex", alignItems: "center", gap: 10,
                        fontSize: 13, color, fontWeight: isSelected || isCorrectAnswer ? 600 : 400,
                        transition: "all .2s",
                      }}
                    >
                      <span style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: isSelected ? `2px solid ${isWrongSelection ? "#dc2626" : isCorrectAnswer ? "#16a34a" : "#7c3aed"}` : "2px solid #d4d4d8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, flexShrink: 0,
                        background: isSelected ? (isWrongSelection ? "#dc2626" : isCorrectAnswer ? "#16a34a" : "#7c3aed") : "transparent",
                        color: isSelected ? "#fff" : "transparent",
                      }}>
                        {isCorrectAnswer && submitted ? "✓" : isWrongSelection ? "✗" : isSelected ? "●" : ""}
                      </span>
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* Correct answer hint after submission */}
              {isWrong && (
                <div style={{
                  marginTop: 10, paddingLeft: 36,
                  fontSize: 12, color: "#16a34a", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  ✓ Correct answer: {q.options[q.answer]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={handleSubmit} disabled={!allAnswered} style={{
            padding: "12px 28px",
            background: allAnswered ? "#2D1B69" : "#d4d4d8",
            color: "#fff", border: "none", borderRadius: 10,
            fontSize: 14, fontWeight: 600, cursor: allAnswered ? "pointer" : "default",
            fontFamily: "inherit", transition: "all .2s",
          }}>
            Submit Quiz
          </button>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>
            {Object.keys(answers).length}/{total} answered
          </span>
        </div>
      )}
    </div>
  );
}
