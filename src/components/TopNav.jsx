import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SearchModal from "./SearchModal";
import UpgradeModal from "./UpgradeModal";

export default function TopNav({ activePage, onNavigate, onToggleTheme, theme, stockPrices, onToggleMobileSidebar }) {
  const { user, logout, loginWithGoogle } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); }
      if (e.key === "Escape") { setShowSearch(false); setShowUpgrade(false); }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navLinks = [
    { id: "dashboard", label: "Dashboard" },
    { id: "courses", label: "Courses" },
    { id: "trading", label: "Mock Trade" },
    { id: "screener", label: "Screener" },
    { id: "strategies", label: "Strategies" },
  ];

  return (
    <>
      <nav className="topnav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64,
        background: "var(--nav-bg)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)", transition: "all 0.35s",
      }}>
        {/* Left: Hamburger (mobile) + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Mobile hamburger */}
          <button className="mobile-hamburger" onClick={onToggleMobileSidebar} aria-label="Menu">☰</button>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, letterSpacing: -0.5, cursor: "pointer" }}
            onClick={() => onNavigate("dashboard")}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "var(--gradient-green)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "var(--btn-text)", flexShrink: 0,
            }}>F</div>
            <span className="topnav-logo-text">Finscure</span>
          </div>
        </div>

        {/* Center: Nav Links (hidden on mobile) */}
        <div className="topnav-links" style={{ display: "flex", gap: 4 }}>
          {navLinks.map(link => (
            <a key={link.id} href="#"
              onClick={e => { e.preventDefault(); onNavigate(link.id); }}
              style={{
                textDecoration: "none", color: activePage === link.id ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                transition: "all 0.2s", position: "relative",
                background: activePage === link.id ? "var(--hover-bg)" : "transparent",
              }}>
              {link.label}
              {activePage === link.id && (
                <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "var(--green)" }} />
              )}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Search — full on desktop, icon-only on mobile */}
          <div className="topnav-search-full" onClick={() => setShowSearch(true)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "7px 14px", fontSize: 13, color: "var(--text-muted)",
            cursor: "pointer", transition: "all 0.3s",
          }}>
            <span>🔍</span> Search...
            <kbd style={{ background: "var(--kbd-bg)", padding: "1px 6px", borderRadius: 4, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>⌘K</kbd>
          </div>
          {/* Mobile search icon */}
          <button onClick={() => setShowSearch(true)} style={{
            display: "none", width: 36, height: 36, borderRadius: 8, border: "none",
            background: "var(--surface)", cursor: "pointer", fontSize: 16, color: "var(--text-primary)",
            alignItems: "center", justifyContent: "center",
          }} className="mobile-search-btn">🔍</button>

          {/* Theme Toggle */}
          <div onClick={onToggleTheme} title="Toggle theme" style={{
            position: "relative", width: 54, height: 28,
            background: "var(--surface)", borderRadius: 14,
            cursor: "pointer", border: "1px solid var(--border)",
            transition: "all 0.3s", display: "flex", alignItems: "center", padding: "0 5px", flexShrink: 0,
          }}>
            <span style={{ position: "absolute", left: 6, fontSize: 13, opacity: theme === "light" ? 1 : 0.4, lineHeight: 1 }}>☀️</span>
            <span style={{ position: "absolute", right: 6, fontSize: 13, opacity: theme === "dark" ? 1 : 0.4, lineHeight: 1 }}>🌙</span>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", background: "var(--gradient-green)",
              position: "absolute", top: 2, left: 2,
              transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: theme === "light" ? "translateX(26px)" : "translateX(0)",
            }} />
          </div>

          {/* Upgrade (hidden on mobile) */}
          <button onClick={() => setShowUpgrade(true)} className="btn-primary topnav-upgrade" style={{ padding: "8px 20px", fontSize: 14 }}>
            Upgrade Pro
          </button>

          {/* Avatar */}
          {user ? (
            <div style={{ position: "relative" }}>
              <div onClick={() => setShowUserMenu(!showUserMenu)} style={{
                width: 34, height: 34, borderRadius: "50%", background: "var(--gradient-blue)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff", overflow: "hidden", flexShrink: 0,
              }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  (user.displayName || user.email || "U")[0].toUpperCase()
                )}
              </div>
              {showUserMenu && (
                <div style={{
                  position: "absolute", top: "120%", right: 0,
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: 6, width: 180, boxShadow: "var(--shadow-lg)", zIndex: 300,
                }}>
                  <div style={{ padding: "8px 10px", fontSize: 11, color: "var(--text-muted)", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>{user.email}</div>
                  <button onClick={() => { logout(); setShowUserMenu(false); }} style={{
                    display: "block", width: "100%", padding: "8px 10px", fontSize: 13, color: "var(--red)",
                    background: "transparent", border: "none", borderRadius: 6, fontWeight: 500,
                    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                  }}>↩ Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div onClick={loginWithGoogle} style={{
              width: 34, height: 34, borderRadius: "50%", background: "var(--gradient-blue)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff", flexShrink: 0,
            }}>?</div>
          )}
        </div>
      </nav>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} onNavigate={onNavigate} stockPrices={stockPrices} />}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </>
  );
}
