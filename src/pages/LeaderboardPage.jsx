import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

const formatINR = (n) => {
  if (!n || isNaN(n)) return "₹0";
  const abs = Math.abs(n);
  if (abs >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const q = query(collection(db, "mock_leaderboard"), orderBy("returnPct", "desc"), limit(50));
        const snap = await getDocs(q);
        setLeaders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error("Leaderboard error:", e); }
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f8f7fc", minHeight: "calc(100vh - 56px)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a0a3e, #2D1B69, #4c1d95)", padding: "32px 28px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Mock Trading Leaderboard</h1>
        <p style={{ fontSize: 15, color: "#c4b5fd", margin: 0 }}>See how your virtual portfolio stacks up against other learners</p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 28px 48px" }}>
        <Link to="/trade" style={{ fontSize: 13, color: "#7c3aed", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 20 }}>← Back to Dashboard</Link>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ width: 20, height: 20, border: "3px solid #e9e5f5", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            Loading leaderboard...
          </div>
        ) : leaders.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
            <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>No traders yet!</p>
            <p style={{ fontSize: 13 }}>Be the first to create a mock portfolio and appear on the leaderboard.</p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #ede9fe", overflow: "hidden", boxShadow: "0 4px 16px rgba(45,27,105,.06)" }}>
            {/* Table Header */}
            <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", background: "#faf9fe", borderBottom: "2px solid #ede9fe", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#7c3aed" }}>
              <div style={{ width: 50, textAlign: "center" }}>Rank</div>
              <div style={{ flex: 1 }}>Trader</div>
              <div style={{ width: 120, textAlign: "right" }}>Capital</div>
              <div style={{ width: 140, textAlign: "right" }}>Current Value</div>
              <div style={{ width: 120, textAlign: "right" }}>Return %</div>
            </div>

            {leaders.map((leader, idx) => {
              const isMe = user && leader.userId === user.uid;
              const rank = idx + 1;
              const rankEmoji = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}`;

              return (
                <div key={leader.id} style={{
                  display: "flex", alignItems: "center", padding: "14px 20px",
                  borderBottom: "1px solid #f3f1fa",
                  background: isMe ? "#f5f3ff" : "#fff",
                  transition: "background .12s",
                }}
                  onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = "#faf8ff"; }}
                  onMouseLeave={e => { if (!isMe) e.currentTarget.style.background = "#fff"; }}
                >
                  {/* Rank */}
                  <div style={{ width: 50, textAlign: "center", fontSize: rank <= 3 ? 20 : 14, fontWeight: 700, color: rank <= 3 ? undefined : "#64748b", fontFamily: rank > 3 ? "'IBM Plex Mono',monospace" : undefined }}>
                    {rankEmoji}
                  </div>

                  {/* Trader */}
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                    {leader.photoURL ? (
                      <img src={leader.photoURL} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #2D1B69)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>
                        {(leader.displayName || "?")[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 600, color: "#1e1b3a", fontSize: 14 }}>
                        {leader.displayName || "Anonymous"}
                        {isMe && <span style={{ fontSize: 10, color: "#7c3aed", background: "#f5f3ff", padding: "2px 8px", borderRadius: 10, marginLeft: 6, fontWeight: 700 }}>YOU</span>}
                      </div>
                    </div>
                  </div>

                  {/* Capital */}
                  <div style={{ width: 120, textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "#64748b" }}>
                    {formatINR(leader.startingCapital)}
                  </div>

                  {/* Current Value */}
                  <div style={{ width: 140, textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, color: "#1e1b3a" }}>
                    {formatINR(leader.currentValue)}
                  </div>

                  {/* Return */}
                  <div style={{ width: 120, textAlign: "right" }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 13,
                      color: leader.returnPct >= 0 ? "#16a34a" : "#dc2626",
                      background: leader.returnPct >= 0 ? "#f0fdf4" : "#fef2f2",
                      padding: "4px 12px", borderRadius: 6,
                    }}>
                      {leader.returnPct >= 0 ? "+" : ""}{leader.returnPct?.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 20 }}>
          Leaderboard updates when users buy/sell stocks. Rankings based on overall portfolio return percentage.
        </p>
      </div>
    </div>
  );
}
