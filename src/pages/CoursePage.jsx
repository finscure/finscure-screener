import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { COURSES } from "../data/courses";
import LessonViewer from "../components/LessonViewer";
import QuizViewer from "../components/QuizViewer";

export default function CoursePage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);

  const [progress, setProgress] = useState({ completedLessons: [], quizScores: {}, enrolled: false });
  const [activeItem, setActiveItem] = useState(null); // { type: "lesson"|"quiz", moduleId, lessonId|quizId }
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch or create progress
  useEffect(() => {
    if (!user || !course) return;
    async function loadProgress() {
      try {
        const ref = doc(db, "progress", `${user.uid}_${courseId}`);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProgress(snap.data());
        } else {
          const initial = { completedLessons: [], quizScores: {}, enrolled: true, startedAt: new Date().toISOString(), userId: user.uid, courseId };
          await setDoc(ref, initial);
          setProgress(initial);
        }
      } catch (e) {
        console.error("Progress load error:", e);
      }
      setLoading(false);
    }
    loadProgress();
  }, [user, courseId]);

  if (!course) return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", textAlign: "center", padding: 80, color: "#64748b" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
      <p style={{ fontSize: 16, fontWeight: 500 }}>Course not found</p>
      <Link to="/learn" style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14 }}>← Back to courses</Link>
    </div>
  );

  if (!user) {
    navigate("/learn");
    return null;
  }

  // Calculate progress
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalQuizzes = course.modules.filter(m => m.quiz).length;
  const completedCount = progress.completedLessons?.length || 0;
  const quizzesPassed = Object.keys(progress.quizScores || {}).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCompleted = completedCount >= totalLessons && quizzesPassed >= totalQuizzes;

  // Mark lesson complete
  async function markComplete(lessonId) {
    if (progress.completedLessons?.includes(lessonId)) return;
    const updated = [...(progress.completedLessons || []), lessonId];
    const newProgress = { ...progress, completedLessons: updated };
    setProgress(newProgress);
    try {
      const ref = doc(db, "progress", `${user.uid}_${courseId}`);
      await updateDoc(ref, { completedLessons: updated });
    } catch (e) { console.error(e); }
  }

  // Save quiz score
  async function saveQuizScore(quizId, score, total) {
    const scores = { ...(progress.quizScores || {}), [quizId]: { score, total, passedAt: new Date().toISOString() } };
    const newProgress = { ...progress, quizScores: scores };
    setProgress(newProgress);
    try {
      const ref = doc(db, "progress", `${user.uid}_${courseId}`);
      await updateDoc(ref, { quizScores: scores });
    } catch (e) { console.error(e); }
  }

  // Find current lesson/quiz data
  let activeContent = null;
  if (activeItem) {
    const mod = course.modules.find(m => m.id === activeItem.moduleId);
    if (mod) {
      if (activeItem.type === "lesson") {
        activeContent = mod.lessons.find(l => l.id === activeItem.lessonId);
      } else if (activeItem.type === "quiz") {
        activeContent = mod.quiz;
      }
    }
  }

  // Auto-select first incomplete lesson
  useEffect(() => {
    if (!activeItem && !loading && course) {
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          if (!progress.completedLessons?.includes(lesson.id)) {
            setActiveItem({ type: "lesson", moduleId: mod.id, lessonId: lesson.id });
            return;
          }
        }
      }
      // All done — select first lesson
      if (course.modules[0]?.lessons[0]) {
        setActiveItem({ type: "lesson", moduleId: course.modules[0].id, lessonId: course.modules[0].lessons[0].id });
      }
    }
  }, [loading, course]);

  const levelColors = { Beginner: { bg: "#dcfce7", text: "#16a34a" }, Intermediate: { bg: "#fef3c7", text: "#d97706" }, Advanced: { bg: "#fef2f2", text: "#dc2626" } };
  const lc = levelColors[course.level] || levelColors.Beginner;

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", display: "flex", minHeight: "calc(100vh - 56px)", background: "#f8f7fc" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <div style={{
        width: sidebarOpen ? 320 : 0,
        minWidth: sidebarOpen ? 320 : 0,
        background: "#fff",
        borderRight: "1px solid #ede9fe",
        overflowY: "auto",
        overflowX: "hidden",
        transition: "all .3s",
        flexShrink: 0,
      }}>
        {/* Course Header */}
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid #ede9fe" }}>
          <Link to="/learn" style={{ fontSize: 12, color: "#7c3aed", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
            ← All Courses
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{course.icon}</span>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e1b3a", margin: 0, lineHeight: 1.2 }}>{course.title}</h2>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: lc.bg, color: lc.text }}>{course.level}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, marginBottom: 5 }}>
              <span style={{ color: "#64748b" }}>{completedCount}/{totalLessons} lessons</span>
              <span style={{ color: "#7c3aed" }}>{overallProgress}%</span>
            </div>
            <div style={{ height: 6, background: "#ede9fe", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3, transition: "width .5s",
                width: `${overallProgress}%`,
                background: isCompleted ? "linear-gradient(90deg, #16a34a, #22c55e)" : "linear-gradient(90deg, #7c3aed, #a78bfa)",
              }} />
            </div>
            {isCompleted && (
              <div style={{ marginTop: 8, fontSize: 11, color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                🎓 Course Completed!
              </div>
            )}
          </div>
        </div>

        {/* Module List */}
        <div style={{ padding: "8px 0" }}>
          {course.modules.map((mod, modIdx) => {
            const modLessonsComplete = mod.lessons.filter(l => progress.completedLessons?.includes(l.id)).length;
            const modComplete = modLessonsComplete === mod.lessons.length;
            const quizPassed = mod.quiz && progress.quizScores?.[mod.quiz.id];

            return (
              <div key={mod.id} style={{ marginBottom: 4 }}>
                {/* Module Header */}
                <div style={{
                  padding: "10px 18px",
                  fontSize: 12, fontWeight: 700, color: "#1e1b3a",
                  display: "flex", alignItems: "center", gap: 8,
                  letterSpacing: ".02em",
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6, fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: modComplete ? "#dcfce7" : "#f5f3ff",
                    color: modComplete ? "#16a34a" : "#7c3aed",
                  }}>
                    {modComplete ? "✓" : modIdx + 1}
                  </span>
                  {mod.title}
                </div>

                {/* Lessons */}
                {mod.lessons.map(lesson => {
                  const isActive = activeItem?.type === "lesson" && activeItem?.lessonId === lesson.id;
                  const isDone = progress.completedLessons?.includes(lesson.id);

                  return (
                    <div key={lesson.id}
                      onClick={() => setActiveItem({ type: "lesson", moduleId: mod.id, lessonId: lesson.id })}
                      style={{
                        padding: "9px 18px 9px 48px",
                        cursor: "pointer",
                        background: isActive ? "#f5f3ff" : "transparent",
                        borderLeft: isActive ? "3px solid #7c3aed" : "3px solid transparent",
                        display: "flex", alignItems: "center", gap: 8,
                        transition: "all .15s",
                        fontSize: 12.5,
                        color: isActive ? "#2D1B69" : isDone ? "#94a3b8" : "#374151",
                        fontWeight: isActive ? 600 : 400,
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#faf9fe"; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      {isDone ? (
                        <span style={{ color: "#16a34a", fontSize: 13, flexShrink: 0 }}>✓</span>
                      ) : (
                        <span style={{ fontSize: 11, flexShrink: 0 }}>{lesson.type === "video" ? "▶" : "📄"}</span>
                      )}
                      <span style={{ flex: 1, textDecoration: isDone ? "line-through" : "none", opacity: isDone && !isActive ? 0.6 : 1 }}>
                        {lesson.title}
                      </span>
                      <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "'IBM Plex Mono',monospace", flexShrink: 0 }}>
                        {lesson.duration}
                      </span>
                    </div>
                  );
                })}

                {/* Quiz */}
                {mod.quiz && (
                  <div
                    onClick={() => setActiveItem({ type: "quiz", moduleId: mod.id, quizId: mod.quiz.id })}
                    style={{
                      padding: "9px 18px 9px 48px",
                      cursor: "pointer",
                      background: activeItem?.type === "quiz" && activeItem?.quizId === mod.quiz.id ? "#f5f3ff" : "transparent",
                      borderLeft: activeItem?.type === "quiz" && activeItem?.quizId === mod.quiz.id ? "3px solid #7c3aed" : "3px solid transparent",
                      display: "flex", alignItems: "center", gap: 8,
                      fontSize: 12.5,
                      color: quizPassed ? "#16a34a" : "#d97706",
                      fontWeight: 600,
                      transition: "all .15s",
                    }}
                    onMouseEnter={e => { if (activeItem?.quizId !== mod.quiz.id) e.currentTarget.style.background = "#faf9fe"; }}
                    onMouseLeave={e => { if (activeItem?.quizId !== mod.quiz.id) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ fontSize: 12, flexShrink: 0 }}>{quizPassed ? "✓" : "📝"}</span>
                    <span>Module Quiz</span>
                    {quizPassed && (
                      <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "'IBM Plex Mono',monospace" }}>
                        {progress.quizScores[mod.quiz.id].score}/{progress.quizScores[mod.quiz.id].total}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggle Sidebar */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
        position: "absolute", left: sidebarOpen ? 308 : 4, top: 70,
        width: 24, height: 24, borderRadius: "50%",
        background: "#fff", border: "1.5px solid #e9e5f5",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "#7c3aed", zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        transition: "left .3s",
      }}>
        {sidebarOpen ? "◀" : "▶"}
      </button>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 56px)" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, color: "#7c3aed", gap: 10, fontSize: 14 }}>
            <div style={{ width: 20, height: 20, border: "3px solid #e9e5f5", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            Loading course...
          </div>
        ) : activeItem?.type === "lesson" && activeContent ? (
          <LessonViewer
            lesson={activeContent}
            isCompleted={progress.completedLessons?.includes(activeContent.id)}
            onMarkComplete={() => markComplete(activeContent.id)}
            onNext={() => {
              // Find next lesson or quiz
              const mod = course.modules.find(m => m.id === activeItem.moduleId);
              const lessonIdx = mod.lessons.findIndex(l => l.id === activeContent.id);
              if (lessonIdx < mod.lessons.length - 1) {
                setActiveItem({ type: "lesson", moduleId: mod.id, lessonId: mod.lessons[lessonIdx + 1].id });
              } else if (mod.quiz) {
                setActiveItem({ type: "quiz", moduleId: mod.id, quizId: mod.quiz.id });
              } else {
                const modIdx = course.modules.findIndex(m => m.id === mod.id);
                if (modIdx < course.modules.length - 1) {
                  const nextMod = course.modules[modIdx + 1];
                  setActiveItem({ type: "lesson", moduleId: nextMod.id, lessonId: nextMod.lessons[0].id });
                }
              }
            }}
          />
        ) : activeItem?.type === "quiz" && activeContent ? (
          <QuizViewer
            quiz={activeContent}
            previousScore={progress.quizScores?.[activeContent.id]}
            onComplete={(score, total) => {
              saveQuizScore(activeContent.id, score, total);
            }}
            onNext={() => {
              const modIdx = course.modules.findIndex(m => m.id === activeItem.moduleId);
              if (modIdx < course.modules.length - 1) {
                const nextMod = course.modules[modIdx + 1];
                setActiveItem({ type: "lesson", moduleId: nextMod.id, lessonId: nextMod.lessons[0].id });
              }
            }}
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400, color: "#94a3b8", fontSize: 15 }}>
            Select a lesson from the sidebar to begin
          </div>
        )}
      </div>
    </div>
  );
}
