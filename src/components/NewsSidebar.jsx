import { useState, useEffect } from "react";

const NEWS_URL = "https://news.google.com/rss/search?q=indian+stock+market+OR+nifty+OR+sensex+when:7d&hl=en-IN&gl=IN&ceid=IN:en";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

const CATEGORIES = {
  "FII/DII": { keywords: ["fii", "fpi", "dii", "foreign", "institutional"], color: "var(--purple)" },
  "Earnings": { keywords: ["earnings", "results", "quarterly", "profit", "revenue"], color: "var(--green)" },
  "Sector": { keywords: ["sector", "banking", "pharma", "it sector", "auto", "fmcg", "metal"], color: "var(--blue)" },
  "Economy": { keywords: ["rbi", "gdp", "inflation", "interest rate", "rupee", "repo"], color: "var(--red)" },
  "Global": { keywords: ["us market", "fed", "nasdaq", "dow", "crude", "gold", "china"], color: "#22d3ee" },
  "Market": { keywords: [], color: "var(--amber)" },
};

function getCategory(title) {
  const lower = title.toLowerCase();
  for (const [cat, { keywords }] of Object.entries(CATEGORIES)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return "Market";
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function NewsSidebar({ onViewAll }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(CORS_PROXY + encodeURIComponent(NEWS_URL));
        if (!res.ok) return;
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        const items = [];
        doc.querySelectorAll("item").forEach(item => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const source = item.querySelector("source")?.textContent || "";
          const cleanTitle = title.replace(/\s*-\s*[^-]+$/, "").trim();
          const ts = pubDate ? new Date(pubDate).getTime() : 0;
          if (ts > 0 && cleanTitle) items.push({ title: cleanTitle, link, pubDate, source, timestamp: ts });
        });
        items.sort((a, b) => b.timestamp - a.timestamp);

        // Deduplicate similar headlines
        const deduped = [];
        const stopwords = ["that","this","with","from","have","been","will","after","amid","over","into","says","said","than","also","more"];
        function kw(t) { return t.toLowerCase().replace(/[^a-z0-9\s]/g,"").split(/\s+/).filter(w => w.length > 3 && !stopwords.includes(w)); }
        items.forEach(item => {
          const isDupe = deduped.some(ex => {
            const k1 = kw(ex.title), k2 = kw(item.title);
            if (!k1.length || !k2.length) return false;
            const s = new Set(k2);
            return k1.filter(w => s.has(w)).length / Math.min(k1.length, k2.length) >= 0.5;
          });
          if (!isDupe) deduped.push(item);
        });

        setNews(deduped.slice(0, 6));
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
    const iv = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="dash-news-sidebar">
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", animation: "pulse-dot 2s infinite" }} />
          <span style={{ fontSize: 14, fontWeight: 700 }}>Market News</span>
        </div>
        {onViewAll && <span onClick={onViewAll} style={{ fontSize: 12, fontWeight: 600, color: "var(--green)", cursor: "pointer" }}>View All →</span>}
      </div>

      <div style={{ padding: "8px 0" }}>
        {loading && (
          <div style={{ padding: 20, textAlign: "center" }}>
            <div style={{ width: 16, height: 16, border: "2px solid var(--border)", borderTop: "2px solid var(--green)", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto 8px" }} />
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Loading...</div>
          </div>
        )}

        {!loading && news.length === 0 && (
          <div style={{ padding: 20, textAlign: "center", fontSize: 12, color: "var(--text-muted)" }}>No recent news</div>
        )}

        {news.map((item, i) => {
          const cat = getCategory(item.title);
          const catColor = CATEGORIES[cat]?.color || "var(--amber)";
          return (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "inherit", borderBottom: i < news.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ fontSize: 10, fontWeight: 700, color: catColor, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{cat}</div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: "var(--text-primary)", marginBottom: 6 }}>{item.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                {item.source && <span>{item.source}</span>}
                {item.source && <span>·</span>}
                <span>{timeAgo(item.pubDate)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
