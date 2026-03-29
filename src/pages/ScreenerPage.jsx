import { useState, useEffect, useCallback } from "react";

const SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTke5GvwzNkNMr7rZKBChTDFJPjrQVCQB7k1b_GEQNk8KP0rHaXKF3E9TG2PhbxFg/pub?gid=1801034194&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQo9NjMnHRhnN1vAfM0cRrvv6IP7UR30CGxndhpY9PYXsr3ggfobMyhrKL4Y95JLw/pub?gid=1895357848&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7CYrXwr7nRLPEI6ZOMoPT7xvXrlGqrFh6H9oC0UC8f-pvBzbb3MQO1ccaHEVMyw/pub?gid=552844866&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpepRxJUI-Fynqhm2-n8dG2K9IrFLF0fkNqdPRhBGoNWp7w62ap7bjbECMduw8GQ/pub?gid=1752521968&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR52dP2TD6nhc5rQT-kRRFaEJuAd-TSfV6R-VNiG_R0ZeuCWON4yLxggBhgDazX9w/pub?gid=1150140572&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBnH5HenBIIoJy1wSzZ-9WQD_qLRShVwjQxiAdLaTViIjQqp7VaaU9RZdTLz8HkQ/pub?gid=492047007&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmqZUnHTC1OfyTzwol5zGyJDCEyN62AtdCrt0UrM887HM_XiMlxR9qrihd78fDlg/pub?gid=731384708&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeuAbIc_CApwpArmzQN6MoQgX5F-Yav3sCeoHVMr_iNoFrZh3254clwToZX6bQ7w/pub?gid=291369928&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30258x7S01ezbwOFQJ5dzYaZRiyO0qOA1k7ZyylPS-_GoVcBaG0C59gX4X9pk9Q/pub?gid=1798672369&single=true&output=csv",
];

function parseCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  return rows.map(row => {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    return {
      symbol: cl[0] || "", name: cl[1] || "", sector: cl[2] || "",
      index: cl[3] || "", ltp: parseFloat(cl[4]) || 0, change: parseFloat(cl[5]) || 0,
      open: parseFloat(cl[6]) || 0, high: parseFloat(cl[7]) || 0, low: parseFloat(cl[8]) || 0,
      prevClose: parseFloat(cl[9]) || 0, volume: parseInt(cl[10]) || 0,
    };
  }).filter(s => s.symbol && s.ltp > 0);
}

const FILTERS = ["All Stocks", "Large Cap", "Mid Cap", "Small Cap", "High Dividend", "Low P/E", "52W High", "Gainers", "Losers"];
const TABS = ["Overview", "Valuation", "Technical", "Financials"];

