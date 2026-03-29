import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import LoginModal from "./LoginModal";

const SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTke5GvwzNkNMr7rZKBChTDFJPjrQVCQB7k1b_GEQNk8KP0rHaXKF3E9TG2PhbxFg/pub?gid=1801034194&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQo9NjMnHRhnN1vAfM0cRrvv6IP7UR30CGxndhpY9PYXsr3ggfobMyhrKL4Y95JLw/pub?gid=1895357848&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7CYrXwr7nRLPEI6ZOMoPT7xvXrlGqrFh6H9oC0UC8f-pvBzbb3MQO1ccaHEVMyw/pub?gid=552844866&single=true&output=csv",
];

function parseCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    if (cl[0] && parseFloat(cl[4]) > 0) {
      data[cl[0]] = { symbol: cl[0], name: cl[1] || cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5]) || 0 };
    }
  }
  return data;
}

const CAPS = [100000, 500000, 1000000, 2500000, 5000000, 10000000];
const fmt = n => { if (!n) return "₹0"; const a = Math.abs(n); if (a >= 1e7) return `₹${(n/1e7).toFixed(2)} Cr`; if (a >= 1e5) return `₹${(n/1e5).toFixed(2)} L`; return `₹${n.toLocaleString("en-IN",{maximumFractionDigits:2})}`; };

