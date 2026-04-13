import { useState, useEffect, useRef } from "react";

const SEARCH_SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
];

function parseCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    if (cl[0] && parseFloat(cl[4]) > 0) data[cl[0]] = { symbol: cl[0], name: cl[1] || cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5]) || 0 };
  }
  return data;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getCellBg(val) {
  if (val === null || val === undefined) return "transparent";
  const v = parseFloat(val);
  if (v >= 20)  return "rgba(22,163,74,0.65)";
  if (v >= 10)  return "rgba(22,163,74,0.45)";
  if (v >= 5)   return "rgba(22,163,74,0.30)";
  if (v >= 2)   return "rgba(22,163,74,0.18)";
  if (v >= 0)   return "rgba(22,163,74,0.08)";
  if (v >= -2)  return "rgba(239,68,68,0.08)";
  if (v >= -5)  return "rgba(239,68,68,0.18)";
  if (v >= -10) return "rgba(239,68,68,0.30)";
  if (v >= -20) return "rgba(239,68,68,0.45)";
  return "rgba(239,68,68,0.65)";
}

function getCellColor(val) {
  if (val === null || val === undefined) return "var(--text-muted)";
  const v = parseFloat(val);
  if (Math.abs(v) >= 10) return "#fff";
  if (v >= 0) return "var(--green)";
  return "var(--red)";
}

