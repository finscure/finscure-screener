import { useState } from "react";

const PLANS = [
  { id: "monthly", name: "Monthly", price: "₹499", period: "/mo", billing: "Billed monthly", features: ["All courses unlocked", "₹10L mock portfolio", "Basic screener", "Community access"] },
  { id: "annual", name: "Annual", price: "₹299", period: "/mo", billing: "Billed ₹3,588/year", popular: true, save: "Save 40%", features: ["Everything in Monthly", "Advanced screener filters", "Strategy backtesting", "Priority support"] },
  { id: "lifetime", name: "Lifetime", price: "₹7,999", period: "", billing: "One-time payment", save: "Best Value", features: ["Everything in Annual", "Unlimited mock portfolios", "AI-powered insights", "1-on-1 mentorship calls"] },
];

export default function UpgradeModal({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [step, setStep] = useState(1);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--modal-bg)", backdropFilter: "blur(8px)", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18,
        width: "100%", maxWidth: 720, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)", animation: "fadeUp 0.3s ease",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, margin: 0 }}>✦ Upgrade to Pro</h2>
          <div onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "var(--text-secondary)",
          }}>✕</div>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {/* Steps Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
            {[1, 2, 3].map((s, i) => (
              <div key={s} style={{ display: "contents" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, flexShrink: 0, zIndex: 2, transition: "all 0.3s",
                  background: step > s ? "var(--green)" : step === s ? "var(--green-dim)" : "var(--surface)",
                  border: `2px solid ${step >= s ? "var(--green)" : "var(--border)"}`,
                  color: step > s ? "var(--btn-text)" : step === s ? "var(--green)" : "var(--text-muted)",
                }}>{step > s ? "✓" : s}</div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: step > s + 1 ? "var(--green)" : "var(--border)", transition: "background 0.3s" }} />}
              </div>
            ))}
          </div>

          {/* Step 1: Plans */}
          {step === 1 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
                {PLANS.map(plan => (
                  <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} style={{
                    border: `2px solid ${selectedPlan === plan.id ? "var(--green)" : "var(--border)"}`,
                    borderRadius: 14, padding: 22, cursor: "pointer", transition: "all 0.2s",
                    position: "relative", textAlign: "center",
                    background: selectedPlan === plan.id ? "var(--green-dim)" : "transparent",
                  }}>
                    {plan.popular && (
                      <div style={{
                        position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)",
                        background: "var(--gradient-green)", color: "var(--btn-text)",
                        fontSize: 10, fontWeight: 700, padding: "2px 12px", borderRadius: 10, letterSpacing: 0.5, whiteSpace: "nowrap",
                      }}>MOST POPULAR</div>
                    )}
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
                    <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", marginBottom: 2 }}>
                      {plan.price}<span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)" }}>{plan.period}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>{plan.billing}</div>
                    <ul style={{ listStyle: "none", textAlign: "left", padding: 0 }}>
                      {plan.features.map((f, i) => (
                        <li key={i} style={{ fontSize: 13, color: "var(--text-secondary)", padding: "4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: "var(--green)", fontSize: 12 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    {plan.save && (
                      <div style={{ marginTop: 12, fontSize: 11, fontWeight: 700, color: "var(--green)", background: "var(--green-dim)", padding: "4px 12px", borderRadius: 8, display: "inline-block" }}>
                        {plan.save}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Cancel</button>
                <button onClick={() => setStep(2)} className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>Continue to Payment →</button>
              </div>
            </>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <>
              <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Payment Method</div>
                {[
                  { icon: "📱", name: "UPI", desc: "Pay instantly with any UPI app", logos: "GPay · PhonePe · Paytm" },
                  { icon: "💳", name: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", logos: "VISA · MC · RuPay" },
                  { icon: "🏦", name: "Net Banking", desc: "All major banks supported", logos: "SBI · HDFC · ICICI" },
                ].map((m, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 10,
                    border: i === 0 ? "2px solid var(--green)" : "1px solid var(--border)",
                    background: i === 0 ? "var(--green-dim)" : "transparent",
                    marginBottom: 8, cursor: "pointer",
                  }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.desc}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.logos}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
                🔒 256-bit SSL Encrypted · PCI DSS Compliant · RBI Approved
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ padding: "10px 24px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>← Back</button>
                <button onClick={() => setStep(3)} className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>🔒 Pay Now</button>
              </div>
            </>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Welcome to Finscure Pro!</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>Your payment was successful. All Pro features are now unlocked.</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
                {["✦ All Courses", "📊 Advanced Screener", "🎯 Strategy Backtesting", "🤖 AI Insights"].map(f => (
                  <span key={f} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--green-dim)", color: "var(--green)", fontSize: 13, fontWeight: 600 }}>{f}</span>
                ))}
              </div>
              <button onClick={onClose} className="btn-primary" style={{ padding: "12px 32px", fontSize: 15 }}>Start Exploring →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
