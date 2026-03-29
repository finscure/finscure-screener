import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginModal({ onClose }) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    try { setLoading(true); await loginWithGoogle(); onClose(); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  async function handleEmail(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      if (mode === "signup") await signupWithEmail(email, password, name);
      else await loginWithEmail(email, password);
      onClose();
    } catch (e) {
      setError(e.code === "auth/invalid-credential" ? "Invalid email or password"
        : e.code === "auth/email-already-in-use" ? "Email already registered"
        : e.code === "auth/weak-password" ? "Password must be 6+ characters" : e.message);
    } finally { setLoading(false); }
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "10px 14px",
    background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8,
    fontSize: 14, fontFamily: "'DM Sans',sans-serif", color: "var(--text-primary)", outline: "none",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--modal-bg)", backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 18, padding: "32px 28px", width: 380, maxWidth: "90vw",
        boxShadow: "var(--shadow-lg)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--gradient-green)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "var(--btn-text)", marginBottom: 12 }}>F</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            {mode === "login" ? "Sign in to track your progress" : "Start your investing journey"}
          </p>
        </div>

        <button onClick={handleGoogle} disabled={loading} style={{
          width: "100%", padding: "11px", background: "var(--bg-secondary)", border: "1px solid var(--border)",
          borderRadius: 8, fontSize: 13, fontWeight: 600, color: "var(--text-primary)", cursor: "pointer",
          fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <form onSubmit={handleEmail}>
          {mode === "signup" && <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={{ ...inputStyle, marginBottom: 10 }} />}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ ...inputStyle, marginBottom: 10 }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} style={{ ...inputStyle, marginBottom: 14 }} />
          {error && <div style={{ padding: "8px 12px", background: "var(--red-dim)", borderRadius: 8, fontSize: 12, color: "var(--red)", marginBottom: 12 }}>{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "11px", fontSize: 14 }}>
            {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 16, marginBottom: 0 }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <span onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} style={{ color: "var(--green)", fontWeight: 600, cursor: "pointer" }}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
