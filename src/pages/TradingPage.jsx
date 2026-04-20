import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import TradingChart from "../components/TradingChart";
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
    if (cl[0] && parseFloat(cl[4]) > 0) data[cl[0]] = { symbol: cl[0], name: cl[1] || cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5]) || 0, prevClose: parseFloat(cl[3]) || parseFloat(cl[4]) };
  }
  return data;
}

const CAPS = [100000, 500000, 1000000, 2500000, 5000000, 10000000];
const fmt = n => { if (!n && n !== 0) return "₹0"; const a = Math.abs(n); if (a >= 1e7) return `₹${(n/1e7).toFixed(2)} Cr`; if (a >= 1e5) return `₹${(n/1e5).toFixed(2)} L`; return `₹${n.toLocaleString("en-IN",{maximumFractionDigits:2})}`; };
const QTY_BUTTONS = [1, 5, 10, 25, 50];
const PIE_COLORS = ["#63dca0","#60a5fa","#fbbf24","#a78bfa","#f97316","#22d3ee","#f87171","#34d399","#e879f9","#fb923c"];

// IST market hours — uses toLocaleString for reliable IST
function getISTNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
}

function isMarketOpen() {
  const ist = getISTNow();
  const day = ist.getDay();
  const mins = ist.getHours() * 60 + ist.getMinutes();
  if (day === 0 || day === 6) return false;
  return mins >= 555 && mins <= 930;
}

function getMarketStatus() {
  const ist = getISTNow();
  const day = ist.getDay();
  const mins = ist.getHours() * 60 + ist.getMinutes();
  if (day === 0 || day === 6) return { open: false, text: "Markets Closed (Weekend)", nextOpen: "Monday 9:15 AM" };
  if (mins < 555) return { open: false, text: "Pre-Market", nextOpen: "Opens at 9:15 AM IST" };
  if (mins > 930) return { open: false, text: "Markets Closed", nextOpen: "Opens tomorrow 9:15 AM IST" };
  return { open: true, text: "Markets Open", nextOpen: "" };
}

