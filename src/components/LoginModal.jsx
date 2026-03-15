import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginModal({ onClose }) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signupWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
    } catch (e) {
      const msg = e.code === "auth/invalid-credential" ? "Invalid email or password"
        : e.code === "auth/email-already-in-use" ? "Email already registered — try signing in"
        : e.code === "auth/weak-password" ? "Password must be at least 6 characters"
        : e.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "10px 14px",
    background: "#faf9fe", border: "1.5px solid #e9e5f5", borderRadius: 10,
    fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#1e1b3a",
    outline: "none", transition: "border-color .2s",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "32px 28px",
        width: 380, maxWidth: "90vw",
        boxShadow: "0 24px 60px rgba(45,27,105,.2)",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" style={{ margin: "0 auto 10px" }}>
            <path d="M16 2L30 28H2L16 2Z" fill="#2D1B69" />
            <path d="M16 9L24 25H8L16 9Z" fill="#7c3aed" opacity=".5" />
          </svg>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1e1b3a", margin: "0 0 4px" }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
            {mode === "login" ? "Sign in to track your learning progress" : "Start your stock market learning journey"}
          </p>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogleLogin} disabled={loading} style={{
          width: "100%", padding: "11px 16px",
          background: "#fff", border: "1.5px solid #e9e5f5", borderRadius: 10,
          fontSize: 13, fontWeight: 600, color: "#1e1b3a",
          cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          transition: "all .2s",
          marginBottom: 16,
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "#e9e5f5" }} />
          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#e9e5f5" }} />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit}>
          {mode === "signup" && (
            <input
              type="text" placeholder="Full Name" value={name}
              onChange={e => setName(e.target.value)} required
              style={{ ...inputStyle, marginBottom: 10 }}
              onFocus={e => e.target.style.borderColor = "#7c3aed"}
              onBlur={e => e.target.style.borderColor = "#e9e5f5"}
            />
          )}
          <input
            type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)} required
            style={{ ...inputStyle, marginBottom: 10 }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"}
            onBlur={e => e.target.style.borderColor = "#e9e5f5"}
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={6}
            style={{ ...inputStyle, marginBottom: 14 }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"}
            onBlur={e => e.target.style.borderColor = "#e9e5f5"}
          />

          {error && (
            <div style={{ padding: "8px 12px", background: "#fef2f2", borderRadius: 8, fontSize: 12, color: "#dc2626", marginBottom: 12, fontWeight: 500 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "11px 16px",
            background: "#2D1B69", color: "#fff", border: "none", borderRadius: 10,
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            transition: "all .2s", opacity: loading ? 0.6 : 1,
          }}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#64748b", marginTop: 16, marginBottom: 0 }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            style={{ color: "#7c3aed", fontWeight: 600, cursor: "pointer" }}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
