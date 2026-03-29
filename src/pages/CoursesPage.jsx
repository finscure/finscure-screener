import { useState } from "react";
import { COURSES, SECTIONS } from "../data/courses";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";

const LEVEL_STYLES = {
  "Beginner": { bg: "var(--green-dim)", color: "var(--green)" },
  "Intermediate": { bg: "var(--amber-dim)", color: "var(--amber)" },
  "Advanced": { bg: "var(--red-dim)", color: "var(--red)" },
  "All Levels": { bg: "var(--blue-dim)", color: "var(--blue)" },
};

const LEVEL_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage({ onOpenCourse }) {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedSections, setCollapsedSections] = useState({});

  function toggleSection(sectionId) {
    setCollapsedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }

  function handleCourseClick(course) {
    if (!user) { setShowLogin(true); return; }
    if (onOpenCourse) onOpenCourse(course.id);
  }

  // Filter courses
  const filtered = COURSES.filter(c => {
    const matchLevel = levelFilter === "All" || c.level === levelFilter;
    const matchSearch = !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  // Group by section
  const groupedBySection = SECTIONS.map(section => ({
    ...section,
    courses: filtered.filter(c => c.section === section.id),
  })).filter(s => s.courses.length > 0);

  // Stats
  const totalModules = COURSES.length;
  const totalLessons = COURSES.reduce((s, c) => s + c.lessons, 0);
  const totalHours = COURSES.reduce((s, c) => s + parseFloat(c.duration), 0);

  return (
    <div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Header */}
      <div className="section-header">
        <div>
          <div className="section-title">Course Curriculum</div>
          <div className="section-subtitle">{totalModules} Modules · {totalLessons} Lessons · {totalHours.toFixed(0)} Hours — From Beginner to Professional Trader</div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 20 }}>
        <div className="stat-card" style={{ padding: "12px 16px" }}>
          <div className="stat-value" style={{ fontSize: 20, color: "var(--green)" }}>{totalModules}</div>
          <div className="stat-label" style={{ fontSize: 12 }}>Modules</div>
        </div>
        <div className="stat-card" style={{ padding: "12px 16px" }}>
          <div className="stat-value" style={{ fontSize: 20, color: "var(--blue)" }}>{totalLessons}</div>
          <div className="stat-label" style={{ fontSize: 12 }}>Lessons</div>
        </div>
        <div className="stat-card" style={{ padding: "12px 16px" }}>
          <div className="stat-value" style={{ fontSize: 20, color: "var(--amber)" }}>{totalHours.toFixed(0)} hrs</div>
          <div className="stat-label" style={{ fontSize: 12 }}>Total Content</div>
        </div>
        <div className="stat-card" style={{ padding: "12px 16px" }}>
          <div className="stat-value" style={{ fontSize: 20, color: "var(--purple)" }}>{SECTIONS.length}</div>
          <div className="stat-label" style={{ fontSize: 12 }}>Sections</div>
        </div>
      </div>

      {/* Filters Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {/* Level Filter */}
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {LEVEL_FILTERS.map(lf => (
            <button key={lf} className={`tab${levelFilter === lf ? " active" : ""}`}
              onClick={() => setLevelFilter(lf)}>{lf}</button>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search modules..."
            style={{
              padding: "8px 14px 8px 34px", background: "var(--input-bg)", border: "1px solid var(--border)",
              borderRadius: 8, color: "var(--text-primary)", fontSize: 13, fontFamily: "'DM Sans',sans-serif",
              outline: "none", width: 220, transition: "border 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "var(--border-active)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "var(--text-muted)" }}>🔍</span>
        </div>
      </div>

      {/* Sections with Modules */}
      {groupedBySection.map(section => {
        const isCollapsed = collapsedSections[section.id];
        return (
          <div key={section.id} style={{ marginBottom: 28 }}>
            {/* Section Header */}
            <div
              onClick={() => toggleSection(section.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 18px",
                background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
                cursor: "pointer", transition: "all 0.2s", marginBottom: isCollapsed ? 0 : 14,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-active)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <span style={{ fontSize: 24 }}>{section.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{section.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                  {section.description} · {section.courses.length} module{section.courses.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10,
                  background: "var(--surface)", color: "var(--text-secondary)",
                }}>{section.courses.length}</span>
                <span style={{
                  fontSize: 16, color: "var(--text-muted)", transition: "transform 0.2s",
                  transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                }}>▼</span>
              </div>
            </div>

            {/* Module Cards Grid */}
            {!isCollapsed && (
              <div className="courses-grid">
                {section.courses.map(course => {
                  const lc = LEVEL_STYLES[course.level] || LEVEL_STYLES.Beginner;

                  return (
                    <div key={course.id} className="course-card" onClick={() => handleCourseClick(course)}>
                      {/* Thumbnail */}
                      <div style={{
                        height: 120, position: "relative", overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: course.thumb || "var(--surface)",
                      }}>
                        <span style={{ position: "relative", zIndex: 1, fontSize: 36 }}>{course.icon}</span>
                        {/* Module Number */}
                        <span style={{
                          position: "absolute", top: 10, right: 10, zIndex: 2,
                          fontSize: 12, fontWeight: 800, padding: "2px 8px", borderRadius: 6,
                          background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(4px)",
                          fontFamily: "'JetBrains Mono',monospace",
                        }}>{course.num}</span>
                        {/* Level Badge */}
                        <span style={{
                          position: "absolute", top: 10, left: 10, zIndex: 2,
                          fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                          background: lc.bg, color: lc.color,
                        }}>{course.level}</span>
                      </div>

                      {/* Body */}
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
                          {course.title}
                        </div>
                        <div style={{
                          fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12,
                          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {course.description}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--text-muted)" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>📖 {course.lessons} lessons</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>🕐 {course.duration}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 16px", borderTop: "1px solid var(--border)",
                      }}>
                        <div style={{ flex: 1, marginRight: 12 }}>
                          <div style={{ width: "100%", height: 3, background: "var(--surface)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 2, width: "0%", background: "var(--gradient-green)" }} />
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--green)", whiteSpace: "nowrap" }}>
                          Start →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Empty State */}
      {groupedBySection.length === 0 && (
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
          padding: "60px 40px", textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No modules found</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Try adjusting your search or level filter</div>
        </div>
      )}
    </div>
  );
}
