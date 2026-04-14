import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, query, where, orderBy, getDocs, limit, deleteDoc } from "firebase/firestore";
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

export default function TradingPage() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [prices, setPrices] = useState({});
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [orderSide, setOrderSide] = useState("buy");
  const [orderMode, setOrderMode] = useState("market");
  const [quantity, setQuantity] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [slPrice, setSlPrice] = useState("");
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [setupAmount, setSetupAmount] = useState(1000000);
  const [orderResult, setOrderResult] = useState(null);
  const [tab, setTab] = useState("positions");
  const [showConfirm, setShowConfirm] = useState(false);

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
        const tq = query(collection(db, "mock_transactions"), where("userId", "==", user.uid), orderBy("timestamp", "desc"), limit(50));
        const ts = await getDocs(tq);
        setTransactions(ts.docs.map(d => ({ id: d.id, ...d.data() })));
        const pq = query(collection(db, "mock_pending_orders"), where("userId", "==", user.uid), where("status", "==", "pending"));
        const ps = await getDocs(pq);
        setPendingOrders(ps.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [user]);

  // Auto-execute pending orders when price matches
  useEffect(() => {
    if (!portfolio || Object.keys(prices).length === 0 || pendingOrders.length === 0) return;
    pendingOrders.forEach(async (order) => {
      const stock = prices[order.symbol];
      if (!stock) return;
      let shouldExecute = false;
      if (order.orderMode === "limit") {
        if (order.orderSide === "buy" && stock.ltp <= order.triggerPrice) shouldExecute = true;
        if (order.orderSide === "sell" && stock.ltp >= order.triggerPrice) shouldExecute = true;
      } else if (order.orderMode === "stoploss") {
        if (order.orderSide === "sell" && stock.ltp <= order.triggerPrice) shouldExecute = true;
        if (order.orderSide === "buy" && stock.ltp >= order.triggerPrice) shouldExecute = true;
      }
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

    if (orderMode === "market") {
      const result = await executeTradeInternal(selectedStock, orderSide, qty, stock.ltp, stock.name, "market");
      setOrderResult(result || { ok: false, msg: orderSide === "buy" ? "Insufficient funds" : "Not enough shares" });
    } else {
      const triggerPrice = parseFloat(orderMode === "limit" ? limitPrice : slPrice);
      if (!triggerPrice || triggerPrice <= 0) { setOrderResult({ ok: false, msg: "Enter a valid trigger price" }); return; }
      const order = { userId: user.uid, symbol: selectedStock, name: stock.name, orderSide, orderMode, quantity: qty, triggerPrice, status: "pending", createdAt: new Date().toISOString() };
      const ref = await addDoc(collection(db, "mock_pending_orders"), order);
      setPendingOrders(prev => [...prev, { id: ref.id, ...order }]);
      setOrderResult({ ok: true, msg: `${orderMode === "limit" ? "Limit" : "Stop-Loss"} order placed: ${orderSide.toUpperCase()} ${qty} ${selectedStock} at ₹${triggerPrice.toFixed(2)}` });
    }
    setQuantity(""); setLimitPrice(""); setSlPrice("");
    setTimeout(() => setOrderResult(null), 4000);
  }

  async function cancelPendingOrder(orderId) {
    await updateDoc(doc(db, "mock_pending_orders", orderId), { status: "cancelled", cancelledAt: new Date().toISOString() });
    setPendingOrders(prev => prev.filter(p => p.id !== orderId));
  }

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

  if (!portfolio) return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Set Up Virtual Portfolio</div>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Choose starting capital. You can reset anytime.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
        {CAPS.map(a => (<button key={a} onClick={() => setSetupAmount(a)} style={{ padding: "14px", borderRadius: 10, cursor: "pointer", border: setupAmount === a ? "2px solid var(--green)" : "2px solid var(--border)", background: setupAmount === a ? "var(--green-dim)" : "var(--bg-card)", color: setupAmount === a ? "var(--green)" : "var(--text-secondary)", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700 }}>{fmt(a)}</button>))}
      </div>
      <button className="btn-primary" onClick={() => createPortfolio(setupAmount)} style={{ padding: "12px 40px", fontSize: 15 }}>Start Trading with {fmt(setupAmount)}</button>
    </div>
  );

  const stock = prices[selectedStock] || { symbol: selectedStock, name: "", ltp: 0, change: 0, prevClose: 0 };
  const holdingsValue = portfolio.holdings.reduce((s, h) => s + h.qty * (prices[h.symbol]?.ltp || h.avgPrice), 0);
  const investedValue = portfolio.holdings.reduce((s, h) => s + h.qty * h.avgPrice, 0);
  const totalValue = portfolio.cash + holdingsValue;
  const totalPnL = totalValue - portfolio.startingCapital;
  const returnPct = (totalPnL / portfolio.startingCapital * 100).toFixed(2);
  const dayPnL = portfolio.holdings.reduce((s, h) => { const p = prices[h.symbol]; if (!p) return s; return s + (p.ltp - (p.prevClose || p.ltp)) * h.qty; }, 0);
  const searchResults = search.length >= 2 ? Object.values(prices).filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6) : [];
  const execPrice = orderMode === "limit" ? (parseFloat(limitPrice) || stock.ltp) : stock.ltp;
  const maxQty = orderSide === "buy" ? (execPrice > 0 ? Math.floor(portfolio.cash / execPrice) : 0) : (portfolio.holdings.find(h => h.symbol === selectedStock)?.qty || 0);
  const confirmQty = parseInt(quantity) || 0;
  const confirmPrice = orderMode === "market" ? stock.ltp : parseFloat(orderMode === "limit" ? limitPrice : slPrice) || 0;
  const confirmTotal = confirmQty * (orderMode === "market" ? stock.ltp : confirmPrice);
  const S = { mono: { fontFamily: "'JetBrains Mono',monospace" }, label: { fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }, input: { width: "100%", padding: "10px 14px", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 15, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, outline: "none" } };

  return (
    <div>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><div style={{ fontSize: 16, fontWeight: 700 }}>Place Order</div><div style={{ ...S.mono, fontSize: 12, color: "var(--text-muted)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6 }}>Cash: {fmt(portfolio.cash)}</div></div>
          <div style={{ marginBottom: 14, position: "relative" }}><div style={S.label}>Stock</div><input type="text" value={search || selectedStock} placeholder="Search stock..." onChange={e => { setSearch(e.target.value); setShowResults(true); }} onFocus={() => { if (search) setShowResults(true); }} onBlur={() => setTimeout(() => setShowResults(false), 200)} style={S.input} />{showResults && searchResults.length > 0 && (<div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, boxShadow: "var(--shadow-lg)", zIndex: 50, marginTop: 4, maxHeight: 200, overflowY: "auto" }}>{searchResults.map(s => (<div key={s.symbol} onClick={() => { setSelectedStock(s.symbol); setSearch(""); setShowResults(false); setQuantity(""); setOrderResult(null); }} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", fontSize: 13 }} onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><span style={{ fontWeight: 600 }}>{s.symbol}</span><span style={{ ...S.mono, color: s.change >= 0 ? "var(--green)" : "var(--red)" }}>₹{s.ltp?.toFixed(2)}</span></div>))}</div>)}</div>
          <div style={{ display: "flex", gap: 4, marginBottom: 14, background: "var(--bg-secondary)", borderRadius: 8, padding: 3 }}>{["buy", "sell"].map(side => (<button key={side} onClick={() => { setOrderSide(side); setOrderResult(null); }} style={{ flex: 1, padding: 8, border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", background: orderSide === side ? (side === "buy" ? "var(--green-dim)" : "var(--red-dim)") : "transparent", color: orderSide === side ? (side === "buy" ? "var(--green)" : "var(--red)") : "var(--text-secondary)", fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", letterSpacing: 0.5 }}>{side}</button>))}</div>
          <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>{[{ key: "market", label: "Market" }, { key: "limit", label: "Limit" }, { key: "stoploss", label: "Stop Loss" }].map(m => (<button key={m.key} onClick={() => { setOrderMode(m.key); setOrderResult(null); }} style={{ flex: 1, padding: "7px 4px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: orderMode === m.key ? "var(--blue-dim)" : "transparent", border: `1px solid ${orderMode === m.key ? "rgba(96,165,250,0.3)" : "var(--border)"}`, color: orderMode === m.key ? "var(--blue)" : "var(--text-muted)" }}>{m.label}</button>))}</div>
          {orderMode === "limit" && (<div style={{ marginBottom: 14 }}><div style={S.label}>Limit Price</div><input type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder={`₹${stock.ltp?.toFixed(2)}`} style={S.input} /><div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>{orderSide === "buy" ? "Executes when price drops to this level" : "Executes when price rises to this level"}</div></div>)}
          {orderMode === "stoploss" && (<div style={{ marginBottom: 14 }}><div style={S.label}>Stop-Loss Price</div><input type="number" value={slPrice} onChange={e => setSlPrice(e.target.value)} placeholder={`₹${(stock.ltp * 0.95)?.toFixed(2)}`} style={S.input} /><div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>{orderSide === "sell" ? "Auto-sells if price drops here" : "Auto-buys if price rises here"}</div></div>)}
          <div style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={S.label}>Quantity</div><div style={{ fontSize: 10, color: "var(--text-muted)" }}>Max: <span style={{ ...S.mono, color: "var(--blue)", cursor: "pointer" }} onClick={() => setQuantity(String(maxQty))}>{maxQty}</span></div></div><input type="number" value={quantity} onChange={e => { setQuantity(e.target.value); setOrderResult(null); }} placeholder="Shares" style={S.input} /><div style={{ display: "flex", gap: 4, marginTop: 8 }}>{QTY_BUTTONS.map(q => (<button key={q} onClick={() => setQuantity(String(q))} style={{ flex: 1, padding: "5px 2px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", background: parseInt(quantity) === q ? "var(--green-dim)" : "var(--surface)", border: `1px solid ${parseInt(quantity) === q ? "var(--green)" : "var(--border)"}`, color: parseInt(quantity) === q ? "var(--green)" : "var(--text-muted)" }}>{q}</button>))}<button onClick={() => setQuantity(String(maxQty))} style={{ flex: 1, padding: "5px 2px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: parseInt(quantity) === maxQty && maxQty > 0 ? "var(--blue-dim)" : "var(--surface)", border: `1px solid ${parseInt(quantity) === maxQty && maxQty > 0 ? "var(--blue)" : "var(--border)"}`, color: parseInt(quantity) === maxQty && maxQty > 0 ? "var(--blue)" : "var(--text-muted)" }}>MAX</button></div></div>
          {confirmQty > 0 && stock.ltp > 0 && (<div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13 }}><div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span style={{ color: "var(--text-muted)" }}>Price</span><span style={{ fontWeight: 600, ...S.mono }}>{orderMode === "market" ? `₹${stock.ltp?.toFixed(2)}` : `₹${confirmPrice.toFixed(2)} (${orderMode})`}</span></div><div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span style={{ color: "var(--text-muted)" }}>Qty</span><span style={{ fontWeight: 600, ...S.mono }}>{quantity}</span></div><div style={{ height: 1, background: "var(--border)", margin: "5px 0" }} /><div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}><span>Total</span><span style={{ ...S.mono, color: orderSide === "buy" ? "var(--green)" : "var(--red)" }}>₹{confirmTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div>{orderSide === "buy" && confirmTotal <= portfolio.cash && <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>Remaining cash: {fmt(portfolio.cash - confirmTotal)}</div>}</div>)}
          {orderResult && (<div style={{ padding: "9px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, marginBottom: 12, background: orderResult.ok ? "var(--green-dim)" : "var(--red-dim)", color: orderResult.ok ? "var(--green)" : "var(--red)" }}>{orderResult.ok ? "✓ " : "⚠ "}{orderResult.msg}</div>)}
          <button onClick={() => { if (!confirmQty || !stock.ltp) return; if (orderMode !== "market" && !confirmPrice) { setOrderResult({ ok: false, msg: "Enter trigger price" }); return; } if (orderSide === "buy" && orderMode === "market" && confirmTotal > portfolio.cash) { setOrderResult({ ok: false, msg: "Insufficient funds" }); return; } if (orderSide === "sell") { const h = portfolio.holdings.find(h => h.symbol === selectedStock); if (!h || confirmQty > h.qty) { setOrderResult({ ok: false, msg: `Only ${h?.qty || 0} shares available` }); return; } } setShowConfirm(true); }} disabled={!confirmQty || !stock.ltp} style={{ width: "100%", padding: 12, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: confirmQty && stock.ltp ? "pointer" : "default", background: orderSide === "buy" ? "var(--gradient-green)" : "linear-gradient(135deg, #f87171, #ef4444)", color: orderSide === "buy" ? "var(--btn-text)" : "#fff", fontFamily: "'DM Sans',sans-serif", opacity: confirmQty && stock.ltp ? 1 : 0.4 }}>{orderSide === "buy" ? `Buy ${selectedStock}` : `Sell ${selectedStock}`}</button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowConfirm(false)}><div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 28, maxWidth: 400, width: "100%" }}><div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Confirm Order</div><div style={{ background: "var(--bg-secondary)", borderRadius: 10, padding: 16, marginBottom: 20 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Action</span><span style={{ fontWeight: 700, fontSize: 14, color: orderSide === "buy" ? "var(--green)" : "var(--red)", textTransform: "uppercase" }}>{orderSide} · {orderMode}</span></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Stock</span><span style={{ fontWeight: 600, fontSize: 14 }}>{selectedStock}</span></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Quantity</span><span style={{ fontWeight: 600, ...S.mono, fontSize: 14 }}>{quantity}</span></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: "var(--text-muted)", fontSize: 13 }}>Price</span><span style={{ fontWeight: 600, ...S.mono, fontSize: 14 }}>₹{confirmPrice.toFixed(2)}{orderMode !== "market" && ` (${orderMode})`}</span></div><div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} /><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700, fontSize: 15 }}>Total</span><span style={{ fontWeight: 700, ...S.mono, fontSize: 18, color: orderSide === "buy" ? "var(--green)" : "var(--red)" }}>₹{confirmTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span></div></div><div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 600, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Cancel</button><button onClick={executeTrade} style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: orderSide === "buy" ? "var(--gradient-green)" : "linear-gradient(135deg, #f87171, #ef4444)", color: orderSide === "buy" ? "var(--btn-text)" : "#fff" }}>Confirm {orderSide === "buy" ? "Buy" : "Sell"}</button></div></div></div>)}

      {/* Tabs */}
      <div style={{ marginTop: 24 }}>
        <div className="tab-bar"><button className={`tab${tab === "positions" ? " active" : ""}`} onClick={() => setTab("positions")}>Positions ({portfolio.holdings.length})</button><button className={`tab${tab === "orders" ? " active" : ""}`} onClick={() => setTab("orders")}>Open Orders ({pendingOrders.length})</button><button className={`tab${tab === "history" ? " active" : ""}`} onClick={() => setTab("history")}>History ({transactions.length})</button></div>

        {tab === "positions" && (portfolio.holdings.length === 0 ? (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No positions yet. Search a stock and place your first trade!</div>) : (<div className="table-wrap"><table><thead><tr><th>Stock</th><th>Qty</th><th>Avg</th><th>LTP</th><th>Invested</th><th>Current</th><th>Day P&L</th><th>Overall P&L</th><th></th></tr></thead><tbody>{portfolio.holdings.map(h => { const p = prices[h.symbol]; const ltp = p?.ltp || h.avgPrice; const prevClose = p?.prevClose || ltp; const invested = h.qty * h.avgPrice; const current = h.qty * ltp; const overallPnl = current - invested; const overallPct = ((ltp - h.avgPrice) / h.avgPrice * 100).toFixed(2); const dayChange = (ltp - prevClose) * h.qty; return (<tr key={h.symbol}><td><span style={{ fontWeight: 600 }}>{h.symbol}</span><br /><span style={{ fontSize: 11, color: "var(--text-muted)" }}>{h.name}</span></td><td style={{ ...S.mono, fontWeight: 600 }}>{h.qty}</td><td style={S.mono}>₹{h.avgPrice.toFixed(2)}</td><td style={{ ...S.mono, fontWeight: 600 }}>₹{ltp.toFixed(2)}</td><td style={S.mono}>{fmt(invested)}</td><td style={S.mono}>{fmt(current)}</td><td><span style={{ ...S.mono, fontWeight: 600, color: dayChange >= 0 ? "var(--green)" : "var(--red)" }}>{dayChange >= 0 ? "+" : ""}{fmt(dayChange)}</span></td><td><span style={{ ...S.mono, fontWeight: 700, color: overallPnl >= 0 ? "var(--green)" : "var(--red)" }}>{overallPnl >= 0 ? "+" : ""}{fmt(overallPnl)}</span><span style={{ fontSize: 11, color: overallPnl >= 0 ? "var(--green)" : "var(--red)", marginLeft: 4 }}>({overallPct}%)</span></td><td><button onClick={() => { setSelectedStock(h.symbol); setOrderSide("sell"); setSearch(""); setQuantity(String(h.qty)); window.scrollTo(0, 0); }} style={{ padding: "4px 12px", borderRadius: 6, background: "var(--red-dim)", color: "var(--red)", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sell</button></td></tr>); })}</tbody></table></div>))}

        {tab === "orders" && (pendingOrders.length === 0 ? (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No open orders. Place a limit or stop-loss order to see it here.</div>) : (<div className="table-wrap"><table><thead><tr><th>Type</th><th>Stock</th><th>Side</th><th>Qty</th><th>Trigger</th><th>LTP</th><th>Status</th><th></th></tr></thead><tbody>{pendingOrders.map(o => { const p = prices[o.symbol]; const ltp = p?.ltp || 0; const dist = o.triggerPrice && ltp ? (((o.triggerPrice - ltp) / ltp) * 100).toFixed(1) : 0; return (<tr key={o.id}><td><span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: o.orderMode === "limit" ? "var(--blue-dim)" : "var(--amber-dim)", color: o.orderMode === "limit" ? "var(--blue)" : "var(--amber)" }}>{o.orderMode === "limit" ? "LIMIT" : "SL"}</span></td><td style={{ fontWeight: 600 }}>{o.symbol}</td><td><span style={{ fontWeight: 600, color: o.orderSide === "buy" ? "var(--green)" : "var(--red)", textTransform: "uppercase" }}>{o.orderSide}</span></td><td style={S.mono}>{o.quantity}</td><td style={{ ...S.mono, fontWeight: 600 }}>₹{o.triggerPrice?.toFixed(2)}</td><td style={S.mono}>₹{ltp.toFixed(2)} <span style={{ fontSize: 10, color: "var(--text-muted)" }}>({dist}%)</span></td><td><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "var(--amber-dim)", color: "var(--amber)" }}>Pending</span></td><td><button onClick={() => cancelPendingOrder(o.id)} style={{ padding: "4px 10px", borderRadius: 6, background: "var(--red-dim)", color: "var(--red)", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button></td></tr>); })}</tbody></table></div>))}

        {tab === "history" && (transactions.length === 0 ? (<div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No transactions yet</div>) : (<div className="table-wrap"><table><thead><tr><th>Type</th><th>Stock</th><th>Qty</th><th>Price</th><th>Total</th><th>P&L</th><th>Mode</th><th>Date</th></tr></thead><tbody>{transactions.map(tx => (<tr key={tx.id}><td><span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: tx.type === "BUY" ? "var(--green-dim)" : "var(--red-dim)", color: tx.type === "BUY" ? "var(--green)" : "var(--red)" }}>{tx.type}</span></td><td style={{ fontWeight: 600 }}>{tx.symbol}</td><td style={S.mono}>{tx.quantity}</td><td style={S.mono}>₹{tx.price?.toFixed(2)}</td><td style={S.mono}>{fmt(tx.total)}</td><td>{tx.pnl !== undefined ? <span style={{ ...S.mono, fontWeight: 600, color: tx.pnl >= 0 ? "var(--green)" : "var(--red)" }}>{tx.pnl >= 0 ? "+" : ""}{fmt(tx.pnl)}</span> : "—"}</td><td><span style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>{tx.orderMode || "market"}</span></td><td style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(tx.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td></tr>))}</tbody></table></div>))}
      </div>
    </div>
  );
}
