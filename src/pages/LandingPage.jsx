import { useState } from "react";
import LoginModal from "./LoginModal";

const FEATURES = [
  { icon: "📚", title: "30 Structured Modules", desc: "From basics to algo trading. 268 lessons across 8 sections — Foundation, FA, TA, Smart Money, Derivatives, and more.", color: "var(--green)" },
  { icon: "💹", title: "Mock Trading", desc: "Practice with virtual money at real NSE prices. Build confidence before risking a single rupee.", color: "var(--blue)" },
  { icon: "🔎", title: "Stock Screener", desc: "Filter 1,000+ NSE stocks by P/E, market cap, sector, and 50+ parameters. Find your next pick.", color: "var(--amber)" },
  { icon: "📈", title: "Interactive Charts", desc: "Candlestick charts with SMA, EMA, RSI, MACD, Bollinger Bands, and more. Real data via Yahoo Finance.", color: "var(--purple)" },
  { icon: "📰", title: "Live Market News", desc: "Real-time headlines from Google News. Auto-categorized by sector, FII/DII, earnings, and economy.", color: "#22d3ee" },
  { icon: "📝", title: "Assessments & Progress", desc: "Quiz after every lesson. Track completion, streaks, and portfolio performance. Learn by doing.", color: "var(--red)" },
];

const STEPS = [
  { num: "01", title: "Take the Placement Quiz", desc: "5 quick questions determine your level. Beginners start from scratch. Experienced traders skip ahead.", icon: "🎯" },
  { num: "02", title: "Learn at Your Pace", desc: "Video lessons + concise notes + assessments. Every concept taught before a feature is unlocked.", icon: "📖" },
  { num: "03", title: "Practice with Mock Trading", desc: "Apply what you learn with virtual ₹1L–₹10L. Track your P&L against real market prices.", icon: "💰" },
];

const COURSE_PREVIEW = [
  { num: "01-05", section: "🏗️ Foundation", modules: "Stocks, Exchanges, Candlesticks, Volume, Orders", level: "Beginner", color: "var(--green)" },
  { num: "06-09", section: "🏦 Fundamental Analysis", modules: "Financial Statements, Valuation, Sectors, Annual Reports", level: "Beginner–Inter", color: "var(--blue)" },
  { num: "10-13", section: "📈 Technical Analysis", modules: "S/R, Chart Patterns, 14 Indicators, Candlestick Patterns", level: "Intermediate", color: "var(--amber)" },
  { num: "14-17", section: "🧠 Smart Money", modules: "Institutional Trading, Order Blocks, Liquidity, D/S Zones", level: "Advanced", color: "var(--purple)" },
  { num: "18-30", section: "⚡ Advanced", modules: "Derivatives, F&O, Algo Trading, Backtesting, Portfolio", level: "Pro", color: "var(--red)" },
];

const FAQS = [
  { q: "Is Finscure free?", a: "Yes! Modules 1–3, mock trading, and progress tracking are completely free. Advanced modules unlock as you progress. Pro features (full screener, backtester) are coming soon." },
  { q: "Do I need a Demat account?", a: "No. Finscure is a learning platform with mock trading using virtual money. You don't need a real broker account to start. When you're ready to invest real money, we'll guide you." },
  { q: "What if I already know the basics?", a: "Take our 60-second placement quiz. Score well and you'll skip ahead to intermediate or advanced content. All skipped lessons remain accessible — never locked." },
  { q: "How is mock trading different from real trading?", a: "Mock trading uses real NSE prices but virtual money. You experience real market movements without financial risk. It's the safest way to build trading skills." },
  { q: "Can I use Finscure on mobile?", a: "Yes! Finscure works on any browser — phone, tablet, or desktop. A dedicated mobile app is coming soon." },
];

