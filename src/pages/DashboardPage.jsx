import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTke5GvwzNkNMr7rZKBChTDFJPjrQVCQB7k1b_GEQNk8KP0rHaXKF3E9TG2PhbxFg/pub?gid=1801034194&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQo9NjMnHRhnN1vAfM0cRrvv6IP7UR30CGxndhpY9PYXsr3ggfobMyhrKL4Y95JLw/pub?gid=1895357848&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7CYrXwr7nRLPEI6ZOMoPT7xvXrlGqrFh6H9oC0UC8f-pvBzbb3MQO1ccaHEVMyw/pub?gid=552844866&single=true&output=csv",
];

const TICKER_SYMBOLS = ["RELIANCE","TCS","HDFCBANK","INFY","ITC","SBIN","TATAMOTORS","BAJFINANCE","WIPRO","MARUTI","LT","AXISBANK","KOTAKBANK","TITAN"];

function parseCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    if (cl[0] && parseFloat(cl[4]) > 0) data[cl[0]] = { symbol: cl[0], name: cl[1]||cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5])||0 };
  }
  return data;
}

const fmt = n => { if (!n||isNaN(n)) return "₹0"; const a=Math.abs(n); if (a>=1e7) return `₹${(n/1e7).toFixed(2)} Cr`; if (a>=1e5) return `₹${(n/1e5).toFixed(2)} L`; return `₹${n.toLocaleString("en-IN",{maximumFractionDigits:0})}`; };

const NEWS_ITEMS = [
  { tag:"Breaking",tagColor:"red",title:"FPI Outflows Cross ₹1 Trillion in 2026 — ₹88,180 Cr Pulled in March",source:"Angel One",time:"3d ago",impact:"High",impactColor:"red",sectors:[{name:"Banking ↓",dir:"down"},{name:"Large Caps ↓",dir:"down"},{name:"DII-backed ↑",dir:"up"}] },
  { tag:"Market",tagColor:"green",title:"Sensex Surges 1,205 Pts on Iran Ceasefire Hopes",source:"ET",time:"6h ago",impact:"Med",impactColor:"amber",sectors:[{name:"Titan ↑ 4.7%",dir:"up"},{name:"L&T ↑ 4%",dir:"up"}] },
  { tag:"Economy",tagColor:"amber",title:"Rupee Hits Record Lows Near ₹93.9/USD",source:"BT",time:"5d ago",impact:"High",impactColor:"red",sectors:[{name:"IT Export ↑",dir:"up"},{name:"Importers ↓",dir:"down"}] },
  { tag:"Geopolitics",tagColor:"red",title:"West Asia Conflict — Hormuz Threat Elevates Oil Risks",source:"ICICI Direct",time:"5d ago",impact:"High",impactColor:"red",sectors:[{name:"Oil & Gas ↓",dir:"down"},{name:"Defence ↑",dir:"up"}] },
  { tag:"Policy",tagColor:"blue",title:"RBI Sells $15B+ to Defend Rupee",source:"ET",time:"2h ago",impact:"Med",impactColor:"amber",sectors:[] },
  { tag:"Sector",tagColor:"purple",title:"HSBC Flash PMI Falls to 56.5 — Weakest Since Oct 2022",source:"Trading Econ",time:"1d ago",impact:"Low",impactColor:"green",sectors:[] },
];

const ACHIEVEMENTS = [
  { icon:"🥇", name:"First Trade", desc:"Execute your first mock trade" },
  { icon:"📊", name:"Chart Master", desc:"Complete all TA modules" },
  { icon:"🔥", name:"7-Day Streak", desc:"Learn for 7 days in a row" },
  { icon:"🎖️", name:"Top 100", desc:"Reach top 100 leaderboard" },
  { icon:"💎", name:"Diamond Hands", desc:"Hold a position for 30 days" },
];

