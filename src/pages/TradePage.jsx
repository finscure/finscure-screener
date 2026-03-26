import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTrading } from "../contexts/TradingContext";
import LoginModal from "../components/LoginModal";

const formatINR = (n) => {
  if (n === undefined || n === null || isNaN(n)) return "₹0";
  const abs = Math.abs(n);
  if (abs >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (abs >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

export default function TradePage() {
  const { user } = useAuth();
  const trading = useTrading();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [setupAmount, setSetupAmount] = useState(1000000);
  const [customAmount, setCustomAmount] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("holdings"); // holdings | watchlist | history
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!user) return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f8f7fc", minHeight: "calc(100vh - 56px)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>⚡</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#1e1b3a", margin: "0 0 12px" }}>Mock Trading</h1>
        <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, margin: "0 0 32px" }}>Practice trading with virtual money using real NSE stock prices. Zero risk, real learning.</p>
        <button onClick={() => setShowLogin(true)} style={{ padding: "14px 36px", background: "#2D1B69", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sign In to Start Trading</button>
      </div>
    </div>
  );

  if (trading.portfolioLoading) return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 56px)", background: "#f8f7fc", color: "#7c3aed", gap: 10 }}>
      <div style={{ width: 20, height: 20, border: "3px solid #e9e5f5", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      Loading portfolio...
    </div>
  );

  // Portfolio Setup Screen
  if (!trading.portfolio) return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f8f7fc", minHeight: "calc(100vh - 56px)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "60px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1e1b3a", margin: "0 0 8px" }}>Set Up Your Virtual Portfolio</h1>
        <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 36px", lineHeight: 1.5 }}>Choose how much virtual capital you want to start with. You can reset anytime.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          {trading.DEFAULT_CAPITALS.map(amt => (
            <button key={amt} onClick={() => { setSetupAmount(amt); setCustomAmount(""); }} style={{
              padding: "16px 12px", borderRadius: 12,
              border: setupAmount === amt && !customAmount ? "2px solid #7c3aed" : "2px solid #e9e5f5",
              background: setupAmount === amt && !customAmount ? "#f5f3ff" : "#fff",
              cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 700,
              color: setupAmount === amt && !customAmount ? "#7c3aed" : "#374151",
            }}>
              {amt >= 10000000 ? `₹${amt / 10000000} Cr` : amt >= 100000 ? `₹${amt / 100000} L` : `₹${amt.toLocaleString("en-IN")}`}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 28 }}>
          <input type="number" placeholder="Or enter custom amount (₹)" value={customAmount}
            onChange={e => { setCustomAmount(e.target.value); if (e.target.value) setSetupAmount(parseInt(e.target.value) || 0); }}
            style={{ width: "100%", boxSizing: "border-box", padding: "14px 18px", background: "#fff", border: "2px solid #e9e5f5", borderRadius: 12, fontSize: 16, fontFamily: "'IBM Plex Mono',monospace", color: "#1e1b3a", outline: "none", textAlign: "center" }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"} onBlur={e => e.target.style.borderColor = "#e9e5f5"}
          />
        </div>

        <button onClick={() => { if (setupAmount >= 10000) trading.createPortfolio(setupAmount); }}
          disabled={setupAmount < 10000}
          style={{
            padding: "14px 48px", background: setupAmount >= 10000 ? "#2D1B69" : "#d4d4d8", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700,
            cursor: setupAmount >= 10000 ? "pointer" : "default", fontFamily: "inherit",
          }}>
          Start Trading with {formatINR(setupAmount)}
        </button>
        {setupAmount < 10000 && <p style={{ fontSize: 12, color: "#dc2626", marginTop: 8 }}>Minimum ₹10,000 required</p>}
      </div>
    </div>
  );

  // Main Dashboard
  const metrics = trading.getPortfolioMetrics();
  const holdings = trading.portfolio.holdings || [];

  // Enrich holdings with live prices
  const enrichedHoldings = holdings.map(h => {
    const live = trading.stockPrices[h.symbol];
    const ltp = live?.ltp || h.avgPrice;
    const currentValue = h.qty * ltp;
    const investedValue = h.qty * h.avgPrice;
    const pnl = currentValue - investedValue;
    const pnlPct = investedValue > 0 ? (pnl / investedValue) * 100 : 0;
    return { ...h, ltp, currentValue, investedValue, pnl, pnlPct, change: live?.change || 0 };
  }).sort((a, b) => b.currentValue - a.currentValue);

  // Search stocks for buy
  const searchResults = searchQuery.length >= 2
    ? Object.values(trading.stockPrices).filter(s =>
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f8f7fc", minHeight: "calc(100vh - 56px)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* PORTFOLIO HEADER */}
      <div style={{ background: "linear-gradient(135deg, #1a0a3e 0%, #2D1B69 50%, #4c1d95 100%)", padding: "28px 28px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fbbf24", background: "rgba(251,191,36,.12)", padding: "3px 10px", borderRadius: 20, letterSpacing: ".08em" }}>VIRTUAL PORTFOLIO</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: 0 }}>Mock Trading Dashboard</h1>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to="/trade/leaderboard" style={{ padding: "8px 16px", background: "rgba(255,255,255,.1)", color: "#c4b5fd", border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, textDecoration: "none", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>🏆 Leaderboard</Link>
              <button onClick={() => setShowResetConfirm(true)} style={{ padding: "8px 16px", background: "rgba(220,38,38,.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,.2)", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>↺ Reset</button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { label: "Total Value", value: formatINR(metrics?.totalValue), sub: `Started: ${formatINR(metrics?.startingCapital)}`, color: "#fff" },
              { label: "Available Cash", value: formatINR(metrics?.cash), sub: `${((metrics?.cash / metrics?.totalValue) * 100).toFixed(1)}% of portfolio`, color: "#38bdf8" },
              { label: "Invested", value: formatINR(metrics?.totalInvested), sub: `${metrics?.holdingsCount} stocks`, color: "#a78bfa" },
              { label: "Overall P&L", value: `${metrics?.unrealizedPnL >= 0 ? "+" : ""}${formatINR(metrics?.unrealizedPnL)}`, sub: `${metrics?.overallReturn >= 0 ? "+" : ""}${metrics?.overallReturn?.toFixed(2)}% return`, color: metrics?.overallReturn >= 0 ? "#34d399" : "#f87171" },
            ].map((card, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.06)", borderRadius: 14, padding: "18px 20px", border: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>{card.label}</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 22, fontWeight: 700, color: card.color, marginBottom: 3 }}>{card.value}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 28px 48px" }}>
        {/* Search to Buy */}
        <div style={{ marginBottom: 24, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 480 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search stocks to buy (e.g., RELIANCE, TCS)..."
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px 12px 40px", background: "#fff", border: "1.5px solid #e9e5f5", borderRadius: 12, fontSize: 14, fontFamily: "inherit", color: "#1e1b3a", outline: "none" }}
                onFocus={e => e.target.style.borderColor = "#7c3aed"} onBlur={e => { setTimeout(() => setSearchQuery(""), 200); e.target.style.borderColor = "#e9e5f5"; }}
              />
            </div>
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, width: 480, background: "#fff", border: "1.5px solid #e9e5f5", borderRadius: 12, boxShadow: "0 12px 40px rgba(45,27,105,.12)", zIndex: 50, marginTop: 4, overflow: "hidden" }}>
              {searchResults.map(stock => (
                <div key={stock.symbol}
                  onClick={() => { navigate(`/trade/order/${stock.symbol}/buy`); setSearchQuery(""); }}
                  style={{ display: "flex", alignItems: "center", padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #f3f1fa", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#faf8ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#2D1B69", fontSize: 14 }}>{stock.symbol}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{stock.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 14, color: "#1e1b3a" }}>₹{stock.ltp?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 700, color: stock.change >= 0 ? "#16a34a" : "#dc2626" }}>{stock.change >= 0 ? "+" : ""}{stock.change?.toFixed(2)}%</div>
                  </div>
                  <div style={{ marginLeft: 12, padding: "6px 12px", background: "#dcfce7", color: "#16a34a", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>BUY</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "2px solid #ede9fe", paddingBottom: 0 }}>
          {[
            { key: "holdings", label: `Holdings (${enrichedHoldings.length})`, icon: "💼" },
            { key: "watchlist", label: `Watchlist (${trading.watchlist.length})`, icon: "⭐" },
            { key: "history", label: "History", icon: "📋" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: "10px 20px", border: "none", fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
              background: "transparent", color: activeTab === tab.key ? "#2D1B69" : "#94a3b8",
              borderBottom: activeTab === tab.key ? "2px solid #7c3aed" : "2px solid transparent",
              marginBottom: -2, display: "flex", alignItems: "center", gap: 6,
            }}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === "holdings" && (
          enrichedHoldings.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📈</div>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>No holdings yet</p>
              <p style={{ fontSize: 13 }}>Search for a stock above to make your first trade!</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ede9fe", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>{["Stock", "Qty", "Avg Price", "LTP", "Invested", "Current", "P&L", "Actions"].map(h => (
                    <th key={h} style={{ padding: "11px 14px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#7c3aed", borderBottom: "2px solid #ede9fe", background: "#faf9fe", textAlign: h === "Stock" ? "left" : "right" }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {enrichedHoldings.map(h => (
                    <tr key={h.symbol} style={{ transition: "background .12s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#faf8ff"}
                      onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "left" }}>
                        <div style={{ fontWeight: 700, color: "#2D1B69", fontSize: 14 }}>{h.symbol}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{h.name}</div>
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{h.qty}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>₹{h.avgPrice.toFixed(2)}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 12 }}>₹{h.ltp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>{formatINR(h.investedValue)}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>{formatINR(h.currentValue)}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right" }}>
                        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 12, color: h.pnl >= 0 ? "#16a34a" : "#dc2626" }}>{h.pnl >= 0 ? "+" : ""}{formatINR(h.pnl)}</div>
                        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: h.pnlPct >= 0 ? "#16a34a" : "#dc2626" }}>({h.pnlPct >= 0 ? "+" : ""}{h.pnlPct.toFixed(2)}%)</div>
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #f3f1fa", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          <Link to={`/trade/order/${h.symbol}/buy`} style={{ padding: "5px 12px", background: "#f0fdf4", color: "#16a34a", borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>BUY</Link>
                          <Link to={`/trade/order/${h.symbol}/sell`} style={{ padding: "5px 12px", background: "#fef2f2", color: "#dc2626", borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>SELL</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* WATCHLIST TAB */}
        {activeTab === "watchlist" && (
          trading.watchlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⭐</div>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Watchlist is empty</p>
              <p style={{ fontSize: 13 }}>Add stocks from the screener to track them here</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ede9fe", overflow: "hidden" }}>
              {trading.watchlist.map(symbol => {
                const stock = trading.stockPrices[symbol];
                if (!stock) return null;
                return (
                  <div key={symbol} style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f3f1fa" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#2D1B69", fontSize: 14 }}>{stock.symbol}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{stock.name}</div>
                    </div>
                    <div style={{ textAlign: "right", marginRight: 16 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 14, color: "#1e1b3a" }}>₹{stock.ltp?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 700, color: stock.change >= 0 ? "#16a34a" : "#dc2626" }}>{stock.change >= 0 ? "+" : ""}{stock.change?.toFixed(2)}%</div>
                    </div>
                    <Link to={`/trade/order/${symbol}/buy`} style={{ padding: "6px 14px", background: "#dcfce7", color: "#16a34a", borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: "none", marginRight: 6 }}>BUY</Link>
                    <button onClick={() => trading.removeFromWatchlist(symbol)} style={{ padding: "6px 10px", background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          trading.transactions.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <p style={{ fontSize: 16, fontWeight: 500 }}>No transactions yet</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ede9fe", overflow: "hidden" }}>
              {trading.transactions.map(tx => (
                <div key={tx.id} style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f3f1fa", gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: tx.type === "BUY" ? "#f0fdf4" : "#fef2f2", color: tx.type === "BUY" ? "#16a34a" : "#dc2626",
                    fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>{tx.type === "BUY" ? "B" : "S"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#1e1b3a", fontSize: 14 }}>{tx.type} {tx.symbol}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{new Date(tx.timestamp).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 13, color: "#1e1b3a" }}>{tx.quantity} × ₹{tx.price?.toFixed(2)}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: tx.type === "BUY" ? "#dc2626" : "#16a34a" }}>{tx.type === "BUY" ? "-" : "+"}{formatINR(tx.total)}</div>
                  </div>
                  {tx.pnl !== undefined && tx.type === "SELL" && (
                    <div style={{ padding: "4px 10px", borderRadius: 6, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 700, background: tx.pnl >= 0 ? "#f0fdf4" : "#fef2f2", color: tx.pnl >= 0 ? "#16a34a" : "#dc2626" }}>
                      {tx.pnl >= 0 ? "+" : ""}{formatINR(tx.pnl)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)" }} onClick={() => setShowResetConfirm(false)}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 380, maxWidth: "90vw", boxShadow: "0 24px 60px rgba(0,0,0,.2)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e1b3a", margin: "0 0 8px" }}>Reset Portfolio?</h3>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px", lineHeight: 1.5 }}>This will delete all your holdings and transactions. You'll start fresh with new virtual capital.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowResetConfirm(false)} style={{ flex: 1, padding: "10px 16px", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e9e5f5", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
              <button onClick={() => { trading.resetPortfolio(trading.portfolio.startingCapital); setShowResetConfirm(false); }} style={{ flex: 1, padding: "10px 16px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Reset Everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
