import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ScreenerPage from "./pages/ScreenerPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import TradingPage from "./pages/TradingPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import LandingPage from "./pages/LandingPage";
import StageZeroLesson from "./pages/StageZeroLesson";
import PlacementQuiz from "./pages/PlacementQuiz";
import LoginModal from "./pages/LoginModal";
import "./styles/theme.css";

const PLACEHOLDER_PAGES = {
  chart: { title: "Interactive Charts", subtitle: "Technical indicators: MA, Bollinger, RSI, MACD", icon: "📈" },
  strategies: { title: "Trading Strategies", subtitle: "Pre-built strategies with backtesting", icon: "🎯" },
  recommendations: { title: "SEBI RA Picks", subtitle: "Stock picks from registered Research Analysts", icon: "💡" },
  fno: { title: "F&O Derivatives", subtitle: "Options Chain · PCR · Open Interest", icon: "⚡" },
  candle: { title: "Candlestick Scanner", subtitle: "AI auto-scan · 4,600+ stocks", icon: "🕯" },
  fvm: { title: "FVM Score™", subtitle: "Fundamental + Valuation + Momentum", icon: "⭐" },
  sectors: { title: "Sector Analytics", subtitle: "Sector rotation & heatmap", icon: "🏭" },
  backtest: { title: "Strategy Backtester", subtitle: "Test against 10 years of data", icon: "⏪" },
  builder: { title: "Custom Screener Builder", subtitle: "AND/OR logic · Save & reuse screens", icon: "🧮" },
  news: { title: "Market News & Insights", subtitle: "Latest developments shaping Indian markets", icon: "📰" },
  fiidii: { title: "FII / DII Activity", subtitle: "Foreign & domestic institutional flows", icon: "🏛" },
  calendar: { title: "Calendar & Earnings", subtitle: "Events, results & holidays", icon: "📅" },
  alerts: { title: "Alerts & Watchlist", subtitle: "Price alerts and tracked stocks", icon: "🔔" },
  ipo: { title: "IPO Tracker", subtitle: "Upcoming, open & recently listed", icon: "🚀" },
  thematic: { title: "Thematic Portfolios", subtitle: "Curated stock baskets by theme", icon: "📦" },
  community: { title: "Community", subtitle: "Discussions, ideas & journeys", icon: "💬" },
  progress: { title: "My Progress", subtitle: "Track your learning journey", icon: "📊" },
};

const SEARCH_SHEET_URLS = [
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWUEPUEjhHmatIkwy4lF0pCpYk-RWQJHH_GZ411Of1Up4zCI3rc3LAFg19swY08w/pub?gid=1599136282&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBPcckfsQIkHnfPAYyPpd8jA1mqxzJ1W8hSZNcBW6iaUY9CmXDmh4c5bOt-wD5OQ/pub?gid=1658167544&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw_stoaW3BHQHRxFQ7diKSYNlvMXVLdUTV7KCBb5csfV4GzQXI_KGud1-K5Hnejg/pub?gid=622298709&single=true&output=csv",
];

function parseSearchCSV(text) {
  const rows = text.split("\n").slice(1).filter(r => r.trim());
  const data = {};
  for (const row of rows) {
    const c = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cl = c.map(x => x.replace(/^"|"$/g, "").trim());
    if (cl[0] && parseFloat(cl[4]) > 0) data[cl[0]] = { symbol: cl[0], name: cl[1]||cl[0], ltp: parseFloat(cl[4]), change: parseFloat(cl[5])||0 };
  }
  return data;
}

