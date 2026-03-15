import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/LoginModal";
import { COURSES } from "../data/courses";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function LearnPage() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = COURSES.filter(c => {
    const matchLevel = levelFilter === "All" || c.level === levelFilter;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  const handleCourseClick = (courseId) => {
    if (!user) {
      setShowLogin(true);
      return null;
    }
    return `/learn/${courseId}`;
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f7fc", minHeight: "calc(100vh - 56px)" }}>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a3e 0%, #2D1B69 40%, #4c1d95 100%)",
        padding: "48px 28px 52px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(124,58,237,.15)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -30, left: "20%", width: 300, height: 150, borderRadius: "50%", background: "rgba(56,189,248,.08)", filter: "blur(50px)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", fontSize: 9, fontWeight: 700, color: "#a78bfa",
            background: "rgba(167,139,250,.12)", padding: "4px 12px", borderRadius: 20,
            letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14,
          }}>
            7 Courses · 92 Lessons · Free
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36, fontWeight: 700, color: "#fff",
            margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-.02em",
          }}>
            Master finance through<br />experience, not theory.
          </h1>
          <p style={{ fontSize: 15, color: "#c4b5fd", margin: "0 0 24px", lineHeight: 1.6, maxWidth: 520 }}>
            From stock market basics to options trading — learn at your own pace with videos, articles, quizzes, and certificates.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 420 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "12px 16px 12px 42px",
                background: "rgba(255,255,255,.1)", border: "1.5px solid rgba(167,139,250,.2)",
                borderRadius: 12, fontSize: 14, color: "#fff",
                fontFamily: "inherit", outline: "none",
                backdropFilter: "blur(8px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 28px 48px" }}>
        {/* Level Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          {LEVELS.map(level => (
            <button key={level} onClick={() => setLevelFilter(level)} style={{
              padding: "7px 18px", borderRadius: 20,
              border: levelFilter === level ? "1.5px solid #7c3aed" : "1.5px solid #e9e5f5",
              background: levelFilter === level ? "#f5f3ff" : "#fff",
              color: levelFilter === level ? "#7c3aed" : "#64748b",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", transition: "all .2s",
            }}>
              {level}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>
            {filtered.length} courses
          </span>
        </div>

        {/* Course Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {filtered.map((course, idx) => {
            const courseLink = user ? `/learn/${course.id}` : "#";
            return (
              <div key={course.id} style={{ animationDelay: `${idx * 60}ms` }}>
                {user ? (
                  <Link to={`/learn/${course.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <CourseCard course={course} />
                  </Link>
                ) : (
                  <div onClick={() => setShowLogin(true)} style={{ cursor: "pointer" }}>
                    <CourseCard course={course} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 15, fontWeight: 500 }}>No courses found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);

  const levelColors = {
    Beginner: { bg: "#dcfce7", text: "#16a34a" },
    Intermediate: { bg: "#fef3c7", text: "#d97706" },
    Advanced: { bg: "#fef2f2", text: "#dc2626" },
  };
  const lc = levelColors[course.level] || levelColors.Beginner;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1.5px solid #ede9fe",
        padding: 24,
        transition: "all .25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(45,27,105,.1)" : "0 2px 8px rgba(45,27,105,.04)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Icon + Level */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${course.color}12`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24,
        }}>
          {course.icon}
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
          background: lc.bg, color: lc.text, letterSpacing: ".04em",
        }}>
          {course.level}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 17, fontWeight: 700, color: "#1e1b3a",
        margin: "0 0 8px", lineHeight: 1.3,
      }}>
        {course.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 13, color: "#64748b", lineHeight: 1.6,
        margin: "0 0 18px", flex: 1,
      }}>
        {course.description}
      </p>

      {/* Stats */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        paddingTop: 14, borderTop: "1px solid #f1f0f9",
        fontSize: 12, color: "#94a3b8", fontWeight: 500,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {course.duration}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          {course.lessons} lessons
        </span>
        <span style={{
          marginLeft: "auto",
          color: course.color,
          fontWeight: 700,
          fontSize: 11,
          display: "flex", alignItems: "center", gap: 3,
        }}>
          Start Learning →
        </span>
      </div>
    </div>
  );
}
