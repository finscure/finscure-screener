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

// ═══════════════════════════════════════════════
// ACCESS RULES
// Stage 1: Modules 1-3 accessible (unlock Stage 2 after Module 3 + 5 trades)
// Stage 2: Modules 1-7 accessible (unlock Stage 3 after Module 7 + 20 trades)
// Stage 3 (₹99/mo): Modules 1-17 accessible
// Stage 4 (₹199/mo): All 30 modules accessible
// ═══════════════════════════════════════════════
function getModuleAccess(moduleNum, interfaceStage) {
  const num = parseInt(moduleNum);
  if (interfaceStage >= 4) return { accessible: true, reason: null };
  if (interfaceStage >= 3 && num <= 17) return { accessible: true, reason: null };
  if (interfaceStage >= 2 && num <= 7) return { accessible: true, reason: null };
  if (interfaceStage >= 1 && num <= 3) return { accessible: true, reason: null };

  // Locked — determine why
  if (num <= 7) return { accessible: false, reason: "stage", unlockStage: 2, unlockReq: "Complete Module 3 + 5 mock trades" };
  if (num <= 17) return { accessible: false, reason: "paid", tier: "Pro", price: "₹99/mo", unlockReq: "Upgrade to Pro" };
  return { accessible: false, reason: "paid", tier: "Pro+", price: "₹199/mo", unlockReq: "Upgrade to Pro+" };
}

