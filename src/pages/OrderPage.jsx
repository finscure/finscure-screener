import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTrading } from "../contexts/TradingContext";

export default function OrderPage() {
  const { symbol, action } = useParams(); // action = "buy" or "sell"
  const navigate = useNavigate();
  const trading = useTrading();
  const isBuy = action === "buy";

  const [quantity, setQuantity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { success, error }

  const stock = trading.stockPrices[symbol];
  const holding = trading.portfolio?.holdings?.find(h => h.symbol === symbol);
  const ltp = stock?.ltp || 0;
  const totalValue = (parseInt(quantity) || 0) * ltp;
  const maxBuyQty = ltp > 0 ? Math.floor((trading.portfolio?.cash || 0) / ltp) : 0;
  const maxSellQty = holding?.qty || 0;

  const quickAmounts = isBuy
    ? [{ label: "₹5K", value: Math.floor(5000 / ltp) }, { label: "₹10K", value: Math.floor(10000 / ltp) }, { label: "₹25K", value: Math.floor(25000 / ltp) }, { label: "₹50K", value: Math.floor(50000 / ltp) }, { label: "Max", value: maxBuyQty }]
    : [{ label: "25%", value: Math.floor(maxSellQty * 0.25) }, { label: "50%", value: Math.floor(maxSellQty * 0.5) }, { label: "75%", value: Math.floor(maxSellQty * 0.75) }, { label: "All", value: maxSellQty }];

  async function handleSubmit() {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = isBuy
        ? await trading.buyStock(symbol, qty, ltp)
        : await trading.sellStock(symbol, qty, ltp);
      setResult(res);
      if (res.success) {
        setTimeout(() => navigate("/trade"), 1500);
      }
    } catch (e) {
      setResult({ success: false, error: e.message });
    }
    setSubmitting(false);
  }

  if (!stock) return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", textAlign: "center", padding: 80, background: "#f8f7fc", minHeight: "calc(100vh - 56px)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
      <p style={{ fontSize: 16, color: "#64748b", fontWeight: 500 }}>Stock "{symbol}" not found or prices not loaded yet</p>
      <Link to="/trade" style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14 }}>← Back to Dashboard</Link>
    </div>
  );

  // P&L preview for sell orders
  const sellPnL = !isBuy && holding ? ((ltp - holding.avgPrice) * (parseInt(quantity) || 0)) : 0;

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f8f7fc", minHeight: "calc(100vh - 56px)", display: "flex", justifyContent: "center", padding: "40px 28px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ width: 480, maxWidth: "100%" }}>
        {/* Back button */}
        <Link to="/trade" style={{ fontSize: 13, color: "#7c3aed", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}>← Back to Dashboard</Link>

        {/* Order Card */}
        <div style={{ background: "#fff", borderRadius: 18, border: "1.5px solid #ede9fe", overflow: "hidden", boxShadow: "0 4px 16px rgba(45,27,105,.06)" }}>

          {/* Stock Header */}
          <div style={{ padding: "24px 28px", borderBottom: "1px solid #ede9fe", background: isBuy ? "#f0fdf4" : "#fef2f2" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 22, color: "#1e1b3a", marginBottom: 2 }}>{symbol}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{stock.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 24, fontWeight: 700, color: "#1e1b3a" }}>₹{ltp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 700, color: stock.change >= 0 ? "#16a34a" : "#dc2626" }}>
                  {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.change)?.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Order Type Banner */}
          <div style={{
            padding: "10px 28px", textAlign: "center",
            background: isBuy ? "#16a34a" : "#dc2626", color: "#fff",
            fontSize: 14, fontWeight: 800, letterSpacing: ".06em",
          }}>
            {isBuy ? "BUY ORDER" : "SELL ORDER"} — DELIVERY
          </div>

          {/* Order Form */}
          <div style={{ padding: "24px 28px" }}>
            {/* Available info */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, fontSize: 13 }}>
              <span style={{ color: "#64748b" }}>{isBuy ? "Available Cash" : "Shares Held"}</span>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, color: "#1e1b3a" }}>
                {isBuy ? `₹${(trading.portfolio?.cash || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : `${maxSellQty} shares`}
              </span>
            </div>

            {/* Holding info for sell */}
            {!isBuy && holding && (
              <div style={{ background: "#faf9fe", borderRadius: 10, padding: "12px 16px", marginBottom: 18, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <div><span style={{ color: "#64748b" }}>Avg Buy Price: </span><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>₹{holding.avgPrice.toFixed(2)}</span></div>
                <div><span style={{ color: "#64748b" }}>Current: </span><span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: ltp >= holding.avgPrice ? "#16a34a" : "#dc2626" }}>₹{ltp.toFixed(2)}</span></div>
              </div>
            )}

            {/* Quantity Input */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Quantity (shares)</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}
                placeholder="Enter number of shares"
                min="1" max={isBuy ? maxBuyQty : maxSellQty}
                style={{
                  width: "100%", boxSizing: "border-box", padding: "14px 18px",
                  background: "#faf9fe", border: "2px solid #e9e5f5", borderRadius: 12,
                  fontSize: 20, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700,
                  color: "#1e1b3a", outline: "none", textAlign: "center",
                }}
                onFocus={e => e.target.style.borderColor = isBuy ? "#16a34a" : "#dc2626"}
                onBlur={e => e.target.style.borderColor = "#e9e5f5"}
              />
            </div>

            {/* Quick Amount Buttons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {quickAmounts.filter(q => q.value > 0).map(q => (
                <button key={q.label} onClick={() => setQuantity(String(q.value))} style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  border: "1.5px solid #e9e5f5", background: parseInt(quantity) === q.value ? "#f5f3ff" : "#fff",
                  color: parseInt(quantity) === q.value ? "#7c3aed" : "#64748b",
                  cursor: "pointer", fontFamily: "inherit",
                }}>{q.label} ({q.value})</button>
              ))}
            </div>

            {/* Order Summary */}
            {parseInt(quantity) > 0 && (
              <div style={{ background: "#faf9fe", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: "#64748b" }}>Price per share</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>₹{ltp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: "#64748b" }}>Quantity</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{parseInt(quantity)} shares</span>
                </div>
                <div style={{ height: 1, background: "#e9e5f5", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                  <span style={{ fontWeight: 700, color: "#1e1b3a" }}>Total {isBuy ? "Cost" : "Proceeds"}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 800, color: isBuy ? "#dc2626" : "#16a34a", fontSize: 18 }}>₹{totalValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
                {/* P&L preview for sell */}
                {!isBuy && holding && parseInt(quantity) > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 13 }}>
                    <span style={{ color: "#64748b" }}>Estimated P&L</span>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, color: sellPnL >= 0 ? "#16a34a" : "#dc2626" }}>
                      {sellPnL >= 0 ? "+" : ""}₹{sellPnL.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {result && !result.success && (
              <div style={{ padding: "10px 16px", background: "#fef2f2", borderRadius: 10, fontSize: 13, color: "#dc2626", marginBottom: 16, fontWeight: 500 }}>
                ⚠ {result.error}
              </div>
            )}

            {/* Success */}
            {result?.success && (
              <div style={{ padding: "14px 16px", background: "#f0fdf4", borderRadius: 10, fontSize: 14, color: "#16a34a", marginBottom: 16, fontWeight: 600, textAlign: "center" }}>
                ✓ Order executed successfully! Redirecting...
              </div>
            )}

            {/* Submit Button */}
            <button onClick={handleSubmit}
              disabled={submitting || !parseInt(quantity) || parseInt(quantity) <= 0 || result?.success}
              style={{
                width: "100%", padding: "14px 24px",
                background: submitting || !parseInt(quantity) || result?.success ? "#d4d4d8" : isBuy ? "#16a34a" : "#dc2626",
                color: "#fff", border: "none", borderRadius: 12,
                fontSize: 16, fontWeight: 800, cursor: submitting || !parseInt(quantity) || result?.success ? "default" : "pointer",
                fontFamily: "inherit", letterSpacing: ".02em",
                transition: "all .2s",
              }}>
              {submitting ? "Processing..." : result?.success ? "✓ Done" : isBuy ? `Buy ${symbol}` : `Sell ${symbol}`}
            </button>

            {/* Disclaimer */}
            <p style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 14, lineHeight: 1.4 }}>
              This is a mock/virtual trade for educational purposes. No real money is involved.
            </p>
          </div>
        </div>

        {/* Quick switch between buy/sell */}
        {holding && isBuy && (
          <Link to={`/trade/order/${symbol}/sell`} style={{
            display: "block", textAlign: "center", marginTop: 16,
            color: "#dc2626", fontWeight: 600, fontSize: 13, textDecoration: "none",
          }}>Switch to Sell {symbol} →</Link>
        )}
        {!isBuy && (
          <Link to={`/trade/order/${symbol}/buy`} style={{
            display: "block", textAlign: "center", marginTop: 16,
            color: "#16a34a", fontWeight: 600, fontSize: 13, textDecoration: "none",
          }}>Switch to Buy {symbol} →</Link>
        )}
      </div>
    </div>
  );
}
