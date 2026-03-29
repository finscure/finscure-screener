import { useState } from "react";
import { COURSES } from "../data/courses";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";

const LEVEL_CLASSES = {
  Beginner: { bg: "var(--green-dim)", color: "var(--green)" },
  Intermediate: { bg: "var(--amber-dim)", color: "var(--amber)" },
  Advanced: { bg: "var(--red-dim)", color: "var(--red)" },
};

export default function CoursesPage({ onOpenCourse }) {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [filter, setFilter] = useState("All Courses");

  const filtered = filter === "All Courses" ? COURSES
    : COURSES.filter(c => c.level === filter);

  function handleCourseClick(course) {
    if (!user) { setShowLogin(true); return; }
    if (onOpenCourse) onOpenCourse(course.id);
  }

  return (
    <div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <div className="section-header">
        <div>
          <div className="section-title">Learning Paths</div>
          <div className="section-subtitle">Structured courses from basics to advanced strategies</div>
        </div>
      </div>

      <div className="tab-bar">
        {["All Courses", "Beginner", "Intermediate", "Advanced"].map(t => (
          <button key={t} className={`tab${filter === t ? " active" : ""}`}
            onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="courses-grid">
        {filtered.map(course => {
          const lc = LEVEL_CLASSES[course.level] || LEVEL_CLASSES.Beginner;
          const totalLessons = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || course.lessons || 0;
          const totalModules = course.modules?.length || 0;
          // Simulated progress (would come from Firestore in real app)
          const progress = Math.floor(Math.random() * 40);

          return (
            <div key={course.id} className="course-card" onClick={() => handleCourseClick(course)}>
              {/* Thumbnail */}
              <div style={{
                height: 140, position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: course.thumb || `linear-gradient(135deg, ${course.color}40, ${course.color}20)`,
              }}>
                <span style={{ position: "relative", zIndex: 1, fontSize: 42 }}>{course.icon}</span>
                <span style={{
                  position: "absolute", top: 12, left: 12, zIndex: 2,
                  fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                  background: lc.bg, color: lc.color,
                }}>{course.level}</span>
              </div>

              {/* Body */}
              <div style={{ padding: 18 }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 0.8, color: "var(--text-muted)", marginBottom: 6,
                }}>
                  {totalModules} Modules
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                  {course.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 14 }}>
                  {course.description}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>🕐 {course.duration}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>📖 {totalLessons} lessons</span>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 18px", borderTop: "1px solid var(--border)",
              }}>
                <div style={{ flex: 1, marginRight: 14 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                    {progress}% complete
                  </div>
                  <div style={{ width: "100%", height: 3, background: "var(--surface)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 2, width: `${progress}%`,
                      background: progress > 0 ? "var(--gradient-green)" : "transparent",
                    }} />
                  </div>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 600, color: "var(--green)",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {progress > 0 ? "Continue →" : "Start →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