export default function TradingPage() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [prices, setPrices] = useState({});
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [orderSide, setOrderSide] = useState("buy");
  const [orderMode, setOrderMode] = useState("market");
  const [quantity, setQuantity] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [slPrice, setSlPrice] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [setupAmount, setSetupAmount] = useState(1000000);
  const [orderResult, setOrderResult] = useState(null);
  const [tab, setTab] = useState("positions");
  const [showConfirm, setShowConfirm] = useState(false);
  const [marketStatus, setMarketStatus] = useState(getMarketStatus());

  // Update market status every minute
  useEffect(() => { const iv = setInterval(() => setMarketStatus(getMarketStatus()), 60000); return () => clearInterval(iv); }, []);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const results = await Promise.allSettled(SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const merged = {};
        for (const r of results) if (r.status === "fulfilled") Object.assign(merged, parseCSV(r.value));
        if (Object.keys(merged).length > 0) setPrices(merged);
      } catch (e) { console.error(e); }
    }
    fetchPrices();
    const iv = setInterval(fetchPrices, 60000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!user) { setPortfolio(null); setLoading(false); return; }
    async function load() {
      try {
        const snap = await getDoc(doc(db, "mock_portfolios", user.uid));
        if (snap.exists()) setPortfolio(snap.data());
        const tq = query(collection(db, "mock_transactions"), where("userId", "==", user.uid), orderBy("timestamp", "desc"), limit(100));
        const ts = await getDocs(tq);
        setTransactions(ts.docs.map(d => ({ id: d.id, ...d.data() })));
        const pq = query(collection(db, "mock_pending_orders"), where("userId", "==", user.uid), where("status", "==", "pending"));
        const ps = await getDocs(pq);
        setPendingOrders(ps.docs.map(d => ({ id: d.id, ...d.data() })));
        const wSnap = await getDoc(doc(db, "mock_watchlists", user.uid));
        if (wSnap.exists()) setWatchlist(wSnap.data().symbols || []);
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [user]);

  useEffect(() => {
    if (!portfolio || Object.keys(prices).length === 0 || pendingOrders.length === 0) return;
    if (!isMarketOpen()) return; // Only auto-execute during market hours
    pendingOrders.forEach(async (order) => {
      const stock = prices[order.symbol];
      if (!stock) return;
      let shouldExecute = false;
      if (order.orderMode === "limit" || order.orderMode === "bracket") {
        if (order.orderSide === "buy" && stock.ltp <= order.triggerPrice) shouldExecute = true;
        if (order.orderSide === "sell" && stock.ltp >= order.triggerPrice) shouldExecute = true;
      } else if (order.orderMode === "stoploss") {
        if (order.orderSide === "sell" && stock.ltp <= order.triggerPrice) shouldExecute = true;
        if (order.orderSide === "buy" && stock.ltp >= order.triggerPrice) shouldExecute = true;
      }
      if (order.slTrigger && stock.ltp <= order.slTrigger) shouldExecute = true;
      if (order.targetTrigger && stock.ltp >= order.targetTrigger) shouldExecute = true;
      if (shouldExecute) {
        await executeTradeInternal(order.symbol, order.orderSide, order.quantity, stock.ltp, stock.name, order.orderMode);
        await updateDoc(doc(db, "mock_pending_orders", order.id), { status: "executed", executedAt: new Date().toISOString(), executedPrice: stock.ltp });
        setPendingOrders(prev => prev.filter(p => p.id !== order.id));
      }
    });
  }, [prices, pendingOrders]);

  async function createPortfolio(amount) {
    const p = { userId: user.uid, cash: amount, holdings: [], startingCapital: amount, createdAt: new Date().toISOString() };
    await setDoc(doc(db, "mock_portfolios", user.uid), p);
    setPortfolio(p);
  }

  async function toggleWatchlist(sym) {
    const updated = watchlist.includes(sym) ? watchlist.filter(s => s !== sym) : [...watchlist, sym];
    setWatchlist(updated);
    await setDoc(doc(db, "mock_watchlists", user.uid), { userId: user.uid, symbols: updated }, { merge: true });
  }

  async function executeTradeInternal(symbol, side, qty, price, stockName, mode) {
    if (!portfolio) return null;
    if (side === "buy") {
      const cost = qty * price;
      if (cost > portfolio.cash) return null;
      const holdings = [...portfolio.holdings];
      const existing = holdings.find(h => h.symbol === symbol);
      if (existing) { existing.avgPrice = ((existing.avgPrice * existing.qty) + cost) / (existing.qty + qty); existing.qty += qty; }
      else holdings.push({ symbol, qty, avgPrice: price, name: stockName });
      const updated = { ...portfolio, cash: portfolio.cash - cost, holdings };
      await updateDoc(doc(db, "mock_portfolios", user.uid), { cash: updated.cash, holdings });
      const tx = { userId: user.uid, type: "BUY", symbol, quantity: qty, price, total: cost, orderMode: mode, timestamp: new Date().toISOString(), name: stockName };
      const ref = await addDoc(collection(db, "mock_transactions"), tx);
      setTransactions(prev => [{ id: ref.id, ...tx }, ...prev]);
      setPortfolio(updated);
      return { ok: true, msg: `Bought ${qty} ${symbol} at ₹${price.toFixed(2)}` };
    } else {
      const holding = portfolio.holdings.find(h => h.symbol === symbol);
      if (!holding || qty > holding.qty) return null;
      const proceeds = qty * price;
      const pnl = (price - holding.avgPrice) * qty;
      const holdings = portfolio.holdings.map(h => h.symbol === symbol ? { ...h, qty: h.qty - qty } : h).filter(h => h.qty > 0);
      const updated = { ...portfolio, cash: portfolio.cash + proceeds, holdings };
      await updateDoc(doc(db, "mock_portfolios", user.uid), { cash: updated.cash, holdings });
      const tx = { userId: user.uid, type: "SELL", symbol, quantity: qty, price, total: proceeds, pnl, orderMode: mode, timestamp: new Date().toISOString(), name: holding.name };
      const ref = await addDoc(collection(db, "mock_transactions"), tx);
      setTransactions(prev => [{ id: ref.id, ...tx }, ...prev]);
      setPortfolio(updated);
      return { ok: true, msg: `Sold ${qty} ${symbol} — P&L: ${pnl >= 0 ? "+" : ""}${fmt(pnl)}` };
    }
  }

  async function executeTrade() {
    setShowConfirm(false);
    if (!portfolio || !quantity) return;
    const qty = parseInt(quantity);
    const stock = prices[selectedStock];
    if (!stock || qty <= 0) return;

    // Market hours check for market orders
    if (orderMode === "market" && !isMarketOpen()) {
      setOrderResult({ ok: false, msg: "Market is closed. Trading hours: 9:15 AM – 3:30 PM IST (Mon–Fri)" });
      return;
    }

    if (orderMode === "market") {
      const result = await executeTradeInternal(selectedStock, orderSide, qty, stock.ltp, stock.name, "market");
      setOrderResult(result || { ok: false, msg: orderSide === "buy" ? "Insufficient funds" : "Not enough shares" });
    } else {
      // Limit/SL/Bracket orders can be placed anytime — they execute when conditions are met during market hours
      const triggerPrice = parseFloat(orderMode === "bracket" ? limitPrice : (orderMode === "limit" ? limitPrice : slPrice));
      if (!triggerPrice || triggerPrice <= 0) { setOrderResult({ ok: false, msg: "Enter a valid price" }); return; }
      const order = { userId: user.uid, symbol: selectedStock, name: stock.name, orderSide, orderMode, quantity: qty, triggerPrice, status: "pending", createdAt: new Date().toISOString() };
      if (orderMode === "bracket") { order.slTrigger = parseFloat(slPrice) || 0; order.targetTrigger = parseFloat(targetPrice) || 0; }
      const ref = await addDoc(collection(db, "mock_pending_orders"), order);
      setPendingOrders(prev => [...prev, { id: ref.id, ...order }]);
      const labels = { limit: "Limit", stoploss: "Stop-Loss", bracket: "Bracket" };
      setOrderResult({ ok: true, msg: `${labels[orderMode]} order placed: ${orderSide.toUpperCase()} ${qty} ${selectedStock} at ₹${triggerPrice.toFixed(2)}${!isMarketOpen() ? " (will execute when market opens)" : ""}` });
    }
    setQuantity(""); setLimitPrice(""); setSlPrice(""); setTargetPrice("");
    setTimeout(() => setOrderResult(null), 4000);
  }

  async function cancelPendingOrder(orderId) {
    await updateDoc(doc(db, "mock_pending_orders", orderId), { status: "cancelled", cancelledAt: new Date().toISOString() });
    setPendingOrders(prev => prev.filter(p => p.id !== orderId));
  }

  const analytics = useMemo(() => {
    const sells = transactions.filter(t => t.type === "SELL" && t.pnl !== undefined);
    if (sells.length === 0) return null;
    const wins = sells.filter(t => t.pnl > 0);
    const losses = sells.filter(t => t.pnl <= 0);
    const avgGain = wins.length > 0 ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
    const avgLoss = losses.length > 0 ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;
    const best = sells.reduce((a, b) => (a.pnl || 0) > (b.pnl || 0) ? a : b);
    const worst = sells.reduce((a, b) => (a.pnl || 0) < (b.pnl || 0) ? a : b);
    return { totalTrades: sells.length, wins: wins.length, losses: losses.length, winRate: Math.round(wins.length / sells.length * 100), avgGain, avgLoss, best, worst };
  }, [transactions]);

  if (!user) return (<div>{showLogin && <LoginModal onClose={() => setShowLogin(false)} />}<div style={{ textAlign: "center", padding: "80px 20px" }}><div style={{ fontSize: 56, marginBottom: 16 }}>💹</div><div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Mock Trading</div><p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Practice with virtual money at real NSE prices</p><button className="btn-primary" onClick={() => setShowLogin(true)} style={{ padding: "12px 32px", fontSize: 15 }}>Sign In to Start Trading</button></div></div>);
  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>Loading portfolio...</div>;
  if (!portfolio) return (<div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div><div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Set Up Virtual Portfolio</div><p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Choose starting capital.</p><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>{CAPS.map(a => (<button key={a} onClick={() => setSetupAmount(a)} style={{ padding: "14px", borderRadius: 10, cursor: "pointer", border: setupAmount === a ? "2px solid var(--green)" : "2px solid var(--border)", background: setupAmount === a ? "var(--green-dim)" : "var(--bg-card)", color: setupAmount === a ? "var(--green)" : "var(--text-secondary)", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700 }}>{fmt(a)}</button>))}</div><button className="btn-primary" onClick={() => createPortfolio(setupAmount)} style={{ padding: "12px 40px", fontSize: 15 }}>Start Trading with {fmt(setupAmount)}</button></div>);

  const stock = prices[selectedStock] || { symbol: selectedStock, name: "", ltp: 0, change: 0, prevClose: 0 };
  const holdingsValue = portfolio.holdings.reduce((s, h) => s + h.qty * (prices[h.symbol]?.ltp || h.avgPrice), 0);
  const investedValue = portfolio.holdings.reduce((s, h) => s + h.qty * h.avgPrice, 0);
  const totalValue = portfolio.cash + holdingsValue;
  const totalPnL = totalValue - portfolio.startingCapital;
  const returnPct = (totalPnL / portfolio.startingCapital * 100).toFixed(2);
  const dayPnL = portfolio.holdings.reduce((s, h) => { const p = prices[h.symbol]; if (!p) return s; return s + (p.ltp - (p.prevClose || p.ltp)) * h.qty; }, 0);
  const showDropdown = searchFocused && (search.length >= 1 || watchlist.length > 0);
  const searchResults = search.length >= 1 ? Object.values(prices).filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => { const ae = a.symbol.toLowerCase() === search.toLowerCase() ? 0 : 1; const be = b.symbol.toLowerCase() === search.toLowerCase() ? 0 : 1; return ae - be || a.symbol.localeCompare(b.symbol); }).slice(0, 8) : [];
  const execPrice = orderMode === "limit" || orderMode === "bracket" ? (parseFloat(limitPrice) || stock.ltp) : stock.ltp;
  const maxQty = orderSide === "buy" ? (execPrice > 0 ? Math.floor(portfolio.cash / execPrice) : 0) : (portfolio.holdings.find(h => h.symbol === selectedStock)?.qty || 0);
  const confirmQty = parseInt(quantity) || 0;
  const confirmPrice = orderMode === "market" ? stock.ltp : parseFloat(orderMode === "stoploss" ? slPrice : limitPrice) || 0;
  const confirmTotal = confirmQty * (orderMode === "market" ? stock.ltp : confirmPrice);
  const isInWatchlist = watchlist.includes(selectedStock);
  const pieData = portfolio.holdings.map((h, i) => ({ symbol: h.symbol, value: h.qty * (prices[h.symbol]?.ltp || h.avgPrice), color: PIE_COLORS[i % PIE_COLORS.length] }));
  const pieTotal = pieData.reduce((s, d) => s + d.value, 0);
  const S = { mono: { fontFamily: "'JetBrains Mono',monospace" }, label: { fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }, input: { width: "100%", padding: "10px 14px", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 15, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, outline: "none" } };

  return (
    <div>
      {/* Market Status Banner */}
      {!marketStatus.open && (
        <div style={{ background: "var(--amber-dim)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 8, padding: "8px 16px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--amber)", fontWeight: 600 }}>🔴 {marketStatus.text}</span>
          <span style={{ color: "var(--amber)", fontSize: 11 }}>{marketStatus.nextOpen}</span>
        </div>
      )}

      {/* Portfolio Summary */}
      <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.8 }}>Portfolio Value</div><div style={{ ...S.mono, fontSize: 20, fontWeight: 700, color: "var(--green)", marginTop: 2 }}>{fmt(totalValue)}</div></div>
        <div style={{ width: 1, height: 32, background: "var(--border)" }} />
        <div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Invested</div><div style={{ ...S.mono, fontSize: 15, fontWeight: 600, marginTop: 2 }}>{fmt(investedValue)}</div></div>
        <div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Cash</div><div style={{ ...S.mono, fontSize: 15, fontWeight: 600, marginTop: 2 }}>{fmt(portfolio.cash)}</div></div>
        <div style={{ width: 1, height: 32, background: "var(--border)" }} />
        <div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Day P&L</div><div style={{ ...S.mono, fontSize: 15, fontWeight: 700, marginTop: 2, color: dayPnL >= 0 ? "var(--green)" : "var(--red)" }}>{dayPnL >= 0 ? "+" : ""}{fmt(dayPnL)}</div></div>
        <div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Overall P&L</div><div style={{ ...S.mono, fontSize: 15, fontWeight: 700, marginTop: 2, color: totalPnL >= 0 ? "var(--green)" : "var(--red)" }}>{totalPnL >= 0 ? "+" : ""}{fmt(totalPnL)} <span style={{ fontSize: 11, opacity: 0.8 }}>({returnPct}%)</span></div></div>
      </div>

      <div className="trading-layout">
        <TradingChart symbol={selectedStock} ltp={stock.ltp} changePercent={stock.change} />
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Place Order</div>
            <div style={{ ...S.mono, fontSize: 12, color: "var(--text-muted)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6 }}>Cash: {fmt(portfolio.cash)}</div>
          </div>

          {/* Stock Search — Fully Clearable */}
          <div style={{ marginBottom: 14, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={S.label}>Stock</div>
              <button onClick={() => toggleWatchlist(selectedStock)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: 0 }}>{isInWatchlist ? "⭐" : "☆"}</button>
            </div>
            <div style={{ position: "relative" }}>
              <input type="text" value={search}
                placeholder={`Search... (current: ${selectedStock})`}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                style={{ ...S.input, paddingRight: search ? 70 : 14 }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "var(--surface)", border: "none", borderRadius: 4, color: "var(--text-muted)", cursor: "pointer", fontSize: 11, padding: "2px 8px", fontFamily: "inherit" }}>Clear</button>
              )}
            </div>
            {/* Selected stock info below search */}
            {!searchFocused && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, padding: "6px 10px", background: "var(--bg-secondary)", borderRadius: 6 }}>
                <div><span style={{ fontWeight: 700, fontSize: 14 }}>{selectedStock}</span><span style={{ color: "var(--text-muted)", fontSize: 11, marginLeft: 6 }}>{stock.name}</span></div>
                <div style={{ textAlign: "right" }}><span style={{ ...S.mono, fontSize: 14, fontWeight: 600 }}>₹{stock.ltp?.toFixed(2)}</span><span style={{ fontSize: 11, fontWeight: 600, marginLeft: 6, color: stock.change >= 0 ? "var(--green)" : "var(--red)" }}>{stock.change >= 0 ? "+" : ""}{stock.change?.toFixed(2)}%</span></div>
              </div>
            )}
            {/* Dropdown */}
            {showDropdown && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.4)", zIndex: 50, marginTop: 4, maxHeight: 320, overflowY: "auto" }}>
                {!search && watchlist.length > 0 && (<div><div style={{ padding: "8px 14px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.8, borderBottom: "1px solid var(--border)" }}>⭐ Watchlist</div>{watchlist.map(sym => { const s = prices[sym]; if (!s) return null; return (<div key={sym} onMouseDown={() => { setSelectedStock(sym); setSearch(""); setQuantity(""); setOrderResult(null); }} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }} onMouseEnter={e => e.currentTarget.style.background="var(--hover-bg)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}><div><div style={{ fontWeight: 700, fontSize: 13 }}>{s.symbol}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.name}</div></div><div style={{ textAlign: "right" }}><div style={{ ...S.mono, fontSize: 13, fontWeight: 600 }}>₹{s.ltp?.toFixed(2)}</div><div style={{ fontSize: 11, fontWeight: 600, color: s.change >= 0 ? "var(--green)" : "var(--red)" }}>{s.change >= 0 ? "+" : ""}{s.change?.toFixed(2)}%</div></div></div>); })}</div>)}
                {search && searchResults.length > 0 && (<div><div style={{ padding: "8px 14px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.8, borderBottom: "1px solid var(--border)" }}>Results</div>{searchResults.map(s => (<div key={s.symbol} onMouseDown={() => { setSelectedStock(s.symbol); setSearch(""); setQuantity(""); setOrderResult(null); }} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }} onMouseEnter={e => e.currentTarget.style.background="var(--hover-bg)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}><div><div style={{ fontWeight: 700, fontSize: 13 }}>{s.symbol} {watchlist.includes(s.symbol) && <span style={{ fontSize: 10 }}>⭐</span>}</div><div style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div></div><div style={{ textAlign: "right" }}><div style={{ ...S.mono, fontSize: 13, fontWeight: 600 }}>₹{s.ltp?.toFixed(2)}</div><div style={{ fontSize: 11, fontWeight: 600, color: s.change >= 0 ? "var(--green)" : "var(--red)" }}>{s.change >= 0 ? "+" : ""}{s.change?.toFixed(2)}%</div></div></div>))}</div>)}
                {search && searchResults.length === 0 && <div style={{ padding: 16, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>No stocks found for "{search}"</div>}
                {!search && watchlist.length === 0 && <div style={{ padding: 16, textAlign: "center", color: "var(--text-muted)", fontSize: 12 }}>Type to search or add stocks to watchlist with ⭐</div>}
              </div>
            )}
          </div>

          {/* Buy / Sell */}
          <div style={{ display: "flex", gap: 4, marginBottom: 14, background: "var(--bg-secondary)", borderRadius: 8, padding: 3 }}>{["buy", "sell"].map(side => (<button key={side} onClick={() => { setOrderSide(side); setOrderResult(null); }} style={{ flex: 1, padding: 8, border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", background: orderSide === side ? (side === "buy" ? "var(--green-dim)" : "var(--red-dim)") : "transparent", color: orderSide === side ? (side === "buy" ? "var(--green)" : "var(--red)") : "var(--text-secondary)", fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", letterSpacing: 0.5 }}>{side}</button>))}</div>

          {/* Order type */}
          <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{[{ key: "market", label: "Market" }, { key: "limit", label: "Limit" }, { key: "stoploss", label: "SL" }, { key: "bracket", label: "Bracket" }].map(m => (<button key={m.key} onClick={() => { setOrderMode(m.key); setOrderResult(null); }} style={{ flex: 1, padding: "6px 2px", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: orderMode === m.key ? "var(--blue-dim)" : "transparent", border: `1px solid ${orderMode === m.key ? "rgba(96,165,250,0.3)" : "var(--border)"}`, color: orderMode === m.key ? "var(--blue)" : "var(--text-muted)" }}>{m.label}</button>))}</div>

          {(orderMode === "limit" || orderMode === "bracket") && (<div style={{ marginBottom: 12 }}><div style={S.label}>{orderMode === "bracket" ? "Entry Price" : "Limit Price"}</div><input type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder={`₹${stock.ltp?.toFixed(2)}`} style={S.input} /></div>)}
          {(orderMode === "stoploss" || orderMode === "bracket") && (<div style={{ marginBottom: 12 }}><div style={S.label}>Stop-Loss Price</div><input type="number" value={slPrice} onChange={e => setSlPrice(e.target.value)} placeholder={`₹${(stock.ltp * 0.95)?.toFixed(2)}`} style={S.input} /></div>)}
          {orderMode === "bracket" && (<div style={{ marginBottom: 12 }}><div style={S.label}>Target Price</div><input type="number" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} placeholder={`₹${(stock.ltp * 1.05)?.toFixed(2)}`} style={S.input} /></div>)}

          <div style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={S.label}>Quantity</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Max: <span style={{ ...S.mono, color: "var(--blue)", cursor: "pointer" }} onClick={() => setQuantity(String(maxQty))}>{maxQty}</span></div></div><input type="number" value={quantity} onChange={e => { setQuantity(e.target.value); setOrderResult(null); }} placeholder="Shares" style={S.input} /><div style={{ display: "flex", gap: 4, marginTop: 8 }}>{QTY_BUTTONS.map(q => (<button key={q} onClick={() => setQuantity(String(q))} style={{ flex: 1, padding: "5px 2px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", background: parseInt(quantity) === q ? "var(--green-dim)" : "var(--surface)", border: `1px solid ${parseInt(quantity) === q ? "var(--green)" : "var(--border)"}`, color: parseInt(quantity) === q ? "var(--green)" : "var(--text-muted)" }}>{q}</button>))}<button onClick={() => setQuantity(String(maxQty))} style={{ flex: 1, padding: "5px 2px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: parseInt(quantity) === maxQty && maxQty > 0 ? "var(--blue-dim)" : "var(--surface)", border: `1px solid ${parseInt(quantity) === maxQty && maxQty > 0 ? "var(--blue)" : "var(--border)"}`, color: parseInt(quantity) === maxQty && maxQty > 0 ? "var(--blue)" : "var(--text-muted)" }}>MAX</button></div></div>

          {confirmQty > 0 && stock.ltp > 0 && (<div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13 }}><div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span style={{ color: "var(--text-muted)" }}>Price</span><span style={{ fontWeight: 600, ...S.mono }}>{orderMode === "market" ? `₹${stock.ltp?.toFixed(2)}` : `₹${confirmPrice.toFixed(2)} (${orderMode})`}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span style={{ color: "var(--text-muted)" }}>Qty</span><span style={{ fontWeight: 600, ...S.mono }}>{quantity}</span></div><div style={{ height: 1, background: "var(--border)", margin: "5px 0" }} /><div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}><span>Total</span><span style={{ ...S.mono, color: orderSide === "buy" ? "var(--green)" : "var(--red)" }}>₹{confirmTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>{orderSide === "buy" && confirmTotal <= portfolio.cash && <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>Remaining: {fmt(portfolio.cash - confirmTotal)}</div>}</div>)}
          {orderResult && (<div style={{ padding: "9px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, marginBottom: 12, background: orderResult.ok ? "var(--green-dim)" : "var(--red-dim)", color: orderResult.ok ? "var(--green)" : "var(--red)" }}>{orderResult.ok ? "✓ " : "⚠ "}{orderResult.msg}</div>)}
          <button onClick={() => { if (!confirmQty || !stock.ltp) return; if (orderMode !== "market" && !confirmPrice) { setOrderResult({ ok: false, msg: "Enter price" }); return; } if (orderSide === "buy" && orderMode === "market" && confirmTotal > portfolio.cash) { setOrderResult({ ok: false, msg: "Insufficient funds" }); return; } if (orderSide === "sell") { const h = portfolio.holdings.find(h => h.symbol === selectedStock); if (!h || confirmQty > h.qty) { setOrderResult({ ok: false, msg: `Only ${h?.qty || 0} shares` }); return; } } setShowConfirm(true); }} disabled={!confirmQty || !stock.ltp} style={{ width: "100%", padding: 12, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: confirmQty && stock.ltp ? "pointer" : "default", background: orderSide === "buy" ? "var(--gradient-green)" : "linear-gradient(135deg, #f87171, #ef4444)", color: orderSide === "buy" ? "var(--btn-text)" : "#fff", fontFamily: "'DM Sans',sans-serif", opacity: confirmQty && stock.ltp ? 1 : 0.4 }}>{orderSide === "buy" ? `Buy ${selectedStock}` : `Sell ${selectedStock}`}</button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowConfirm(false)}><div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, maxWidth: 400, width: "100%" }}><div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Confirm Order</div>{!marketStatus.open && orderMode === "market" && (<div style={{ background: "var(--red-dim)", color: "var(--red)", padding: "8px 12px", borderRadius: 8, fontSize: 12, marginBottom: 14 }}>⚠ Market is closed. This order cannot be executed now.</div>)}<div style={{ background: "var(--bg-secondary)", borderRadius: 10, padding: 16, marginBottom: 20 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Action</span><span style={{ fontWeight: 700, fontSize: 14, color: orderSide === "buy" ? "var(--green)" : "var(--red)", textTransform: "uppercase" }}>{orderSide} · {orderMode}</span></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Stock</span><span style={{ fontWeight: 600 }}>{selectedStock}</span></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Qty</span><span style={{ fontWeight: 600, ...S.mono }}>{quantity}</span></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Price</span><span style={{ fontWeight: 600, ...S.mono }}>₹{confirmPrice.toFixed(2)}</span></div><div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} /><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700, fontSize: 15 }}>Total</span><span style={{ fontWeight: 700, ...S.mono, fontSize: 18, color: orderSide === "buy" ? "var(--green)" : "var(--red)" }}>₹{confirmTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div></div><div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 600, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Cancel</button><button onClick={executeTrade} style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: orderSide === "buy" ? "var(--gradient-green)" : "linear-gradient(135deg, #f87171, #ef4444)", color: orderSide === "buy" ? "var(--btn-text)" : "#fff" }}>Confirm</button></div></div></div>)}

      {/* Portfolio Allocation + Analytics */}
      {(portfolio.holdings.length > 0 || analytics) && (<div style={{ display: "grid", gridTemplateColumns: portfolio.holdings.length > 0 && analytics ? "1fr 1fr" : "1fr", gap: 16, marginTop: 20 }}>{portfolio.holdings.length > 0 && (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Portfolio Allocation</div><div style={{ display: "flex", alignItems: "center", gap: 20 }}><svg viewBox="0 0 120 120" style={{ width: 120, height: 120, flexShrink: 0 }}>{(() => { let cum = 0; return pieData.map((d, i) => { const pct = pieTotal > 0 ? d.value / pieTotal : 0; const angle = pct * 360; const sa = cum; cum += angle; if (pct === 0) return null; if (pct >= 0.999) return <circle key={i} cx="60" cy="60" r="50" fill={d.color} />; const s = (sa - 90) * Math.PI / 180; const e = (sa + angle - 90) * Math.PI / 180; const large = angle > 180 ? 1 : 0; return <path key={i} d={`M60,60 L${60+50*Math.cos(s)},${60+50*Math.sin(s)} A50,50 0 ${large},1 ${60+50*Math.cos(e)},${60+50*Math.sin(e)} Z`} fill={d.color} />; }); })()}<circle cx="60" cy="60" r="30" fill="var(--bg-card)" /><text x="60" y="57" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono',monospace">{portfolio.holdings.length}</text><text x="60" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">stocks</text></svg><div style={{ flex: 1 }}>{pieData.map((d, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 12 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} /><span style={{ fontWeight: 600, flex: 1 }}>{d.symbol}</span><span style={{ ...S.mono, color: "var(--text-muted)" }}>{pieTotal > 0 ? Math.round(d.value / pieTotal * 100) : 0}%</span></div>))}</div></div></div>)}{analytics && (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Performance Analytics</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}><div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ ...S.mono, fontSize: 20, fontWeight: 700 }}>{analytics.totalTrades}</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Total Trades</div></div><div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ ...S.mono, fontSize: 20, fontWeight: 700, color: analytics.winRate >= 50 ? "var(--green)" : "var(--red)" }}>{analytics.winRate}%</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Win Rate</div></div><div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ ...S.mono, fontSize: 16, fontWeight: 700, color: "var(--green)" }}>{fmt(analytics.avgGain)}</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Avg Win</div></div><div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ ...S.mono, fontSize: 16, fontWeight: 700, color: "var(--red)" }}>{fmt(analytics.avgLoss)}</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Avg Loss</div></div></div><div style={{ marginTop: 10, display: "flex", gap: 8 }}><div style={{ flex: 1, padding: "8px 10px", borderRadius: 6, background: "var(--green-dim)", fontSize: 11 }}><div style={{ fontWeight: 700, color: "var(--green)" }}>Best</div><div style={{ color: "var(--green)", ...S.mono }}>{analytics.best.symbol} +{fmt(analytics.best.pnl)}</div></div><div style={{ flex: 1, padding: "8px 10px", borderRadius: 6, background: "var(--red-dim)", fontSize: 11 }}><div style={{ fontWeight: 700, color: "var(--red)" }}>Worst</div><div style={{ color: "var(--red)", ...S.mono }}>{analytics.worst.symbol} {fmt(analytics.worst.pnl)}</div></div></div></div>)}</div>)}

      {/* Tabs */}
      <div style={{ marginTop: 24 }}>
        <div className="tab-bar"><button className={`tab${tab === "positions" ? " active" : ""}`} onClick={() => setTab("positions")}>Positions ({portfolio.holdings.length})</button><button className={`tab${tab === "orders" ? " active" : ""}`} onClick={() => setTab("orders")}>Open Orders ({pendingOrders.length})</button><button className={`tab${tab === "history" ? " active" : ""}`} onClick={() => setTab("history")}>History ({transactions.length})</button></div>

        {tab === "positions" && (portfolio.holdings.length === 0 ? (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No positions yet. Search a stock and place your first trade!</div>) : (<div className="table-wrap"><table><thead><tr><th>Stock</th><th>Qty</th><th>Avg</th><th>LTP</th><th>Invested</th><th>Current</th><th>Day P&L</th><th>Overall P&L</th><th></th></tr></thead><tbody>{portfolio.holdings.map(h => { const p = prices[h.symbol]; const ltp = p?.ltp || h.avgPrice; const prevClose = p?.prevClose || ltp; const invested = h.qty * h.avgPrice; const current = h.qty * ltp; const overallPnl = current - invested; const overallPct = ((ltp - h.avgPrice) / h.avgPrice * 100).toFixed(2); const dayChange = (ltp - prevClose) * h.qty; return (<tr key={h.symbol}><td><span style={{ fontWeight: 600 }}>{h.symbol}</span><br /><span style={{ fontSize: 11, color: "var(--text-muted)" }}>{h.name}</span></td><td style={{ ...S.mono, fontWeight: 600 }}>{h.qty}</td><td style={S.mono}>₹{h.avgPrice.toFixed(2)}</td><td style={{ ...S.mono, fontWeight: 600 }}>₹{ltp.toFixed(2)}</td><td style={S.mono}>{fmt(invested)}</td><td style={S.mono}>{fmt(current)}</td><td><span style={{ ...S.mono, fontWeight: 600, color: dayChange >= 0 ? "var(--green)" : "var(--red)" }}>{dayChange >= 0 ? "+" : ""}{fmt(dayChange)}</span></td><td><span style={{ ...S.mono, fontWeight: 700, color: overallPnl >= 0 ? "var(--green)" : "var(--red)" }}>{overallPnl >= 0 ? "+" : ""}{fmt(overallPnl)}</span><span style={{ fontSize: 11, color: overallPnl >= 0 ? "var(--green)" : "var(--red)", marginLeft: 4 }}>({overallPct}%)</span></td><td><button onClick={() => { setSelectedStock(h.symbol); setOrderSide("sell"); setSearch(""); setQuantity(String(h.qty)); window.scrollTo(0, 0); }} style={{ padding: "4px 12px", borderRadius: 6, background: "var(--red-dim)", color: "var(--red)", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sell</button></td></tr>); })}</tbody></table></div>))}

        {tab === "orders" && (pendingOrders.length === 0 ? (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No open orders.</div>) : (<div className="table-wrap"><table><thead><tr><th>Type</th><th>Stock</th><th>Side</th><th>Qty</th><th>Trigger</th><th>SL</th><th>Target</th><th>LTP</th><th></th></tr></thead><tbody>{pendingOrders.map(o => { const p = prices[o.symbol]; const ltp = p?.ltp || 0; return (<tr key={o.id}><td><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: o.orderMode === "bracket" ? "var(--purple-dim)" : o.orderMode === "limit" ? "var(--blue-dim)" : "var(--amber-dim)", color: o.orderMode === "bracket" ? "var(--purple)" : o.orderMode === "limit" ? "var(--blue)" : "var(--amber)" }}>{o.orderMode === "bracket" ? "BRACKET" : o.orderMode === "limit" ? "LIMIT" : "SL"}</span></td><td style={{ fontWeight: 600 }}>{o.symbol}</td><td><span style={{ fontWeight: 600, color: o.orderSide === "buy" ? "var(--green)" : "var(--red)", textTransform: "uppercase" }}>{o.orderSide}</span></td><td style={S.mono}>{o.quantity}</td><td style={{ ...S.mono, fontWeight: 600 }}>₹{o.triggerPrice?.toFixed(2)}</td><td style={S.mono}>{o.slTrigger ? `₹${o.slTrigger.toFixed(2)}` : "—"}</td><td style={S.mono}>{o.targetTrigger ? `₹${o.targetTrigger.toFixed(2)}` : "—"}</td><td style={S.mono}>₹{ltp.toFixed(2)}</td><td><button onClick={() => cancelPendingOrder(o.id)} style={{ padding: "4px 10px", borderRadius: 6, background: "var(--red-dim)", color: "var(--red)", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button></td></tr>); })}</tbody></table></div>))}

        {tab === "history" && (transactions.length === 0 ? (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No transactions yet</div>) : (<div className="table-wrap"><table><thead><tr><th>Type</th><th>Stock</th><th>Qty</th><th>Price</th><th>Total</th><th>P&L</th><th>Mode</th><th>Date</th></tr></thead><tbody>{transactions.map(tx => (<tr key={tx.id}><td><span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: tx.type === "BUY" ? "var(--green-dim)" : "var(--red-dim)", color: tx.type === "BUY" ? "var(--green)" : "var(--red)" }}>{tx.type}</span></td><td style={{ fontWeight: 600 }}>{tx.symbol}</td><td style={S.mono}>{tx.quantity}</td><td style={S.mono}>₹{tx.price?.toFixed(2)}</td><td style={S.mono}>{fmt(tx.total)}</td><td>{tx.pnl !== undefined ? <span style={{ ...S.mono, fontWeight: 600, color: tx.pnl >= 0 ? "var(--green)" : "var(--red)" }}>{tx.pnl >= 0 ? "+" : ""}{fmt(tx.pnl)}</span> : "—"}</td><td><span style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>{tx.orderMode || "market"}</span></td><td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(tx.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td></tr>))}</tbody></table></div>))}
      </div>
    </div>
  );
}