const LEVEL_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage({ onOpenCourse }) {
  const { user, userProfile } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedSections, setCollapsedSections] = useState({});
  const [showUpgradeFor, setShowUpgradeFor] = useState(null);

  const interfaceStage = userProfile?.interface_stage || 1;

  function toggleSection(sectionId) {
    setCollapsedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }

  function handleCourseClick(course) {
    if (!user) { setShowLogin(true); return; }

    const access = getModuleAccess(course.num, interfaceStage);
    if (!access.accessible) {
      setShowUpgradeFor(access);
      return;
    }
    if (onOpenCourse) onOpenCourse(course.id);
  }

  const filtered = COURSES.filter(c => {
    const matchLevel = levelFilter === "All" || c.level === levelFilter;
    const matchSearch = !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  const groupedBySection = SECTIONS.map(section => ({
    ...section,
    courses: filtered.filter(c => c.section === section.id),
  })).filter(s => s.courses.length > 0);

  const totalModules = COURSES.length;
  const totalLessons = COURSES.reduce((s, c) => s + c.lessons, 0);
  const totalHours = COURSES.reduce((s, c) => s + parseFloat(c.duration), 0);

  return (
    <div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Upgrade Modal */}
      {showUpgradeFor && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--modal-bg)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowUpgradeFor(null)}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18, padding: "32px 28px", width: 400, maxWidth: "90vw", boxShadow: "var(--shadow-lg)", textAlign: "center" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{showUpgradeFor.reason === "paid" ? "🔒" : "📚"}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              {showUpgradeFor.reason === "paid" ? `${showUpgradeFor.tier} Feature` : "Keep Learning to Unlock"}
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.5 }}>
              {showUpgradeFor.reason === "paid"
                ? `This module is available with the ${showUpgradeFor.tier} plan (${showUpgradeFor.price}). Upgrade to access advanced content.`
                : `${showUpgradeFor.unlockReq} to unlock this module. You're making great progress!`
              }
            </p>
            {showUpgradeFor.reason === "paid" ? (
              <button className="btn-primary" style={{ padding: "12px 32px", fontSize: 14 }}
                onClick={() => setShowUpgradeFor(null)}>
                Upgrade to {showUpgradeFor.tier} — {showUpgradeFor.price}
              </button>
            ) : (
              <button className="btn-primary" style={{ padding: "12px 32px", fontSize: 14 }}
                onClick={() => setShowUpgradeFor(null)}>
                Got it — Back to Learning
              </button>
            )}
            <div>
              <button onClick={() => setShowUpgradeFor(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", marginTop: 12, fontFamily: "inherit" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="section-header">
        <div>
          <div className="section-title">Learning Path</div>
          <div className="section-subtitle">{totalModules} Modules · {totalLessons} Lessons · {totalHours.toFixed(0)} Hours</div>
        </div>
      </div>

      {/* Stats */}
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
          <div className="stat-label" style={{ fontSize: 12 }}>Content</div>
        </div>
        <div className="stat-card" style={{ padding: "12px 16px" }}>
          <div className="stat-value" style={{ fontSize: 20, color: "var(--purple)" }}>{SECTIONS.length}</div>
          <div className="stat-label" style={{ fontSize: 12 }}>Sections</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {LEVEL_FILTERS.map(lf => (
            <button key={lf} className={`tab${levelFilter === lf ? " active" : ""}`}
              onClick={() => setLevelFilter(lf)}>{lf}</button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search modules..."
            style={{ padding: "8px 14px 8px 34px", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", width: 220, transition: "border 0.2s" }}
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
            <div onClick={() => toggleSection(section.id)}
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
              <span style={{ fontSize: 16, color: "var(--text-muted)", transition: "transform 0.2s", transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}>▼</span>
            </div>

            {/* Module Cards */}
            {!isCollapsed && (
              <div className="courses-grid">
                {section.courses.map(course => {
                  const lc = LEVEL_STYLES[course.level] || LEVEL_STYLES.Beginner;
                  const access = getModuleAccess(course.num, interfaceStage);
                  const isLocked = !access.accessible;
                  const isPro = access.reason === "paid";

                  return (
                    <div key={course.id} className="course-card" onClick={() => handleCourseClick(course)}
                      style={{ opacity: isLocked ? 0.65 : 1, position: "relative" }}>
                      {/* Thumbnail */}
                      <div style={{
                        height: 120, position: "relative", overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isLocked ? "var(--surface)" : (course.thumb || "var(--surface)"),
                        filter: isLocked ? "grayscale(0.6)" : "none",
                      }}>
                        <span style={{ position: "relative", zIndex: 1, fontSize: 36 }}>{isLocked ? "🔒" : course.icon}</span>
                        <span style={{
                          position: "absolute", top: 10, right: 10, zIndex: 2,
                          fontSize: 12, fontWeight: 800, padding: "2px 8px", borderRadius: 6,
                          background: "rgba(0,0,0,0.4)", color: "#fff", fontFamily: "'JetBrains Mono',monospace",
                        }}>{course.num}</span>
                        <span style={{
                          position: "absolute", top: 10, left: 10, zIndex: 2,
                          fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                          background: lc.bg, color: lc.color,
                        }}>{course.level}</span>
                        {/* Pro badge */}
                        {isPro && (
                          <span style={{
                            position: "absolute", bottom: 10, right: 10, zIndex: 2,
                            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6,
                            background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff",
                          }}>{access.tier}</span>
                        )}
                      </div>

                      {/* Body */}
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{course.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {course.description}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--text-muted)" }}>
                          <span>📖 {course.lessons} lessons</span>
                          <span>🕐 {course.duration}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 16px", borderTop: "1px solid var(--border)",
                      }}>
                        {isLocked ? (
                          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                            {isPro ? `🔒 ${access.tier} — ${access.price}` : `🔒 ${access.unlockReq}`}
                          </span>
                        ) : (
                          <>
                            <div style={{ flex: 1, marginRight: 12 }}>
                              <div style={{ width: "100%", height: 3, background: "var(--surface)", borderRadius: 2, overflow: "hidden" }}>
                                <div style={{ height: "100%", borderRadius: 2, width: "0%", background: "var(--gradient-green)" }} />
                              </div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--green)", whiteSpace: "nowrap" }}>Start →</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {groupedBySection.length === 0 && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No modules found</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Try adjusting your search or level filter</div>
        </div>
      )}
    </div>
  );
}
