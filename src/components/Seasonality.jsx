import { useState, useEffect } from "react";
import { calcMonthlySeasonality, calcDayOfWeekSeasonality } from "../utils/indicators";

export default function Seasonality({ symbol }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [dowData, setDowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("monthly");
  const [years, setYears] = useState(0);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    setError(null);

    // Fetch 5-year daily data from Yahoo Finance
    fetch(`/api/stock-history?symbol=${encodeURIComponent(symbol)}&interval=Y`)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 60) {
          const monthly = calcMonthlySeasonality(json.data);
          const dow = calcDayOfWeekSeasonality(json.data);
          setMonthlyData(monthly);
          setDowData(dow);
          // Estimate years of data
          const firstDate = new Date(json.data[0].time * 1000);
          const lastDate = new Date(json.data[json.data.length - 1].time * 1000);
          setYears(Math.round((lastDate - firstDate) / (365.25 * 24 * 60 * 60 * 1000)));
        } else {
          setError("Not enough historical data for seasonality analysis");
        }
      })
      .catch(() => setError("Failed to fetch historical data"))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 32, textAlign: "center" }}>
        <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTop: "2px solid var(--green)", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto 12px" }} />
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Loading seasonality for {symbol}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{error}</div>
      </div>
    );
  }

  if (monthlyData.length === 0) return null;

  const maxMonthlyReturn = Math.max(...monthlyData.map(d => Math.abs(d.avgReturn)), 1);
  const maxDowReturn = dowData.length > 0 ? Math.max(...dowData.map(d => Math.abs(d.avgReturn)), 0.01) : 1;

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>📅 Seasonality — {symbol}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{years} years of data · Based on daily returns</div>
        </div>
        <div style={{ display: "flex", gap: 3, background: "var(--bg-secondary)", borderRadius: 8, padding: 3 }}>
          <button onClick={() => setTab("monthly")} style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
            background: tab === "monthly" ? "var(--green-dim)" : "transparent",
            color: tab === "monthly" ? "var(--green)" : "var(--text-muted)",
          }}>Monthly</button>
          <button onClick={() => setTab("dow")} style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
            background: tab === "dow" ? "var(--green-dim)" : "transparent",
            color: tab === "dow" ? "var(--green)" : "var(--text-muted)",
          }}>Day of Week</button>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Monthly Seasonality */}
        {tab === "monthly" && (
          <div>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 180, marginBottom: 20, padding: "0 4px" }}>
              {monthlyData.map((d, i) => {
                const isPositive = d.avgReturn >= 0;
                const barHeight = Math.max((Math.abs(d.avgReturn) / maxMonthlyReturn) * 80, 3);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", position: "relative" }}>
                    {/* Value label */}
                    <div style={{ fontSize: 10, fontWeight: 600, color: isPositive ? "var(--green)" : "var(--red)", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
                      {isPositive ? "+" : ""}{d.avgReturn}%
                    </div>
                    {/* Bar */}
                    <div style={{
                      width: "100%", maxWidth: 36, height: `${barHeight}px`, borderRadius: "4px 4px 2px 2px",
                      background: isPositive
                        ? `rgba(99,220,160,${0.3 + (d.winRate / 100) * 0.5})`
                        : `rgba(248,113,113,${0.3 + ((100 - d.winRate) / 100) * 0.5})`,
                      transition: "height 0.5s",
                    }} />
                    {/* Month label */}
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, fontWeight: 600 }}>{d.month}</div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Month</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Avg Return</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Win Rate</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Years</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((d, i) => (
                    <tr key={i}>
                      <td style={{ padding: "8px 10px", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>{d.month}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: d.avgReturn >= 0 ? "var(--green)" : "var(--red)", borderBottom: "1px solid var(--border)" }}>
                        {d.avgReturn >= 0 ? "+" : ""}{d.avgReturn}%
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", borderBottom: "1px solid var(--border)" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                          background: d.winRate >= 60 ? "var(--green-dim)" : d.winRate <= 40 ? "var(--red-dim)" : "var(--amber-dim)",
                          color: d.winRate >= 60 ? "var(--green)" : d.winRate <= 40 ? "var(--red)" : "var(--amber)",
                        }}>{d.winRate}%</span>
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.years}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Insight callout */}
            {(() => {
              const best = monthlyData.reduce((a, b) => a.avgReturn > b.avgReturn ? a : b);
              const worst = monthlyData.reduce((a, b) => a.avgReturn < b.avgReturn ? a : b);
              return (
                <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "var(--green-dim)", borderLeft: "3px solid var(--green)", fontSize: 13, color: "var(--green)", lineHeight: 1.6 }}>
                  <strong>{symbol}</strong> historically performs best in <strong>{best.month}</strong> ({best.winRate}% win rate, avg +{best.avgReturn}%) and worst in <strong>{worst.month}</strong> ({worst.winRate}% win rate, avg {worst.avgReturn}%). Based on {years} years of data.
                </div>
              );
            })()}
          </div>
        )}

        {/* Day of Week Seasonality */}
        {tab === "dow" && (
          <div>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, marginBottom: 20, justifyContent: "center" }}>
              {dowData.map((d, i) => {
                const isPositive = d.avgReturn >= 0;
                const barHeight = Math.max((Math.abs(d.avgReturn) / maxDowReturn) * 100, 4);
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", width: 60 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: isPositive ? "var(--green)" : "var(--red)", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
                      {isPositive ? "+" : ""}{d.avgReturn}%
                    </div>
                    <div style={{
                      width: 40, height: `${barHeight}px`, borderRadius: "6px 6px 2px 2px",
                      background: isPositive ? "var(--green)" : "var(--red)", opacity: 0.6,
                      transition: "height 0.5s",
                    }} />
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8, fontWeight: 600 }}>{d.day}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{d.winRate}% win</div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Day</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Avg Return</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Win Rate</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border)", fontSize: 10, textTransform: "uppercase" }}>Samples</th>
                  </tr>
                </thead>
                <tbody>
                  {dowData.map((d, i) => (
                    <tr key={i}>
                      <td style={{ padding: "8px 10px", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>{d.day}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: d.avgReturn >= 0 ? "var(--green)" : "var(--red)", borderBottom: "1px solid var(--border)" }}>
                        {d.avgReturn >= 0 ? "+" : ""}{d.avgReturn}%
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", borderBottom: "1px solid var(--border)" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                          background: d.winRate >= 55 ? "var(--green-dim)" : d.winRate <= 45 ? "var(--red-dim)" : "var(--amber-dim)",
                          color: d.winRate >= 55 ? "var(--green)" : d.winRate <= 45 ? "var(--red)" : "var(--amber)",
                        }}>{d.winRate}%</span>
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{d.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