function AppContent() {
  const { user, userProfile, loading, completeOnboarding } = useAuth();

  // Flow state for non-auth users
  const [flowState, setFlowState] = useState("landing"); // landing | stage0 | quiz | login-after-stage0 | login-for-quiz
  const [pendingQuizResult, setPendingQuizResult] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState(null); // "signup" | "login"

  // Main app state
  const [activePage, setActivePage] = useState("learn");
  const [activeCourse, setActiveCourse] = useState(null);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("finscure-theme") || "dark"; } catch { return "dark"; }
  });
  const [stockPrices, setStockPrices] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("finscure-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const results = await Promise.allSettled(SEARCH_SHEET_URLS.map(u => fetch(u).then(r => r.text())));
        const merged = {};
        for (const r of results) if (r.status === "fulfilled") Object.assign(merged, parseSearchCSV(r.value));
        if (Object.keys(merged).length > 0) setStockPrices(merged);
      } catch (e) { console.error(e); }
    }
    fetchPrices();
    const iv = setInterval(fetchPrices, 180000);
    return () => clearInterval(iv);
  }, []);

  // When user logs in after Stage 0 lesson
  useEffect(() => {
    if (user && flowState === "login-after-stage0") {
      // Stage 0 user signed up → set as absolute beginner, Stage 1
      completeOnboarding({ placement_level: "absolute_beginner", interface_stage: 1, starting_module: 1, mock_portfolio_value: 100000 });
      setFlowState("app");
      setShowLogin(false);
    }
    if (user && flowState === "login-for-quiz" && !showLogin) {
      // After login for quiz path, check if placement is done
      if (pendingQuizResult) {
        completeOnboarding(pendingQuizResult);
        setPendingQuizResult(null);
        setFlowState("app");
      } else if (userProfile && userProfile.interface_stage !== undefined) {
        setFlowState("app");
      }
    }
  }, [user, flowState, showLogin]);

  // Set default page based on stage
  useEffect(() => {
    if (user && userProfile?.interface_stage !== undefined && flowState !== "app") {
      setFlowState("app");
      // Set default page based on stage
      const stage = userProfile.interface_stage;
      if (stage <= 2) setActivePage("learn");
      else setActivePage("dashboard");
    }
  }, [user, userProfile]);

  function toggleTheme() { setTheme(t => t === "dark" ? "light" : "dark"); }
  function navigate(page) { setActivePage(page); setActiveCourse(null); window.scrollTo(0, 0); }
  function openCourse(courseId) { setActiveCourse(courseId); window.scrollTo(0, 0); }

  // ═══ LOADING ═══
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--gradient-green)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "var(--btn-text)", marginBottom: 16 }}>F</div>
        <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading Finscure...</div>
      </div>
    </div>
  );

  // ═══ NON-AUTH FLOW ═══
  if (!user) {
    // Stage 0: First lesson without auth
    if (flowState === "stage0") {
      return (
        <>
          <StageZeroLesson onComplete={(action) => {
            setLoginMode(action); // "signup" or "login"
            setFlowState("login-after-stage0");
            setShowLogin(true);
          }} />
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
      );
    }

    // Placement Quiz (no auth yet — quiz first, login after)
    if (flowState === "quiz") {
      return (
        <>
          <PlacementQuiz
            onBack={() => setFlowState("landing")}
            onComplete={(placement) => {
              setPendingQuizResult(placement);
              setFlowState("login-for-quiz");
              setShowLogin(true);
            }}
          />
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
      );
    }

    // Login modal requested from quiz flow
    if (flowState === "login-for-quiz") {
      return (
        <>
          <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{pendingQuizResult?.emoji || "📊"}</div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Almost there!</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>Sign in to save your placement and start learning.</p>
              <button onClick={() => setShowLogin(true)} className="btn-primary" style={{ padding: "14px 36px", fontSize: 15 }}>Sign In / Create Account</button>
            </div>
          </div>
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
      );
    }

    // Default: Landing Page
    return (
      <LandingPage
        onNotYet={() => setFlowState("stage0")}
        onHaveExperience={() => setFlowState("quiz")}
      />
    );
  }

  // ═══ AUTH USER — NEEDS ONBOARDING ═══
  if (user && userProfile && userProfile.interface_stage === undefined) {
    // User is logged in but hasn't completed placement
    // Could be: signed up via Stage 0 (already handled above) or old user needing quiz
    if (pendingQuizResult) {
      // Apply pending quiz result
      completeOnboarding(pendingQuizResult);
      setPendingQuizResult(null);
      return null; // Will re-render with profile
    }

    // Show placement quiz for auth'd users without placement
    return (
      <PlacementQuiz
        onBack={() => {/* Can't go back if logged in — just take quiz */}}
        onComplete={(placement) => {
          completeOnboarding(placement);
        }}
      />
    );
  }

  // ═══ MAIN APP — AUTH USER WITH PLACEMENT ═══
  const stage = userProfile?.interface_stage || 1;

  function renderPage() {
    if (activePage === "courses" && activeCourse) {
      return <CourseDetailPage courseId={activeCourse} onBack={() => setActiveCourse(null)} />;
    }
    // "learn" is the courses page (renamed for Stage 1/2 users)
    if (activePage === "learn") return <CoursesPage onOpenCourse={openCourse} />;

    switch (activePage) {
      case "dashboard": return <DashboardPage onNavigate={navigate} />;
      case "screener": return <ScreenerPage />;
      case "courses": return <CoursesPage onOpenCourse={openCourse} />;
      case "trading": return <TradingPage />;
      default: {
        const ph = PLACEHOLDER_PAGES[activePage];
        if (ph) return <PlaceholderPage {...ph} />;
        return stage <= 2 ? <CoursesPage onOpenCourse={openCourse} /> : <DashboardPage onNavigate={navigate} />;
      }
    }
  }

  return (
    <>
      <TopNav activePage={activePage} onNavigate={navigate} onToggleTheme={toggleTheme} theme={theme} stockPrices={stockPrices} />
      <div className="app-layout">
        <Sidebar activePage={activePage} onNavigate={navigate} />
        <main className="main-content" key={activePage + (activeCourse || "")} style={{ animation: "fadeUp 0.4s ease" }}>
          {renderPage()}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
