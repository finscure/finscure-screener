import { useState, useEffect } from "react";
import { COURSES } from "../data/courses";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LEVEL_STYLES = {
  "Beginner": { bg: "var(--green-dim)", color: "var(--green)" },
  "Intermediate": { bg: "var(--amber-dim)", color: "var(--amber)" },
  "Advanced": { bg: "var(--red-dim)", color: "var(--red)" },
  "All Levels": { bg: "var(--blue-dim)", color: "var(--blue)" },
};

// ═══ CONTENT BLOCK RENDERER ═══
function ContentBlock({ block, index }) {
  const { type, text, items, code, label } = block;

  switch (type) {
    case "heading":
      return <h3 key={index} style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 12px", lineHeight: 1.3 }}>{text}</h3>;

    case "paragraph":
      return <p key={index} style={{ marginBottom: 16, lineHeight: 1.8 }}>{text}</p>;

    case "callout":
      return (
        <div key={index} style={{ padding: "14px 18px", borderRadius: 10, background: "var(--green-dim)", borderLeft: "4px solid var(--green)", margin: "20px 0", fontSize: 14, color: "var(--green)", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>💡 {label || "Key Takeaway"}: </span>{text}
        </div>
      );

    case "warning":
      return (
        <div key={index} style={{ padding: "14px 18px", borderRadius: 10, background: "var(--red-dim)", borderLeft: "4px solid var(--red)", margin: "20px 0", fontSize: 14, color: "var(--red)", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>⚠️ {label || "Important"}: </span>{text}
        </div>
      );

    case "info":
      return (
        <div key={index} style={{ padding: "14px 18px", borderRadius: 10, background: "var(--blue-dim)", borderLeft: "4px solid var(--blue)", margin: "20px 0", fontSize: 14, color: "var(--blue)", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>ℹ️ </span>{text}
        </div>
      );

    case "list":
      return (
        <ul key={index} style={{ margin: "12px 0 16px", paddingLeft: 20 }}>
          {(items || []).map((item, i) => (
            <li key={i} style={{ marginBottom: 8, lineHeight: 1.6 }}>{item}</li>
          ))}
        </ul>
      );

    case "example":
      return (
        <div key={index} style={{ padding: "16px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border)", margin: "16px 0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--amber)", marginBottom: 8 }}>📋 {label || "Example"}</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" }}>{text}</div>
        </div>
      );

    case "table":
      return (
        <div key={index} style={{ overflowX: "auto", margin: "16px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            {block.headers && (
              <thead>
                <tr>{block.headers.map((h, i) => <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>{h}</th>)}</tr>
              </thead>
            )}
            <tbody>
              {(block.rows || []).map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci} style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "video":
      return (
        <div key={index} style={{
          margin: "24px 0", borderRadius: 12, overflow: "hidden",
          background: "var(--bg-secondary)", border: "1px solid var(--border)",
        }}>
          <div style={{
            height: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--surface) 100%)",
          }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green-dim)", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 12 }}>▶</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{text || "Video Lesson"}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Video content coming soon</div>
          </div>
          {block.duration && (
            <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
              🎬 {block.duration}
            </div>
          )}
        </div>
      );

    default:
      return <p key={index} style={{ marginBottom: 14 }}>{text}</p>;
  }
}

// ═══ PER-LESSON ASSESSMENT COMPONENT ═══
function LessonAssessment({ assessment, onPass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = assessment || [];
  if (questions.length === 0) return null;

  const score = submitted ? questions.filter((q, i) => answers[i] === q.answer).length : 0;
  const passed = score === questions.length;

  function handleSubmit() {
    setSubmitted(true);
    if (score === questions.length && onPass) onPass();
  }

  return (
    <div style={{ marginTop: 32, paddingTop: 24, borderTop: "2px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--blue-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📝</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Lesson Assessment</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Answer all questions to complete this lesson</div>
        </div>
      </div>

      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 20, padding: "16px 18px", background: "var(--bg-secondary)", borderRadius: 10, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
            {qi + 1}. {q.q}
          </div>
          {q.options.map((opt, oi) => {
            const sel = answers[qi] === oi;
            const correct = submitted && oi === q.answer;
            const wrong = submitted && sel && oi !== q.answer;
            return (
              <div key={oi} onClick={() => { if (!submitted) setAnswers(p => ({ ...p, [qi]: oi })); }}
                style={{
                  padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 6,
                  cursor: submitted ? "default" : "pointer", transition: "all 0.15s",
                  border: `2px solid ${correct ? "var(--green)" : wrong ? "var(--red)" : sel ? "var(--blue)" : "var(--border)"}`,
                  background: correct ? "var(--green-dim)" : wrong ? "var(--red-dim)" : sel ? "var(--blue-dim)" : "transparent",
                  color: correct ? "var(--green)" : wrong ? "var(--red)" : "var(--text-primary)",
                }}>
                {opt}{correct && " ✓"}{wrong && " ✗"}
              </div>
            );
          })}
          {submitted && answers[qi] !== q.answer && q.explanation && (
            <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: "var(--green-dim)", fontSize: 12, color: "var(--green)", lineHeight: 1.5 }}>
              💡 {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} className="btn-primary"
          disabled={Object.keys(answers).length < questions.length}
          style={{ padding: "12px 28px", opacity: Object.keys(answers).length < questions.length ? 0.4 : 1 }}>
          Check Answers
        </button>
      ) : (
        <div style={{
          padding: 16, borderRadius: 10, textAlign: "center",
          background: passed ? "var(--green-dim)" : "var(--amber-dim)",
          border: `1px solid ${passed ? "var(--green)" : "var(--amber)"}`,
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: passed ? "var(--green)" : "var(--amber)" }}>
            {score} / {questions.length}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
            {passed ? "All correct! Lesson complete 🎉" : "Review the answers above and try again."}
          </div>
          {!passed && (
            <button onClick={() => { setAnswers({}); setSubmitted(false); }}
              style={{ marginTop: 10, padding: "8px 20px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══ MAIN COURSE DETAIL PAGE ═══
export default function CourseDetailPage({ courseId, onBack }) {
  const { user } = useAuth();
  const course = COURSES.find(c => c.id === courseId);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (!user || !courseId) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "progress", `${user.uid}_${courseId}`));
        if (snap.exists()) setCompletedLessons(snap.data().completedLessons || []);
      } catch (e) { console.error(e); }
    })();
  }, [user, courseId]);

  async function markComplete(lessonId) {
    if (!user || completedLessons.includes(lessonId)) return;
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    try {
      await setDoc(doc(db, "progress", `${user.uid}_${courseId}`), {
        userId: user.uid, courseId, completedLessons: updated, updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (e) { console.error(e); }
  }

  if (!course) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>Course not found</div>
      <button onClick={onBack} className="btn-primary" style={{ marginTop: 16, padding: "10px 24px" }}>← Back to Courses</button>
    </div>
  );

  const lc = LEVEL_STYLES[course.level] || LEVEL_STYLES.Beginner;
  const allLessons = course.modules?.flatMap(m => m.lessons || []) || [];
  const totalItems = allLessons.length;
  const progressPct = totalItems > 0 ? Math.round((completedLessons.length / totalItems) * 100) : 0;

  // ═══ LESSON VIEW ═══
  if (activeLesson) {
    const idx = allLessons.findIndex(l => l.id === activeLesson.id);
    const next = allLessons[idx + 1];
    const prev = allLessons[idx - 1];
    const isDone = completedLessons.includes(activeLesson.id);

    return (
      <div>
        <button onClick={() => setActiveLesson(null)}
          style={{ background: "none", border: "none", color: "var(--green)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "inherit" }}>
          ← Back to {course.title}
        </button>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 32px", maxWidth: 800 }}>
          {/* Lesson Header */}
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Module {course.num} · Lesson {idx + 1} of {allLessons.length}</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6, fontFamily: "'Playfair Display',serif", lineHeight: 1.3 }}>{activeLesson.title}</h2>
          <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-muted)", marginBottom: 28 }}>
            <span>🕐 {activeLesson.duration}</span>
            <span style={{ ...lc, fontSize: 11, fontWeight: 600, padding: "1px 8px", borderRadius: 4, background: lc.bg, color: lc.color }}>{course.level}</span>
            {isDone && <span style={{ color: "var(--green)", fontWeight: 600 }}>✓ Completed</span>}
          </div>

          {/* Lesson Content */}
          <div style={{ lineHeight: 1.8, fontSize: 15, color: "var(--text-secondary)" }}>
            {(activeLesson.content || []).map((block, i) => (
              <ContentBlock key={i} block={block} index={i} />
            ))}
            {(!activeLesson.content || activeLesson.content.length === 0) && (
              <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                Detailed content for this lesson is coming soon.
              </div>
            )}
          </div>

          {/* Per-Lesson Assessment */}
          {activeLesson.assessment && activeLesson.assessment.length > 0 && (
            <LessonAssessment
              assessment={activeLesson.assessment}
              onPass={() => { if (!isDone) markComplete(activeLesson.id); }}
            />
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            {prev ? (
              <button onClick={() => setActiveLesson(prev)} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>← Previous</button>
            ) : <div />}
            <div style={{ display: "flex", gap: 8 }}>
              {!isDone && !activeLesson.assessment && (
                <button onClick={() => { markComplete(activeLesson.id); if (next) setActiveLesson(next); }} className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
                  {next ? "Complete & Next →" : "Complete ✓"}
                </button>
              )}
              {isDone && next && (
                <button onClick={() => setActiveLesson(next)} className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>Next Lesson →</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══ MODULE OVERVIEW ═══
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--green)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "inherit" }}>← Back to Courses</button>

      {/* Course Header */}
      <div style={{ background: course.thumb || "var(--surface)", borderRadius: 14, padding: "32px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: lc.bg, color: lc.color }}>{course.level}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: "rgba(0,0,0,0.4)", color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>Module {course.num}</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 8, fontFamily: "'Playfair Display',serif", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>{course.title}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", maxWidth: 600, lineHeight: 1.6 }}>{course.description}</p>
          <div style={{ display: "flex", gap: 20, marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            <span>📖 {course.lessons} lessons</span>
            <span>🕐 {course.duration}</span>
            <span>✓ {completedLessons.length}/{totalItems} ({progressPct}%)</span>
          </div>
          <div style={{ width: "100%", maxWidth: 400, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginTop: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 2, width: `${progressPct}%`, background: "#63dca0", transition: "width 0.3s" }} />
          </div>
        </div>
      </div>

      {/* Lessons List */}
      {(course.modules || []).map((mod, mi) => (
        <div key={mod.id} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{mod.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(mod.lessons || []).map((lesson, li) => {
              const isDone = completedLessons.includes(lesson.id);
              const hasContent = lesson.content && lesson.content.length > 0;
              return (
                <div key={lesson.id} onClick={() => setActiveLesson(lesson)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                    background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10,
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-active)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                    background: isDone ? "var(--green-dim)" : "var(--surface)",
                    color: isDone ? "var(--green)" : "var(--text-muted)",
                    border: isDone ? "2px solid var(--green)" : "2px solid var(--border)",
                  }}>{isDone ? "✓" : li + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: isDone ? 500 : 600, color: isDone ? "var(--text-secondary)" : "var(--text-primary)" }}>{lesson.title}</div>
                    <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                      <span>🕐 {lesson.duration}</span>
                      {lesson.assessment && <span style={{ color: "var(--blue)" }}>📝 Assessment</span>}
                      {lesson.content?.some(b => b.type === "video") && <span style={{ color: "var(--amber)" }}>🎬 Video</span>}
                    </div>
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>→</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
