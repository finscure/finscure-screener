import { useState, useEffect } from "react";
import { calcMonthlySeasonality, calcDayOfWeekSeasonality } from "../utils/indicators";

export default function SeasonalityPage() {
  const [symbol, setSymbol] = useState("RELIANCE");
  const [search, setSearch] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const [dowData, setDowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("monthly");
  const [years, setYears] = useState(0);
  const [dataPoints, setDataPoints] = useState(0);

  async function loadSeasonality(sym) {
    setLoading(true);
    setError(null);
    setMonthlyData([]);
    setDowData([]);

    // Try multiple intervals/ranges for best data
    const attempts = [
      { interval: "Y", label: "5yr weekly" },
      { interval: "3M", label: "3yr weekly" },
      { interval: "M", label: "2yr daily" },
    ];

    let data = null;
    let lastErr = null;

    for (const attempt of attempts) {
      try {
        const res = await fetch(`/api/stock-history?symbol=${encodeURIComponent(sym)}&interval=${attempt.interval}`);
        if (!res.ok) { lastErr = `API returned ${res.status}`; continue; }
        const json = await res.json();
        if (json.error) { lastErr = json.error; continue; }
        if (json.data && json.data.length > 40) {
          data = json.data;
          break;
        } else {
          lastErr = `Only ${json.data?.length || 0} data points from ${attempt.label}`;
        }
      } catch (e) {
        lastErr = e.message || "Network error";
      }
    }

    if (data && data.length > 40) {
      const monthly = calcMonthlySeasonality(data);
      const dow = calcDayOfWeekSeasonality(data);
      setMonthlyData(monthly);
      setDowData(dow);
      setDataPoints(data.length);
      const firstDate = new Date(data[0].time * 1000);
      const lastDate = new Date(data[data.length - 1].time * 1000);
      setYears(Math.max(1, Math.round((lastDate - firstDate) / (365.25 * 24 * 60 * 60 * 1000))));
    } else {
      setError(lastErr || "Could not load enough historical data. Try a different stock (e.g., RELIANCE, TCS, HDFCBANK).");
    }
    setLoading(false);
  }

  useEffect(() => { loadSeasonality(symbol); }, []);

  function handleSearch(e) {
    e.preventDefault();
    const sym = search.trim().toUpperCase();
    if (sym) { setSymbol(sym); setSearch(""); loadSeasonality(sym); }
  }

  const maxMonthlyReturn = monthlyData.length > 0 ? Math.max(...monthlyData.map(d => Math.abs(d.avgReturn)), 1) : 1;
  const maxDowReturn = dowData.length > 0 ? Math.max(...dowData.map(d => Math.abs(d.avgReturn)), 0.01) : 1;

  return (
    <div>
      {/* Header */}
      <div className="section-header">
        <div>
          <div className="section-title">📅 Seasonality Analysis</div>
          <div className="section-subtitle">Historical patterns by month and day-of-week</div>
        </div>
      </div>

      {/* Stock Search */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 8 }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter stock symbol..."
            style={{ padding: "9px 14px", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, outline: "none", width: 180 }}
          />
          <button type="submit" className="btn-primary" style={{ padding: "9px 18px", fontSize: 13 }}>Analyze</button>
        </form>
        <div style={{ display: "flex", gap: 6 }}>
          {["RELIANCE", "TCS", "HDFCBANK", "INFY", "ITC"].map(s => (
            <button key={s} onClick={() => { setSymbol(s); setSearch(""); loadSeasonality(s); }} style={{
              padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              background: symbol === s ? "var(--green-dim)" : "var(--bg-card)",
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
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Fetching multi-year data from Yahoo Finance</div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Could not load data for {symbol}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, maxWidth: 400, margin: "0 auto 16px" }}>{error}</div>
          <button onClick={() => loadSeasonality(symbol)} className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>Retry</button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && monthlyData.length > 0 && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          {/* Results Header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{symbol}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{years} years · {dataPoints} data points · NSE</div>
            </div>
            <div style={{ display: "flex", gap: 3, background: "var(--bg-secondary)", borderRadius: 8, padding: 3 }}>
              <button onClick={() => setTab("monthly")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: tab === "monthly" ? "var(--green-dim)" : "transparent", color: tab === "monthly" ? "var(--green)" : "var(--text-muted)" }}>Monthly</button>
              <button onClick={() => setTab("dow")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", background: tab === "dow" ? "var(--green-dim)" : "transparent", color: tab === "dow" ? "var(--green)" : "var(--text-muted)" }}>Day of Week</button>
            </div>
          </div>

          <div style={{ padding: 20 }}>
            {/* Monthly */}
            {tab === "monthly" && (
              <div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 180, marginBottom: 20, padding: "0 4px" }}>
                  {monthlyData.map((d, i) => {
                    const pos = d.avgReturn >= 0;
                    const h = Math.max((Math.abs(d.avgReturn) / maxMonthlyReturn) * 80, 3);
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: pos ? "var(--green)" : "var(--red)", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{pos ? "+" : ""}{d.avgReturn}%</div>
                        <div style={{ width: "100%", maxWidth: 36, height: `${h}px`, borderRadius: "4px 4px 2px 2px", background: pos ? `rgba(99,220,160,${0.3 + (d.winRate / 100) * 0.5})` : `rgba(248,113,113,${0.3 + ((100 - d.winRate) / 100) * 0.5})` }} />
                        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, fontWeight: 600 }}>{d.month}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead><tr>
                      <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Month</th>
                      <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Avg Return</th>
                      <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Win Rate</th>
                      <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Years</th>
                    </tr></thead>
                    <tbody>{monthlyData.map((d, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>{d.month}</td>
                        <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: d.avgReturn >= 0 ? "var(--green)" : "var(--red)", borderBottom: "1px solid var(--border)" }}>{d.avgReturn >= 0 ? "+" : ""}{d.avgReturn}%</td>
                        <td style={{ padding: "8px 10px", textAlign: "right", borderBottom: "1px solid var(--border)" }}><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: d.winRate >= 60 ? "var(--green-dim)" : d.winRate <= 40 ? "var(--red-dim)" : "var(--amber-dim)", color: d.winRate >= 60 ? "var(--green)" : d.winRate <= 40 ? "var(--red)" : "var(--amber)" }}>{d.winRate}%</span></td>
                        <td style={{ padding: "8px 10px", textAlign: "right", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.years}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                {(() => {
                  const best = monthlyData.reduce((a, b) => a.avgReturn > b.avgReturn ? a : b);
                  const worst = monthlyData.reduce((a, b) => a.avgReturn < b.avgReturn ? a : b);
                  return (
                    <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "var(--green-dim)", borderLeft: "3px solid var(--green)", fontSize: 13, color: "var(--green)", lineHeight: 1.6 }}>
                      <strong>{symbol}</strong> historically performs best in <strong>{best.month}</strong> ({best.winRate}% win rate, avg +{best.avgReturn}%) and worst in <strong>{worst.month}</strong> ({worst.winRate}% win rate, avg {worst.avgReturn}%).
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Day of Week */}
            {tab === "dow" && dowData.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, marginBottom: 20, justifyContent: "center" }}>
                  {dowData.map((d, i) => {
                    const pos = d.avgReturn >= 0;
                    const h = Math.max((Math.abs(d.avgReturn) / maxDowReturn) * 100, 4);
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", width: 60 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: pos ? "var(--green)" : "var(--red)", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{pos ? "+" : ""}{d.avgReturn}%</div>
                        <div style={{ width: 40, height: `${h}px`, borderRadius: "6px 6px 2px 2px", background: pos ? "var(--green)" : "var(--red)", opacity: 0.6 }} />
                        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8, fontWeight: 600 }}>{d.day}</div>
                        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{d.winRate}% win</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead><tr>
                      <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Day</th>
                      <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Avg Return</th>
                      <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Win Rate</th>
                      <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Samples</th>
                    </tr></thead>
                    <tbody>{dowData.map((d, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>{d.day}</td>
                        <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: d.avgReturn >= 0 ? "var(--green)" : "var(--red)", borderBottom: "1px solid var(--border)" }}>{d.avgReturn >= 0 ? "+" : ""}{d.avgReturn}%</td>
                        <td style={{ padding: "8px 10px", textAlign: "right", borderBottom: "1px solid var(--border)" }}><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: d.winRate >= 55 ? "var(--green-dim)" : d.winRate <= 45 ? "var(--red-dim)" : "var(--amber-dim)", color: d.winRate >= 55 ? "var(--green)" : d.winRate <= 45 ? "var(--red)" : "var(--amber)" }}>{d.winRate}%</span></td>
                        <td style={{ padding: "8px 10px", textAlign: "right", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.count}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