export default function SeasonalityPage() {
  const [stocks, setStocks] = useState({});
  const [symbol, setSymbol] = useState("RELIANCE");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);

  // Load stock list
  useEffect(() => {
    async function loadStocks() {
      try {
        const results = await Promise.allSettled(SEARCH_SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const merged = {};
        for (const r of results) if (r.status === "fulfilled") Object.assign(merged, parseCSV(r.value));
        setStocks(merged);
      } catch (e) { console.error(e); }
    }
    loadStocks();
  }, []);

  async function loadSeasonality(sym) {
    setLoading(true);
    setError(null);
    setHeatmapData(null);

    try {
      // Fetch MONTHLY candles over MAX range from Yahoo Finance
      // Each candle = 1 calendar month with accurate open/close
      const res = await fetch(`/api/stock-history?symbol=${encodeURIComponent(sym)}&interval=SEASONALITY`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      if (!json.data || json.data.length < 12) throw new Error("Not enough monthly data");

      const candles = json.data;

      // Each candle from Yahoo Finance monthly interval:
      // - time: first day of the month (unix timestamp)
      // - open: opening price of the month
      // - close: closing price of the month (last trading day)
      // Monthly return = ((close - open) / open) * 100
      // This matches how FNOTrader and other tools calculate it

      const monthlyData = {}; // { year: { monthIndex: return% } }

      candles.forEach(candle => {
        const date = new Date(candle.time * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();

        if (candle.open && candle.close && candle.open > 0) {
          const ret = ((candle.close - candle.open) / candle.open) * 100;
          if (!monthlyData[year]) monthlyData[year] = {};
          monthlyData[year][month] = parseFloat(ret.toFixed(2));
        }
      });

      const years = Object.keys(monthlyData).map(Number).sort((a, b) => b - a);

      // Average per month
      const avgMonthly = {};
      for (let m = 0; m < 12; m++) {
        const vals = years.map(y => monthlyData[y]?.[m]).filter(v => v !== undefined);
        avgMonthly[m] = vals.length > 0 ? parseFloat((vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(2)) : null;
      }

      // Yearly returns (compound monthly)
      const yearlyReturns = {};
      years.forEach(y => {
        const vals = [];
        for (let m = 0; m < 12; m++) { if (monthlyData[y]?.[m] !== undefined) vals.push(monthlyData[y][m]); }
        if (vals.length > 0) {
          let compound = 1;
          vals.forEach(v => { compound *= (1 + v / 100); });
          yearlyReturns[y] = parseFloat(((compound - 1) * 100).toFixed(2));
        }
      });

      setHeatmapData({ years, monthlyData, avgMonthly, yearlyReturns });
    } catch (e) {
      setError(e.message || "Failed to load data");
    }
    setLoading(false);
  }

  useEffect(() => { loadSeasonality(symbol); }, []);

  function selectStock(sym) {
    setSymbol(sym);
    setSearch("");
    setShowDropdown(false);
    loadSeasonality(sym);
  }

  const searchResults = search.length >= 1
    ? Object.values(stocks).filter(s =>
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8)
    : [];

  const stock = stocks[symbol];

  const thStyle = {
    padding: "10px 6px", fontSize: 11, fontWeight: 700, textAlign: "center",
    color: "var(--text-muted)", borderBottom: "2px solid var(--border)",
    whiteSpace: "nowrap", position: "sticky", top: 0, background: "var(--bg-card)", zIndex: 2,
  };
  const tdStyle = {
    padding: "9px 6px", fontSize: 12, fontWeight: 600, textAlign: "center",
    borderBottom: "1px solid var(--border)", fontFamily: "'JetBrains Mono',monospace",
    whiteSpace: "nowrap", transition: "background 0.15s",
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Seasonality Analysis</div>
          <div className="section-subtitle">Monthly return heatmap · Data from Yahoo Finance</div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap",
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 16px",
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <input type="text" value={search} placeholder={`Search stocks... (current: ${symbol})`}
            onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
            onFocus={() => { if (search.length >= 1) setShowDropdown(true); }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            style={{ width: "100%", padding: "10px 14px", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none" }}
          />
          {showDropdown && searchResults.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, boxShadow: "0 12px 40px rgba(0,0,0,0.3)", zIndex: 50, marginTop: 4, maxHeight: 280, overflowY: "auto" }}>
              {searchResults.map(s => (
                <div key={s.symbol} onMouseDown={() => selectStock(s.symbol)}
                  style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", fontSize: 13 }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div><span style={{ fontWeight: 700 }}>{s.symbol}</span><span style={{ color: "var(--text-muted)", fontSize: 11, marginLeft: 8 }}>{s.name}</span></div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: s.change >= 0 ? "var(--green)" : "var(--red)" }}>₹{s.ltp?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {stock && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div><div style={{ fontSize: 16, fontWeight: 700 }}>{symbol}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>{stock.name}</div></div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>₹{stock.ltp?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: stock.change >= 0 ? "var(--green)" : "var(--red)" }}>{stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.change).toFixed(2)}%</div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 4 }}>
          {["RELIANCE", "TCS", "HDFCBANK", "INFY", "ITC", "SBIN"].map(s => (
            <button key={s} onClick={() => selectStock(s)} style={{
              padding: "5px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              background: symbol === s ? "var(--green-dim)" : "transparent",
              border: `1px solid ${symbol === s ? "var(--green)" : "var(--border)"}`,
              color: symbol === s ? "var(--green)" : "var(--text-muted)",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 48, textAlign: "center" }}>
          <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTop: "2px solid var(--green)", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Loading seasonality for {symbol}...</div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Could not load data for {symbol}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>{error}</div>
          <button onClick={() => loadSeasonality(symbol)} className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>Retry</button>
        </div>
      )}

      {/* Heatmap Table */}
      {!loading && !error && heatmapData && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: "left", paddingLeft: 16, minWidth: 80 }}>Year</th>
                  {MONTHS.map(m => <th key={m} style={thStyle}>{m}</th>)}
                  <th style={{ ...thStyle, borderLeft: "2px solid var(--border)", minWidth: 80 }}>Yearly<br/>Returns</th>
                </tr>
              </thead>
              <tbody>
                {/* Average Monthly Performance row */}
                <tr style={{ background: "var(--bg-secondary)" }}>
                  <td style={{ ...tdStyle, textAlign: "left", paddingLeft: 16, fontWeight: 800, fontSize: 10, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    Average Monthly<br/>Performance
                  </td>
                  {MONTHS.map((_, i) => {
                    const val = heatmapData.avgMonthly[i];
                    return (
                      <td key={i} style={{ ...tdStyle, background: getCellBg(val), color: getCellColor(val) }}>
                        {val !== null ? `${val.toFixed(2)}%` : "—"}
                      </td>
                    );
                  })}
                  <td style={{ ...tdStyle, borderLeft: "2px solid var(--border)", color: "var(--text-muted)" }}>—</td>
                </tr>

                {/* Year rows */}
                {heatmapData.years.map(year => (
                  <tr key={year}>
                    <td style={{ ...tdStyle, textAlign: "left", paddingLeft: 16, fontWeight: 800, color: "var(--text-primary)" }}>{year}</td>
                    {MONTHS.map((_, i) => {
                      const val = heatmapData.monthlyData[year]?.[i];
                      const has = val !== undefined;
                      return (
                        <td key={i} style={{ ...tdStyle, background: has ? getCellBg(val) : "transparent", color: has ? getCellColor(val) : "var(--text-muted)" }}>
                          {has ? `${val.toFixed(2)}%` : ""}
                        </td>
                      );
                    })}
                    <td style={{
                      ...tdStyle, borderLeft: "2px solid var(--border)", fontWeight: 800,
                      background: heatmapData.yearlyReturns[year] !== undefined ? getCellBg(heatmapData.yearlyReturns[year]) : "transparent",
                      color: heatmapData.yearlyReturns[year] !== undefined ? getCellColor(heatmapData.yearlyReturns[year]) : "var(--text-muted)",
                    }}>
                      {heatmapData.yearlyReturns[year] !== undefined ? `${heatmapData.yearlyReturns[year].toFixed(2)}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Insight Cards */}
          {(() => {
            const entries = MONTHS.map((m, i) => ({ month: m, val: heatmapData.avgMonthly[i] })).filter(e => e.val !== null);
            if (entries.length === 0) return null;
            const best = entries.reduce((a, b) => a.val > b.val ? a : b);
            const worst = entries.reduce((a, b) => a.val < b.val ? a : b);
            const totalYears = heatmapData.years.length;
            const positiveYears = heatmapData.years.filter(y => heatmapData.yearlyReturns[y] > 0).length;
            return (
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
                <div style={{ padding: "10px 14px", borderRadius: 8, background: "var(--green-dim)", color: "var(--green)", flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Best: {best.month}</div>
                  <div style={{ fontSize: 12 }}>Avg +{best.val.toFixed(2)}%</div>
                </div>
                <div style={{ padding: "10px 14px", borderRadius: 8, background: "var(--red-dim)", color: "var(--red)", flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Worst: {worst.month}</div>
                  <div style={{ fontSize: 12 }}>Avg {worst.val.toFixed(2)}%</div>
                </div>
                <div style={{ padding: "10px 14px", borderRadius: 8, background: "var(--blue-dim)", color: "var(--blue)", flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Positive Years: {positiveYears}/{totalYears}</div>
                  <div style={{ fontSize: 12 }}>{totalYears > 0 ? Math.round(positiveYears / totalYears * 100) : 0}% years positive</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
