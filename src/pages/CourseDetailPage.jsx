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

export default function CourseDetailPage({ courseId, onBack }) {
  const { user } = useAuth();
  const course = COURSES.find(c => c.id === courseId);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
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

  // ═══ QUIZ VIEW ═══
  if (activeQuiz) {
    const questions = activeQuiz.questions || [];
    const score = quizSubmitted ? questions.filter((q, i) => quizAnswers[i] === q.answer).length : 0;
    return (
      <div>
        <button onClick={() => { setActiveQuiz(null); setQuizAnswers({}); setQuizSubmitted(false); }}
          style={{ background: "none", border: "none", color: "var(--green)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "inherit" }}>
          ← Back to {course.title}
        </button>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 28, maxWidth: 700 }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Quiz · {questions.length} questions</div>
          {questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{qi + 1}. {q.q}</div>
              {q.options.map((opt, oi) => {
                const sel = quizAnswers[qi] === oi;
                const correct = quizSubmitted && oi === q.answer;
                const wrong = quizSubmitted && sel && oi !== q.answer;
                return (
                  <div key={oi} onClick={() => { if (!quizSubmitted) setQuizAnswers(p => ({ ...p, [qi]: oi })); }}
                    style={{
                      padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 6,
                      cursor: quizSubmitted ? "default" : "pointer", transition: "all 0.15s",
                      border: `2px solid ${correct ? "var(--green)" : wrong ? "var(--red)" : sel ? "var(--blue)" : "var(--border)"}`,
                      background: correct ? "var(--green-dim)" : wrong ? "var(--red-dim)" : sel ? "var(--blue-dim)" : "transparent",
                    }}>{opt}{correct && " ✓"}{wrong && " ✗"}</div>
                );
              })}
            </div>
          ))}
          {!quizSubmitted ? (
            <button onClick={() => setQuizSubmitted(true)} className="btn-primary"
              style={{ padding: "12px 32px", opacity: Object.keys(quizAnswers).length < questions.length ? 0.4 : 1 }}
              disabled={Object.keys(quizAnswers).length < questions.length}>Submit Quiz</button>
          ) : (
            <div style={{ padding: 16, borderRadius: 10, textAlign: "center", background: score === questions.length ? "var(--green-dim)" : "var(--amber-dim)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: score === questions.length ? "var(--green)" : "var(--amber)" }}>{score} / {questions.length}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>{score === questions.length ? "Perfect! 🎉" : "Review answers above"}</div>
              <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }} style={{ marginTop: 12, padding: "8px 20px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Retry</button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 28, maxWidth: 760 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Lesson {idx + 1} of {allLessons.length}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, fontFamily: "'Playfair Display',serif" }}>{activeLesson.title}</h2>
          <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-muted)", marginBottom: 24 }}>
            <span>🕐 {activeLesson.duration}</span>
            {isDone && <span style={{ color: "var(--green)", fontWeight: 600 }}>✓ Completed</span>}
          </div>
          <div style={{ lineHeight: 1.8, fontSize: 15, color: "var(--text-secondary)" }}>
            {(activeLesson.content || []).map((b, i) => {
              if (b.type === "heading") return <h3 key={i} style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "24px 0 12px" }}>{b.text}</h3>;
              if (b.type === "callout") return <div key={i} style={{ padding: "14px 18px", borderRadius: 10, background: "var(--green-dim)", borderLeft: "3px solid var(--green)", margin: "16px 0", fontSize: 14, color: "var(--green)" }}>{b.text}</div>;
              return <p key={i} style={{ marginBottom: 14 }}>{b.text}</p>;
            })}
            {(!activeLesson.content || activeLesson.content.length === 0) && (
              <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                Detailed content for this lesson is coming soon.
              </div>
            )}
          </div>
          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            {prev ? (
              <button onClick={() => setActiveLesson(prev)} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>← {prev.title.slice(0, 25)}</button>
            ) : <div />}
            {!isDone && (
              <button onClick={() => { markComplete(activeLesson.id); if (next) setActiveLesson(next); }} className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
                {next ? "Complete & Next →" : "Complete ✓"}
              </button>
            )}
            {isDone && next && (
              <button onClick={() => setActiveLesson(next)} className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>Next →</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ═══ MODULE OVERVIEW ═══
  return (
    <div>
      <button onClick={onBack}
        style={{ background: "none", border: "none", color: "var(--green)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "inherit" }}>
        ← Back to Courses
      </button>

      {/* Course Header */}
      <div style={{
        background: course.thumb || "var(--surface)", borderRadius: 14, padding: "32px 28px",
        marginBottom: 24, position: "relative", overflow: "hidden",
      }}>
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
            <span>✓ {completedLessons.length} / {totalItems} done ({progressPct}%)</span>
          </div>
          {/* Progress bar */}
          <div style={{ width: "100%", maxWidth: 400, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginTop: 12, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 2, width: `${progressPct}%`, background: "#63dca0", transition: "width 0.3s" }} />
          </div>
        </div>
      </div>

      {/* Lessons List */}
      {(course.modules || []).map((mod, mi) => (
        <div key={mod.id} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "var(--text-primary)" }}>
            {mod.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(mod.lessons || []).map((lesson, li) => {
              const isDone = completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} onClick={() => setActiveLesson(lesson)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                    background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10,
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-active)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  {/* Status icon */}
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                    background: isDone ? "var(--green-dim)" : "var(--surface)",
                    color: isDone ? "var(--green)" : "var(--text-muted)",
                    border: isDone ? "2px solid var(--green)" : "2px solid var(--border)",
                  }}>{isDone ? "✓" : li + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: isDone ? 500 : 600, color: isDone ? "var(--text-secondary)" : "var(--text-primary)" }}>{lesson.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>🕐 {lesson.duration}</div>
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>→</span>
                </div>
              );
            })}

            {/* Quiz button */}
            {mod.quiz && (
              <div onClick={() => setActiveQuiz(mod.quiz)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  background: "var(--blue-dim)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 10,
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--blue-dim)", border: "2px solid var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>📝</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)" }}>Quiz — {mod.quiz.questions?.length || 0} questions</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Test your knowledge</div>
                </div>
                <span style={{ fontSize: 14, color: "var(--blue)" }}>→</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
