import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout, loginWithGoogle } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navLinks = [
    { to: "/", label: "Screener", icon: "📊" },
    { to: "/learn", label: "Learn", icon: "📚" },
    { to: "/trade", label: "Mock Trade", icon: "⚡" },
    { to: "/strategy", label: "Strategies", icon: "🎯", soon: true },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #ede9fe",
      padding: "0 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 56,
      position: "sticky",
      top: 0,
      zIndex: 200,
      boxShadow: "0 1px 3px rgba(45,27,105,.04)",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />

      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L30 28H2L16 2Z" fill="#2D1B69" />
          <path d="M16 9L24 25H8L16 9Z" fill="#7c3aed" opacity=".5" />
        </svg>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#2D1B69", letterSpacing: ".05em", textTransform: "uppercase" }}>
          Finscure
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.soon ? "#" : link.to}
            onClick={link.soon ? (e) => e.preventDefault() : undefined}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              color: link.soon ? "#c4b5fd" : isActive(link.to) ? "#2D1B69" : "#64748b",
              background: isActive(link.to) ? "#f5f3ff" : "transparent",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all .2s",
              cursor: link.soon ? "default" : "pointer",
              position: "relative",
            }}
          >
            <span style={{ fontSize: 14 }}>{link.icon}</span>
            {link.label}
            {link.soon && (
              <span style={{
                fontSize: 8,
                background: "#fef3c7",
                color: "#d97706",
                padding: "1px 5px",
                borderRadius: 3,
                fontWeight: 700,
                letterSpacing: ".04em",
              }}>SOON</span>
            )}
          </Link>
        ))}
      </div>

      {/* Auth Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        {user ? (
          <>
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer", padding: "5px 12px 5px 5px",
                borderRadius: 10, border: "1.5px solid #e9e5f5",
                transition: "all .2s",
                background: showUserMenu ? "#f5f3ff" : "#fff",
              }}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #2D1B69)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 12, fontWeight: 700,
                }}>
                  {(user.displayName || user.email || "U")[0].toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1e1b3a", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.displayName || user.email?.split("@")[0]}
              </span>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>▼</span>
            </div>

            {showUserMenu && (
              <div style={{
                position: "absolute", top: "120%", right: 0,
                background: "#fff", border: "1.5px solid #e9e5f5",
                borderRadius: 10, padding: 6, width: 180,
                boxShadow: "0 12px 40px rgba(45,27,105,.12)",
                zIndex: 300,
              }}>
                <div style={{ padding: "8px 10px", fontSize: 11, color: "#94a3b8", borderBottom: "1px solid #f1f0f9", marginBottom: 4 }}>
                  {user.email}
                </div>
                <Link to="/learn" style={{
                  display: "block", padding: "8px 10px", fontSize: 13, color: "#1e1b3a",
                  textDecoration: "none", borderRadius: 6, fontWeight: 500,
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setShowUserMenu(false)}
                >
                  📚 My Courses
                </Link>
                <button onClick={() => { logout(); setShowUserMenu(false); }} style={{
                  display: "block", width: "100%", padding: "8px 10px",
                  fontSize: 13, color: "#dc2626", background: "transparent",
                  border: "none", borderRadius: 6, fontWeight: 500,
                  cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  ↩ Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={loginWithGoogle}
            style={{
              padding: "7px 16px",
              background: "#2D1B69",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#3d2b7a"}
            onMouseLeave={e => e.currentTarget.style.background = "#2D1B69"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