export default function TradingPage() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [prices, setPrices] = useState({});
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pricesLoaded, setPricesLoaded] = useState(false);

  // Order state
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [orderType, setOrderType] = useState("buy"); // buy | sell
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [setupAmount, setSetupAmount] = useState(1000000);
  const [orderResult, setOrderResult] = useState(null);
  const [tab, setTab] = useState("positions"); // positions | history

  // Fetch prices
  useEffect(() => {
    async function fetchPrices() {
      try {
        const results = await Promise.allSettled(SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const merged = {};
        for (const r of results) if (r.status === "fulfilled") Object.assign(merged, parseCSV(r.value));
        if (Object.keys(merged).length > 0) { setPrices(merged); setPricesLoaded(true); }
      } catch (e) { console.error(e); }
    }
    fetchPrices();
    const iv = setInterval(fetchPrices, 180000);
    return () => clearInterval(iv);
  }, []);

  // Load portfolio
  useEffect(() => {
    if (!user) { setPortfolio(null); setLoading(false); return; }
    async function load() {
      try {
        const snap = await getDoc(doc(db, "mock_portfolios", user.uid));
        if (snap.exists()) setPortfolio(snap.data());
        const tq = query(collection(db, "mock_transactions"), where("userId", "==", user.uid), orderBy("timestamp", "desc"), limit(50));
        const ts = await getDocs(tq);
        setTransactions(ts.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [user]);

  async function createPortfolio(amount) {
    const p = { userId: user.uid, cash: amount, holdings: [], startingCapital: amount, createdAt: new Date().toISOString() };
    await setDoc(doc(db, "mock_portfolios", user.uid), p);
    setPortfolio(p);
  }

  async function executeTrade() {
    if (!portfolio || !quantity) return;
    const qty = parseInt(quantity);
    const stock = prices[selectedStock];
    if (!stock || qty <= 0) return;
    const price = stock.ltp;

    if (orderType === "buy") {
      const cost = qty * price;
      if (cost > portfolio.cash) { setOrderResult({ ok: false, msg: "Insufficient funds" }); return; }
      const holdings = [...portfolio.holdings];
      const existing = holdings.find(h => h.symbol === selectedStock);
      if (existing) { existing.avgPrice = ((existing.avgPrice * existing.qty) + cost) / (existing.qty + qty); existing.qty += qty; }
      else holdings.push({ symbol: selectedStock, qty, avgPrice: price, name: stock.name });
      const updated = { ...portfolio, cash: portfolio.cash - cost, holdings };
      await updateDoc(doc(db, "mock_portfolios", user.uid), { cash: updated.cash, holdings });
      const tx = { userId: user.uid, type: "BUY", symbol: selectedStock, quantity: qty, price, total: cost, timestamp: new Date().toISOString(), name: stock.name };
      const ref = await addDoc(collection(db, "mock_transactions"), tx);
      setTransactions(prev => [{ id: ref.id, ...tx }, ...prev]);
      setPortfolio(updated);
      setOrderResult({ ok: true, msg: `Bought ${qty} ${selectedStock} at ₹${price.toFixed(2)}` });
    } else {
      const holding = portfolio.holdings.find(h => h.symbol === selectedStock);
      if (!holding || qty > holding.qty) { setOrderResult({ ok: false, msg: `Only ${holding?.qty || 0} shares available` }); return; }
      const proceeds = qty * price;
      const pnl = (price - holding.avgPrice) * qty;
      const holdings = portfolio.holdings.map(h => h.symbol === selectedStock ? { ...h, qty: h.qty - qty } : h).filter(h => h.qty > 0);
      const updated = { ...portfolio, cash: portfolio.cash + proceeds, holdings };
      await updateDoc(doc(db, "mock_portfolios", user.uid), { cash: updated.cash, holdings });
      const tx = { userId: user.uid, type: "SELL", symbol: selectedStock, quantity: qty, price, total: proceeds, pnl, timestamp: new Date().toISOString(), name: holding.name };
      const ref = await addDoc(collection(db, "mock_transactions"), tx);
      setTransactions(prev => [{ id: ref.id, ...tx }, ...prev]);
      setPortfolio(updated);
      setOrderResult({ ok: true, msg: `Sold ${qty} ${selectedStock} — P&L: ${pnl >= 0 ? "+" : ""}${fmt(pnl)}` });
    }
    setQuantity("");
    setTimeout(() => setOrderResult(null), 3000);
  }

  // Not logged in
  if (!user) return (
    <div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>💹</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Mock Trading</div>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Practice with virtual money at real NSE prices</p>
        <button className="btn-primary" onClick={() => setShowLogin(true)} style={{ padding: "12px 32px", fontSize: 15 }}>Sign In to Start Trading</button>
      </div>
    </div>
  );

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>Loading portfolio...</div>;

  // Setup screen
  if (!portfolio) return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Set Up Virtual Portfolio</div>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Choose starting capital. You can reset anytime.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
        {CAPS.map(a => (
          <button key={a} onClick={() => setSetupAmount(a)} style={{
            padding: "14px", borderRadius: 10, cursor: "pointer",
            border: setupAmount === a ? "2px solid var(--green)" : "2px solid var(--border)",
            background: setupAmount === a ? "var(--green-dim)" : "var(--bg-card)",
            color: setupAmount === a ? "var(--green)" : "var(--text-secondary)",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700,
          }}>{fmt(a)}</button>
        ))}
      </div>
      <button className="btn-primary" onClick={() => createPortfolio(setupAmount)} style={{ padding: "12px 40px", fontSize: 15 }}>
        Start Trading with {fmt(setupAmount)}
      </button>
    </div>
  );

  // Main trading view
  const stock = prices[selectedStock] || { symbol: selectedStock, name: "", ltp: 0, change: 0 };
  const holdingsValue = portfolio.holdings.reduce((s, h) => s + h.qty * (prices[h.symbol]?.ltp || h.avgPrice), 0);
  const totalValue = portfolio.cash + holdingsValue;
  const totalPnL = totalValue - portfolio.startingCapital;
  const returnPct = (totalPnL / portfolio.startingCapital * 100).toFixed(2);
  const searchResults = search.length >= 2 ? Object.values(prices).filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6) : [];

  // Chart SVG (simulated price line)
  const chartPoints = Array.from({ length: 50 }, (_, i) => {
    const base = stock.ltp || 100;
    const noise = (Math.sin(i * 0.3) * base * 0.02) + (Math.random() - 0.5) * base * 0.01;
    return base + noise - (stock.change >= 0 ? base * 0.01 : -base * 0.01) * ((50 - i) / 50);
  });
  const minP = Math.min(...chartPoints), maxP = Math.max(...chartPoints);
  const chartPath = chartPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / 49) * 760} ${240 - ((p - minP) / (maxP - minP || 1)) * 220}`).join(" ");
  const areaPath = chartPath + ` L 760 240 L 0 240 Z`;

  return (
    <div>
      {/* Portfolio Balance Bar */}
      <div style={{
        background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10,
        padding: "14px 18px", marginBottom: 18, display: "flex", alignItems: "center", gap: 24,
      }}>
        <div><div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.8 }}>Portfolio Value</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "var(--green)", marginTop: 4 }}>{fmt(totalValue)}</div></div>
        <div style={{ width: 1, height: 36, background: "var(--border)" }} />
        <div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>Cash</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 600, marginTop: 2 }}>{fmt(portfolio.cash)}</div></div>
        <div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>Invested</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 600, marginTop: 2 }}>{fmt(holdingsValue)}</div></div>
        <div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>P&L</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, marginTop: 2, color: totalPnL >= 0 ? "var(--green)" : "var(--red)" }}>{totalPnL >= 0 ? "+" : ""}{fmt(totalPnL)} ({returnPct}%)</div></div>
      </div>

      {/* Trading Layout: Chart + Order Panel */}
      <div className="trading-layout">
        {/* Chart Container */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{stock.symbol}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{stock.name} · NSE</div>
              </div>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 24, fontWeight: 600 }}>₹{stock.ltp?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                <span style={{ fontSize: 14, fontWeight: 600, marginLeft: 8, color: stock.change >= 0 ? "var(--green)" : "var(--red)" }}>{stock.change >= 0 ? "+" : ""}{stock.change?.toFixed(2)}%</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {["1D", "1W", "1M", "3M", "1Y"].map((tf, i) => (
                <button key={tf} style={{
                  padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                  background: i === 0 ? "var(--green-dim)" : "none",
                  border: i === 0 ? "1px solid rgba(99,220,160,0.2)" : "1px solid transparent",
                  color: i === 0 ? "var(--green)" : "var(--text-muted)",
                  cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                }}>{tf}</button>
              ))}
            </div>
          </div>
          <div style={{ height: 300, padding: 20 }}>
            <svg viewBox="0 0 760 260" style={{ width: "100%", height: "100%" }}>
              {/* Grid lines */}
              {[0, 65, 130, 195, 260].map(y => <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="var(--chart-grid)" strokeWidth="1" />)}
              {/* Area fill */}
              <path d={areaPath} fill={stock.change >= 0 ? "url(#greenGrad)" : "url(#redGrad)"} />
              {/* Line */}
              <path d={chartPath} fill="none" stroke={stock.change >= 0 ? "var(--green)" : "var(--red)"} strokeWidth="2" />
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--green)" stopOpacity="0.15" /><stop offset="100%" stopColor="var(--green)" stopOpacity="0" /></linearGradient>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--red)" stopOpacity="0.15" /><stop offset="100%" stopColor="var(--red)" stopOpacity="0" /></linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Order Panel */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Place Order</div>

          {/* Stock search */}
          <div style={{ marginBottom: 16, position: "relative" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>Stock</div>
            <input type="text" value={search || selectedStock} placeholder="Search stock..."
              onChange={e => { setSearch(e.target.value); setShowResults(true); }}
              onFocus={() => { if (search) setShowResults(true); }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              style={{
                width: "100%", padding: "10px 14px", background: "var(--input-bg)",
                border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)",
                fontSize: 15, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, outline: "none",
              }}
            />
            {showResults && searchResults.length > 0 && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0, background: "var(--bg-card)",
                border: "1px solid var(--border)", borderRadius: 8, boxShadow: "var(--shadow-lg)", zIndex: 50, marginTop: 4, maxHeight: 200, overflowY: "auto",
              }}>
                {searchResults.map(s => (
                  <div key={s.symbol} onClick={() => { setSelectedStock(s.symbol); setSearch(""); setShowResults(false); setQuantity(""); setOrderResult(null); }}
                    style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", fontSize: 13 }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <span style={{ fontWeight: 600 }}>{s.symbol}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", color: s.change >= 0 ? "var(--green)" : "var(--red)" }}>₹{s.ltp?.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buy/Sell toggle */}
          <div style={{ display: "flex", gap: 4, marginBottom: 18, background: "var(--bg-secondary)", borderRadius: 8, padding: 3 }}>
            <button onClick={() => { setOrderType("buy"); setOrderResult(null); }} style={{
              flex: 1, padding: 9, border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              background: orderType === "buy" ? "var(--green-dim)" : "transparent",
              color: orderType === "buy" ? "var(--green)" : "var(--text-secondary)",
              fontFamily: "'DM Sans',sans-serif",
            }}>Buy</button>
            <button onClick={() => { setOrderType("sell"); setOrderResult(null); }} style={{
              flex: 1, padding: 9, border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              background: orderType === "sell" ? "var(--red-dim)" : "transparent",
              color: orderType === "sell" ? "var(--red)" : "var(--text-secondary)",
              fontFamily: "'DM Sans',sans-serif",
            }}>Sell</button>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>Quantity</div>
            <input type="number" value={quantity} onChange={e => { setQuantity(e.target.value); setOrderResult(null); }} placeholder="Shares"
              style={{
                width: "100%", padding: "10px 14px", background: "var(--input-bg)",
                border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)",
                fontSize: 15, fontFamily: "'JetBrains Mono',monospace", outline: "none",
              }}
            />
          </div>

          {/* Order Summary */}
          {parseInt(quantity) > 0 && stock.ltp > 0 && (
            <div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                <span style={{ color: "var(--text-muted)" }}>Price</span>
                <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>₹{stock.ltp?.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                <span style={{ color: "var(--text-muted)" }}>Qty</span>
                <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>{quantity}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)", margin: "6px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", color: orderType === "buy" ? "var(--green)" : "var(--red)" }}>
                  ₹{(parseInt(quantity) * stock.ltp).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}

          {/* Result */}
          {orderResult && (
            <div style={{
              padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, marginBottom: 12,
              background: orderResult.ok ? "var(--green-dim)" : "var(--red-dim)",
              color: orderResult.ok ? "var(--green)" : "var(--red)",
            }}>{orderResult.ok ? "✓ " : "⚠ "}{orderResult.msg}</div>
          )}

          {/* Execute button */}
          <button onClick={executeTrade} disabled={!parseInt(quantity) || !stock.ltp}
            style={{
              width: "100%", padding: 13, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
              cursor: parseInt(quantity) && stock.ltp ? "pointer" : "default",
              background: orderType === "buy" ? "var(--gradient-green)" : "linear-gradient(135deg, #f87171, #ef4444)",
              color: orderType === "buy" ? "var(--btn-text)" : "#fff",
              fontFamily: "'DM Sans',sans-serif", opacity: parseInt(quantity) && stock.ltp ? 1 : 0.4,
            }}>
            {orderType === "buy" ? `Buy ${selectedStock}` : `Sell ${selectedStock}`}
          </button>
        </div>
      </div>

      {/* Positions / History */}
      <div style={{ marginTop: 24 }}>
        <div className="tab-bar">
          <button className={`tab${tab === "positions" ? " active" : ""}`} onClick={() => setTab("positions")}>Positions ({portfolio.holdings.length})</button>
          <button className={`tab${tab === "history" ? " active" : ""}`} onClick={() => setTab("history")}>History ({transactions.length})</button>
        </div>

        {tab === "positions" && (
          portfolio.holdings.length === 0 ? (
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No positions yet. Search a stock and place your first trade!</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Stock</th><th>Qty</th><th>Avg Price</th><th>LTP</th><th>Current Value</th><th>P&L</th><th></th></tr></thead>
                <tbody>
                  {portfolio.holdings.map(h => {
                    const live = prices[h.symbol];
                    const ltp = live?.ltp || h.avgPrice;
                    const val = h.qty * ltp;
                    const pnl = val - (h.qty * h.avgPrice);
                    const pct = ((ltp - h.avgPrice) / h.avgPrice * 100).toFixed(2);
                    return (
                      <tr key={h.symbol}>
                        <td><span style={{ fontWeight: 600 }}>{h.symbol}</span><br /><span style={{ fontSize: 11, color: "var(--text-muted)" }}>{h.name}</span></td>
                        <td style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{h.qty}</td>
                        <td style={{ fontFamily: "'JetBrains Mono',monospace" }}>₹{h.avgPrice.toFixed(2)}</td>
                        <td style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>₹{ltp.toFixed(2)}</td>
                        <td style={{ fontFamily: "'JetBrains Mono',monospace" }}>{fmt(val)}</td>
                        <td>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: pnl >= 0 ? "var(--green)" : "var(--red)" }}>
                            {pnl >= 0 ? "+" : ""}{fmt(pnl)}
                          </span>
                          <span style={{ fontSize: 11, color: pnl >= 0 ? "var(--green)" : "var(--red)", marginLeft: 6 }}>({pct}%)</span>
                        </td>
                        <td>
                          <button onClick={() => { setSelectedStock(h.symbol); setOrderType("sell"); setSearch(""); setQuantity(String(h.qty)); window.scrollTo(0, 0); }}
                            style={{ padding: "4px 12px", borderRadius: 6, background: "var(--red-dim)", color: "var(--red)", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sell</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}

        {tab === "history" && (
          transactions.length === 0 ? (
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No transactions yet</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Type</th><th>Stock</th><th>Qty</th><th>Price</th><th>Total</th><th>P&L</th><th>Date</th></tr></thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id}>
                      <td><span style={{
                        fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6,
                        background: tx.type === "BUY" ? "var(--green-dim)" : "var(--red-dim)",
                        color: tx.type === "BUY" ? "var(--green)" : "var(--red)",
                      }}>{tx.type}</span></td>
                      <td style={{ fontWeight: 600 }}>{tx.symbol}</td>
                      <td style={{ fontFamily: "'JetBrains Mono',monospace" }}>{tx.quantity}</td>
                      <td style={{ fontFamily: "'JetBrains Mono',monospace" }}>₹{tx.price?.toFixed(2)}</td>
                      <td style={{ fontFamily: "'JetBrains Mono',monospace" }}>{fmt(tx.total)}</td>
                      <td>{tx.pnl !== undefined ? <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: tx.pnl >= 0 ? "var(--green)" : "var(--red)" }}>{tx.pnl >= 0 ? "+" : ""}{fmt(tx.pnl)}</span> : "—"}</td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(tx.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