export default function LandingPage({ onNotYet, onHaveExperience }) {
  const [hover, setHover] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const sectionStyle = { maxWidth: 1000, margin: "0 auto", padding: "0 20px" };

  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", overflowX: "hidden" }}>

      {/* ═══ STICKY NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56,
        background: "rgba(10,14,23,0.88)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--gradient-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--btn-text)" }}>F</div>
          <span style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>Finscure</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setShowLogin(true)} style={{
            background: "none", border: "1px solid var(--border)", borderRadius: 8,
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 600, padding: "7px 18px",
            cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.color = "var(--green)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >Sign In</button>
          <button onClick={() => document.getElementById("gate-section")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary" style={{ padding: "7px 18px", fontSize: 13 }}>Get Started</button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "80px 20px 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle grid background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,220,160,0.08), transparent 70%)", filter: "blur(60px)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            borderRadius: 20, background: "var(--green-dim)", border: "1px solid rgba(99,220,160,0.15)",
            fontSize: 12, fontWeight: 600, color: "var(--green)", marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse-dot 2s infinite" }} />
            Free to start · No credit card needed
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16, maxWidth: 700 }}>
            Learn Stock Trading.<br />
            <span style={{ color: "var(--green)" }}>The Right Way.</span>
          </h1>
          <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.65 }}>
            India's step-by-step platform to master stock markets.
            30 modules. Mock trading with real prices. Zero risk.
          </p>

          {/* ═══ GATE QUESTION ═══ */}
          <div id="gate-section" style={{ maxWidth: 480, margin: "0 auto" }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Have you ever invested in the stock market?</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={onNotYet}
                onMouseEnter={() => setHover("a")} onMouseLeave={() => setHover(null)}
                style={{
                  width: "100%", padding: "18px 22px", borderRadius: 12,
                  border: `2px solid ${hover === "a" ? "var(--green)" : "var(--border)"}`,
                  background: hover === "a" ? "var(--green-dim)" : "var(--bg-card)",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "all 0.2s",
                }}>
                <span style={{ fontSize: 28 }}>🌱</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Not yet</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>I'm new and want to learn from scratch</div>
                </div>
              </button>
              <button onClick={onHaveExperience}
                onMouseEnter={() => setHover("b")} onMouseLeave={() => setHover(null)}
                style={{
                  width: "100%", padding: "18px 22px", borderRadius: 12,
                  border: `2px solid ${hover === "b" ? "var(--blue)" : "var(--border)"}`,
                  background: hover === "b" ? "var(--blue-dim)" : "var(--bg-card)",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "all 0.2s",
                }}>
                <span style={{ fontSize: 28 }}>📊</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Yes, I have some experience</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>I've traded before and want to level up</div>
                </div>
              </button>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop: 48, fontSize: 12, color: "var(--text-muted)", animation: "fadeUp 2s ease infinite alternate" }}>
            ↓ Scroll to learn more
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "80px 20px", background: "var(--bg-secondary)" }}>
        <div style={sectionStyle}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>How It Works</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}>Three Steps to Market Mastery</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
                padding: "28px 24px", position: "relative", transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{step.icon}</span>
                  <span style={{ fontSize: 32, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "var(--green)", opacity: 0.3 }}>{step.num}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={sectionStyle}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Platform Features</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}>Everything You Need to Learn & Trade</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
                padding: "24px 22px", transition: "all 0.25s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = f.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COURSE PREVIEW ═══ */}
      <section style={{ padding: "80px 20px", background: "var(--bg-secondary)" }}>
        <div style={sectionStyle}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--amber)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Curriculum</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}>30 Modules · 268 Lessons · 139 Hours</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8 }}>From "What is a stock?" to algorithmic trading with Python</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {COURSE_PREVIEW.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "18px 22px",
                background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = c.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <span style={{ fontSize: 24 }}>{c.section.split(" ")[0]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{c.section.split(" ").slice(1).join(" ")}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{c.modules}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: `${c.color}18`, color: c.color }}>{c.level}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace" }}>M{c.num}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOCK TRADING PREVIEW ═══ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={sectionStyle}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Mock Trading</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
                Trade with Virtual Money.<br />Real Market Prices.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                {[
                  "Start with ₹1,00,000 virtual capital",
                  "Buy & sell real NSE stocks at live prices",
                  "Track your P&L, positions, and portfolio value",
                  "Candlestick charts with 8 technical indicators",
                  "Zero financial risk — learn from mistakes freely",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--green)", fontSize: 12, fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <button onClick={onNotYet} className="btn-primary" style={{ padding: "12px 28px", fontSize: 15 }}>
                Start Mock Trading →
              </button>
            </div>
            {/* Visual preview */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
              padding: 24, height: 320, display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div><div style={{ fontSize: 16, fontWeight: 700 }}>RELIANCE</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>Reliance Industries Ltd</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>₹1,348</div><div style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>+1.2%</div></div>
              </div>
              {/* Mini chart bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, flex: 1, padding: "10px 0" }}>
                {[40,55,48,62,58,70,65,78,72,85,80,92,88,95,90,98,94,88,96,100].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i >= 17 ? "var(--green)" : `rgba(99,220,160,${0.15 + i * 0.03})`, borderRadius: "2px 2px 0 0", transition: "height 0.5s" }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
                <span>Portfolio: ₹9.87L</span>
                <span>P&L: <span style={{ color: "var(--green)" }}>+₹12,340</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ padding: "48px 20px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24 }}>
          {[
            { val: "30", label: "Course Modules", color: "var(--green)" },
            { val: "268", label: "Video Lessons", color: "var(--blue)" },
            { val: "139", label: "Hours of Content", color: "var(--amber)" },
            { val: "8", label: "Sections", color: "var(--purple)" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 120 }}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ ...sectionStyle, maxWidth: 680 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--purple)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700 }}>Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
                overflow: "hidden", transition: "all 0.2s",
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", padding: "16px 20px", background: "none", border: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", color: "var(--text-primary)", fontFamily: "'DM Sans',sans-serif",
                  fontSize: 15, fontWeight: 600, textAlign: "left",
                }}>
                  {faq.q}
                  <span style={{ fontSize: 18, color: "var(--text-muted)", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 12 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 16px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", bottom: "-30%", left: "50%", transform: "translateX(-50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,220,160,0.06), transparent 70%)", filter: "blur(60px)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, marginBottom: 12 }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
            Join thousands of learners building real market skills. It takes 4 minutes to complete your first lesson.
          </p>
          <button onClick={onNotYet} className="btn-primary" style={{ padding: "14px 36px", fontSize: 16 }}>
            Start Learning — Free →
          </button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "32px 20px", borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
        <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--gradient-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--btn-text)" }}>F</div>
            <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>Finscure</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>© 2026 Aspire Educational Technologies LLC</span>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "var(--text-muted)" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </div>
      </footer>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
