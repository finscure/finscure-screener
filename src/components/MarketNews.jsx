import { useState, useEffect } from "react";

const NEWS_FEEDS = [
  "https://news.google.com/rss/search?q=indian+stock+market+OR+nifty+OR+sensex+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=NSE+BSE+stocks+india+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
];
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

function parseRSS(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = doc.querySelectorAll("item");
  const news = [];
  items.forEach(item => {
    const title = item.querySelector("title")?.textContent || "";
    const link = item.querySelector("link")?.textContent || "";
    const pubDate = item.querySelector("pubDate")?.textContent || "";
    const source = item.querySelector("source")?.textContent || "";
    const cleanTitle = title.replace(/\s*-\s*[^-]+$/, "").trim();
    const ts = pubDate ? new Date(pubDate).getTime() : 0;
    if (ts > 0 && cleanTitle) {
      news.push({ title: cleanTitle || title, link, pubDate, source, timestamp: ts });
    }
  });
  return news;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

const CATEGORY_KEYWORDS = {
  "FII/DII": ["fii", "fpi", "dii", "foreign", "institutional"],
  "Earnings": ["earnings", "results", "quarterly", "profit", "revenue", "q4", "q3", "q2", "q1"],
  "Sector": ["sector", "banking", "pharma", "it sector", "auto", "fmcg", "metal", "realty"],
  "IPO": ["ipo", "listing", "allotment"],
  "Economy": ["rbi", "gdp", "inflation", "interest rate", "rupee", "fiscal", "repo"],
  "Global": ["us market", "fed", "nasdaq", "dow jones", "global", "crude oil", "gold", "china"],
};

function getCategory(title) {
  const lower = title.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return "Market";
}

const CAT_COLORS = {
  "FII/DII": { bg: "var(--purple-dim)", color: "var(--purple)" },
  "Earnings": { bg: "var(--green-dim)", color: "var(--green)" },
  "Sector": { bg: "var(--blue-dim)", color: "var(--blue)" },
  "IPO": { bg: "var(--amber-dim)", color: "var(--amber)" },
  "Economy": { bg: "var(--red-dim)", color: "var(--red)" },
  "Global": { bg: "rgba(34,211,238,0.1)", color: "#22d3ee" },
  "Market": { bg: "var(--surface)", color: "var(--text-muted)" },
};

export default function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchNews() {
    setLoading(true);
    try {
      // Fetch from multiple feeds for better coverage
      const results = await Promise.allSettled(
        NEWS_FEEDS.map(url =>
          fetch(CORS_PROXY + encodeURIComponent(url))
            .then(r => { if (!r.ok) throw new Error(); return r.text(); })
            .then(xml => parseRSS(xml))
        )
      );

      // Merge all results
      const allNews = [];
      const seen = new Set();
      results.forEach(r => {
        if (r.status === "fulfilled") {
          r.value.forEach(item => {
            // Deduplicate by title similarity
            const key = item.title.toLowerCase().slice(0, 40);
            if (!seen.has(key)) {
              seen.add(key);
              allNews.push(item);
            }
          });
        }
      });

      // Sort by timestamp — newest first
      allNews.sort((a, b) => b.timestamp - a.timestamp);

      // Keep top 20
      const top = allNews.slice(0, 20);

      if (top.length > 0) {
        setNews(top);
        setError(null);
        setLastUpdated(new Date());
      } else {
        setError("No recent news found");
      }
    } catch (e) {
      console.error("News fetch error:", e);
      setError("Could not load news. Check connection.");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading && news.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTop: "2px solid var(--green)", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto 10px" }} />
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Loading market news...</div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>⚠️</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{error}</div>
        <button onClick={fetchNews} style={{ marginTop: 10, background: "none", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-secondary)", fontSize: 12, padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Market News</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Live from Google News · Sorted by latest
            {lastUpdated && ` · Updated ${lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`}
          </div>
        </div>
        <button onClick={fetchNews} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-muted)", fontSize: 12, padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>
          {loading ? "..." : "🔄"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {news.map((item, i) => {
          const cat = getCategory(item.title);
          const catStyle = CAT_COLORS[cat] || CAT_COLORS.Market;
          return (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", padding: "12px 14px", borderRadius: 10,
                background: "var(--bg-card)", border: "1px solid var(--border)",
                textDecoration: "none", color: "inherit", transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-active)"; e.currentTarget.style.transform = "translateX(3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, marginBottom: 6, color: "var(--text-primary)" }}>
                    {item.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: catStyle.bg, color: catStyle.color }}>{cat}</span>
                    {item.source && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.source}</span>}
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace" }}>{timeAgo(item.pubDate)}</span>
                  </div>
                </div>
                <span style={{ fontSize: 14, color: "var(--text-muted)", flexShrink: 0, marginTop: 2 }}>→</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