export default function DashboardPage({ onNavigate }) {
  const { user } = useAuth();
  const name = user?.displayName?.split(" ")[0] || "there";

  const [tickerData, setTickerData] = useState([]);
  const [allPrices, setAllPrices] = useState({});
  const [courseProgress, setCourseProgress] = useState({ completed: 0, total: 90 });
  const [portfolio, setPortfolio] = useState(null);

  // FIX 1: Live ticker from Google Sheets
  useEffect(() => {
    async function fetchPrices() {
      try {
        const results = await Promise.allSettled(SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const merged = {};
        for (const r of results) if (r.status === "fulfilled") Object.assign(merged, parseCSV(r.value));
        setAllPrices(merged);
        const tickers = TICKER_SYMBOLS.map(s => merged[s]).filter(Boolean);
        if (tickers.length > 0) setTickerData(tickers);
      } catch (e) { console.error(e); }
    }
    fetchPrices();
    const iv = setInterval(fetchPrices, 180000);
    return () => clearInterval(iv);
  }, []);

  // FIX 2 & 3: Real course progress + portfolio from Firestore
  useEffect(() => {
    if (!user) return;
    async function loadUserData() {
      try {
        // Course progress
        const pq = query(collection(db, "progress"), where("userId", "==", user.uid));
        const ps = await getDocs(pq);
        let totalDone = 0;
        ps.docs.forEach(d => { totalDone += (d.data().completedLessons?.length || 0); });
        setCourseProgress({ completed: totalDone, total: 90 });

        // Portfolio
        const pSnap = await getDoc(doc(db, "mock_portfolios", user.uid));
        if (pSnap.exists()) setPortfolio(pSnap.data());
      } catch (e) { console.error(e); }
    }
    loadUserData();
  }, [user]);

  // Portfolio calculations using live prices
  const holdingsVal = portfolio ? (portfolio.holdings||[]).reduce((s,h) => s + h.qty * (allPrices[h.symbol]?.ltp || h.avgPrice), 0) : 0;
  const totalVal = portfolio ? portfolio.cash + holdingsVal : 0;
  const totalPnL = portfolio ? totalVal - portfolio.startingCapital : 0;
  const retPct = portfolio?.startingCapital ? ((totalPnL / portfolio.startingCapital) * 100).toFixed(1) : "0.0";

  // Market status
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), d = now.getDay();
  const isOpen = d>0 && d<6 && ((h===9&&m>=15)||(h>9&&h<15)||(h===15&&m<=30));

  // Achievement unlock
  const hasTraded = portfolio && ((portfolio.holdings?.length||0) > 0);
  const achStatus = [hasTraded, courseProgress.completed >= 25, false, false, false];

  // FIX 4: Key indicators from live data
  const indicators = [
    { icon:"📈", iconC:"green", label:"Reliance", sym:"RELIANCE" },
    { icon:"💻", iconC:"blue", label:"TCS", sym:"TCS" },
    { icon:"🏦", iconC:"amber", label:"HDFC Bank", sym:"HDFCBANK" },
    { icon:"💊", iconC:"purple", label:"Infosys", sym:"INFY" },
    { icon:"🏭", iconC:"red", label:"SBI", sym:"SBIN" },
  ].map(ind => {
    const p = allPrices[ind.sym];
    return {
      ...ind,
      value: p ? `₹${p.ltp.toLocaleString("en-IN",{maximumFractionDigits:2})}` : "—",
      change: p ? `${p.change>=0?"+":""}${p.change.toFixed(2)}%` : "—",
      up: p ? p.change >= 0 : true,
    };
  });

  return (
    <div>
      {/* TICKER TAPE — LIVE */}
      <div className="ticker-tape">
        <div className="tape-inner">
          {(tickerData.length > 0 ? [...tickerData,...tickerData] : []).map((t,i) => (
            <div key={i} className="tape-item">
              <span className="tape-symbol">{t.symbol}</span>
              <span className="tape-price" style={{fontFamily:"'JetBrains Mono',monospace"}}>₹{t.ltp.toLocaleString("en-IN",{maximumFractionDigits:2})}</span>
              <span className="tape-change" style={{color:t.change>=0?"var(--green)":"var(--red)"}}>{t.change>=0?"▲":"▼"} {Math.abs(t.change).toFixed(2)}%</span>
            </div>
          ))}
          {tickerData.length === 0 && <div className="tape-item"><span className="tape-symbol" style={{color:"var(--text-muted)"}}>Loading live prices...</span></div>}
        </div>
      </div>

      <div className="dash-layout">
        <div className="dash-main">
          {/* HERO — REAL DATA */}
          <div className="hero-banner">
            <div className="hero-grid-bg"/><div className="hero-glow"/>
            <div className="hero-content">
              <div className="hero-tag"><span className="dot"/> {isOpen ? "Markets Open" : "Markets Closed"}</div>
              <h1 className="hero-title">Welcome back, {name}. {portfolio ? (totalPnL>=0 ? "Your portfolio is up." : "Keep learning, markets are cyclical.") : "Start your investing journey today."}</h1>
              <p className="hero-subtitle">You've completed {courseProgress.completed} lessons. {courseProgress.completed < 5 ? "Start with Stock Market Basics." : "Continue your momentum!"}</p>
              <div className="hero-stats">
                <div><div className={`hero-stat-val ${totalPnL>=0?"green":""}`} style={{color:!portfolio?"var(--text-muted)":undefined}}>{portfolio ? fmt(totalVal) : "Not started"}</div><div className="hero-stat-label">Mock Portfolio Value</div></div>
                <div><div className="hero-stat-val blue">{courseProgress.completed}</div><div className="hero-stat-label">Lessons Completed</div></div>
                <div><div className="hero-stat-val amber">{portfolio ? `${totalPnL>=0?"+":""}${retPct}%` : "—"}</div><div className="hero-stat-label">Portfolio Return</div></div>
              </div>
            </div>
          </div>

          {/* STATS — REAL DATA */}
          <div className="stats-row" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon green">📈</div>{portfolio && <span className={`stat-change ${totalPnL>=0?"up":"down"}`}>{totalPnL>=0?"↑":"↓"} {Math.abs(parseFloat(retPct))}%</span>}</div>
              <div className="stat-value">{portfolio ? `${totalPnL>=0?"+":""}${fmt(totalPnL)}` : "—"}</div>
              <div className="stat-label">Mock P&L (Overall)</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon blue">🎓</div></div>
              <div className="stat-value">{courseProgress.completed} / {courseProgress.total}</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon amber">💼</div></div>
              <div className="stat-value">{portfolio?.holdings?.length || 0}</div>
              <div className="stat-label">Stocks in Portfolio</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-top"><div className="stat-icon purple">💰</div></div>
              <div className="stat-value">{portfolio ? fmt(portfolio.cash) : "—"}</div>
              <div className="stat-label">Available Cash</div>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="section-header"><div><div className="section-title">Achievements</div><div className="section-subtitle">Earn badges as you progress</div></div></div>
          <div className="achievements-row">
            {ACHIEVEMENTS.map((a,i) => (
              <div key={i} className={`achievement${!achStatus[i]?" locked":""}`}>
                <div className="achievement-icon">{a.icon}</div>
                <div className="achievement-name">{a.name}</div>
                <div className="achievement-desc">{a.desc}</div>
              </div>
            ))}
          </div>

          {/* KEY INDICATORS — LIVE */}
          <div style={{marginTop:32}}>
            <div className="section-header"><div><div className="section-title">Key Market Indicators</div><div className="section-subtitle">Live from NSE via Google Finance (5-min delay)</div></div></div>
            <div className="stats-row" style={{gridTemplateColumns:"repeat(5,1fr)"}}>
              {indicators.map((m,i) => (
                <div key={i} className="stat-card">
                  <div className="stat-card-top"><div className={`stat-icon ${m.iconC}`}>{m.icon}</div><span className={`stat-change ${m.up?"up":"down"}`}>{m.change}</span></div>
                  <div className="stat-value" style={{fontSize:22}}>{m.value}</div>
                  <div className="stat-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEWS SIDEBAR */}
        <div className="dash-news-sidebar">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",borderBottom:"1px solid var(--border)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:7,height:7,borderRadius:"50%",background:"var(--red)",animation:"pulse-dot 1.5s infinite"}}/><div style={{fontSize:14,fontWeight:700}}>Market News</div></div>
            <a href="#" onClick={e=>{e.preventDefault();onNavigate("news")}} style={{fontSize:12,fontWeight:600,color:"var(--green)",textDecoration:"none"}}>View All →</a>
          </div>
          {NEWS_ITEMS.map((news,i) => (
            <div key={i} style={{padding:"14px 18px",borderBottom:"1px solid var(--border)",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="var(--bg-card-hover)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{display:"inline-block",fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:4,marginBottom:6,textTransform:"uppercase",letterSpacing:0.4,background:`var(--${news.tagColor}-dim)`,color:`var(--${news.tagColor})`}}>{news.tag}</div>
              <div style={{fontSize:13,fontWeight:600,lineHeight:1.4,marginBottom:6}}>{news.title}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:"var(--text-muted)"}}>
                <span>{news.source}</span><span style={{width:3,height:3,borderRadius:"50%",background:"var(--text-muted)"}}/><span>{news.time}</span>
                {news.impact && <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10,fontWeight:600,padding:"1px 6px",borderRadius:4,marginLeft:"auto",background:`var(--${news.impactColor}-dim)`,color:`var(--${news.impactColor})`}}>{news.impactColor==="red"?"🔴":news.impactColor==="amber"?"🟡":"🟢"} {news.impact}</span>}
              </div>
              {news.sectors.length>0 && <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>{news.sectors.map((s,j)=><span key={j} style={{fontSize:10,fontWeight:500,padding:"1px 6px",borderRadius:3,background:s.dir==="up"?"var(--green-dim)":"var(--red-dim)",color:s.dir==="up"?"var(--green)":"var(--red)"}}>{s.name}</span>)}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