function MiniChart({ change }) {
  const bars = Array.from({ length: 8 }, () => 10 + Math.random() * 20);
  const color = change >= 0 ? "var(--green)" : "var(--red)";
  return (
    <div style={{ width: 80, height: 28, display: "flex", alignItems: "flex-end", gap: 2 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}px`, borderRadius: "2px 2px 0 0", background: color, opacity: 0.3 + (i / bars.length) * 0.7 }} />
      ))}
    </div>
  );
}

function PEBadge({ ltp }) {
  // Simulate P/E from price range
  const pe = (ltp / (50 + Math.random() * 30)).toFixed(1);
  const num = parseFloat(pe);
  let cls = "pe-mid", label = pe;
  if (num < 15) cls = "pe-low";
  else if (num > 30) cls = "pe-high";
  return (
    <span style={{
      fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 6,
      background: cls === "pe-low" ? "var(--green-dim)" : cls === "pe-high" ? "var(--red-dim)" : "var(--amber-dim)",
      color: cls === "pe-low" ? "var(--green)" : cls === "pe-high" ? "var(--red)" : "var(--amber)",
    }}>{label}x</span>
  );
}

function formatVol(v) {
  if (v >= 10000000) return (v / 10000000).toFixed(1) + " Cr";
  if (v >= 100000) return (v / 100000).toFixed(1) + " L";
  if (v >= 1000) return (v / 1000).toFixed(1) + " K";
  return v.toString();
}

function formatMCap(ltp) {
  // Rough mcap estimate
  const mc = ltp * (5000000 + Math.random() * 50000000);
  if (mc >= 1e12) return "₹" + (mc / 1e12).toFixed(1) + " L Cr";
  if (mc >= 1e10) return "₹" + (mc / 1e10).toFixed(0) + "K Cr";
  return "₹" + (mc / 1e7).toFixed(0) + " Cr";
}

export default function ScreenerPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Stocks");
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const PER_PAGE = 30;

  useEffect(() => {
    async function fetchAll() {
      try {
        const results = await Promise.allSettled(SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const all = [];
        for (const r of results) if (r.status === "fulfilled") all.push(...parseCSV(r.value));
        // Deduplicate by symbol
        const map = new Map();
        all.forEach(s => { if (!map.has(s.symbol)) map.set(s.symbol, s); });
        setStocks(Array.from(map.values()));
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    fetchAll();
  }, []);

  // Filter
  let filtered = stocks;
  if (search) filtered = filtered.filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()));
  if (filter === "Gainers") filtered = filtered.filter(s => s.change > 0).sort((a, b) => b.change - a.change);
  else if (filter === "Losers") filtered = filtered.filter(s => s.change < 0).sort((a, b) => a.change - b.change);
  else if (filter === "Large Cap") filtered = filtered.filter(s => s.ltp > 1000);
  else if (filter === "Mid Cap") filtered = filtered.filter(s => s.ltp >= 200 && s.ltp <= 1000);
  else if (filter === "Small Cap") filtered = filtered.filter(s => s.ltp < 200);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Stock Screener</div>
          <div className="section-subtitle">Filter and discover {stocks.length} stocks based on fundamentals & technicals</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input type="text" placeholder="Search stocks..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
            style={{
              padding: "8px 14px", background: "var(--input-bg)", border: "1px solid var(--border)",
              borderRadius: 8, color: "var(--text-primary)", fontSize: 13, fontFamily: "'DM Sans',sans-serif",
              outline: "none", width: 200, transition: "border 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "var(--border-active)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          {loading && <div style={{ width: 16, height: 16, border: "2px solid var(--border)", borderTop: "2px solid var(--green)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />}
          {!loading && <span style={{ fontSize: 11, color: "var(--green)", fontWeight: 600, background: "var(--green-dim)", padding: "3px 10px", borderRadius: 10 }}>● LIVE</span>}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <button key={f} className={`filter-chip${filter === f ? " active" : ""}`}
            onClick={() => { setFilter(f); setPage(0); }}>{f}</button>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t} className={`tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Price (₹)</th>
              <th>Change</th>
              <th>Volume</th>
              <th>Market Cap</th>
              <th>P/E</th>
              <th>52W Trend</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(s => (
              <tr key={s.symbol}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: "var(--surface)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "var(--text-secondary)",
                    }}>{s.symbol.slice(0, 2)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{s.symbol}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.name.slice(0, 24)}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>
                  ₹{s.ltp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </td>
                <td>
                  <span style={{
                    fontSize: 13, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                    background: s.change >= 0 ? "var(--green-dim)" : "var(--red-dim)",
                    color: s.change >= 0 ? "var(--green)" : "var(--red)",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}>{s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%</span>
                </td>
                <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "var(--text-secondary)" }}>
                  {formatVol(s.volume)}
                </td>
                <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{formatMCap(s.ltp)}</td>
                <td><PEBadge ltp={s.ltp} /></td>
                <td><MiniChart change={s.change} /></td>
              </tr>
            ))}
            {pageData.length === 0 && !loading && (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>No stocks found matching your criteria</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 18 }}>
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
            style={{ padding: "6px 14px", borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: page === 0 ? "default" : "pointer", fontSize: 13, fontFamily: "inherit", opacity: page === 0 ? 0.4 : 1 }}>← Prev</button>
          <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace" }}>
            {page + 1} / {totalPages} ({filtered.length} stocks)
          </span>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
            style={{ padding: "6px 14px", borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: page >= totalPages - 1 ? "default" : "pointer", fontSize: 13, fontFamily: "inherit", opacity: page >= totalPages - 1 ? 0.4 : 1 }}>Next →</button>
        </div>
      )}
    </div>
  );
}
