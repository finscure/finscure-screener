import { useState } from "react";

// Sample article content for each course topic
const SAMPLE_ARTICLES = {
  "NSE vs BSE — Understanding Indian Exchanges": {
    content: [
      { type: "heading", text: "India's Two Major Stock Exchanges" },
      { type: "paragraph", text: "India has two primary stock exchanges where securities are traded — the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). Both play a crucial role in the Indian capital markets, but they have distinct characteristics that every investor should understand." },
      { type: "heading", text: "National Stock Exchange (NSE)" },
      { type: "paragraph", text: "Founded in 1992, the NSE is the largest stock exchange in India by trading volume. Its benchmark index is the NIFTY 50, which tracks 50 of the largest and most liquid stocks. NSE was the first exchange in India to introduce electronic screen-based trading, which revolutionized how stocks were bought and sold." },
      { type: "callout", text: "Key Fact: NSE handles over 90% of India's equity derivatives trading volume." },
      { type: "heading", text: "Bombay Stock Exchange (BSE)" },
      { type: "paragraph", text: "Established in 1875, the BSE is Asia's oldest stock exchange. Its benchmark index is the SENSEX, which tracks 30 well-established companies. While BSE has more listed companies (~5,900+), NSE dominates in terms of trading volume and liquidity." },
      { type: "heading", text: "Key Differences" },
      { type: "table", headers: ["Feature", "NSE", "BSE"], rows: [
        ["Founded", "1992", "1875"],
        ["Benchmark Index", "NIFTY 50", "SENSEX"],
        ["Listed Companies", "~2,800", "~5,900"],
        ["Trading Volume", "Higher", "Lower"],
        ["Index Companies", "50", "30"],
      ]},
      { type: "heading", text: "Which Exchange Should You Trade On?" },
      { type: "paragraph", text: "Most retail investors trade on NSE due to its higher liquidity, tighter bid-ask spreads, and larger number of derivatives products. However, some smaller companies are exclusively listed on BSE, making it relevant for investors looking at micro-cap opportunities." },
      { type: "callout", text: "Tip: Most brokers give you access to both exchanges. Your orders are automatically routed to the exchange offering the best price." },
    ]
  },
};

const DEFAULT_ARTICLE = {
  content: [
    { type: "heading", text: "Lesson Content" },
    { type: "paragraph", text: "This lesson content is being prepared. In the final version, this will contain comprehensive written material covering the topic in depth." },
    { type: "callout", text: "Tip: Content for all lessons will be added as the platform develops. You can still mark this lesson as complete and move forward." },
    { type: "paragraph", text: "Topics that will be covered in this lesson include key concepts, real-world examples from the Indian stock market, practical tips, and important terminology that every investor should know." },
    { type: "heading", text: "What You'll Learn" },
    { type: "paragraph", text: "Each article lesson includes clear explanations, data tables, callout boxes with key insights, and a summary section to reinforce your understanding before moving to the next topic." },
  ]
};

export default function LessonViewer({ lesson, isCompleted, onMarkComplete, onNext }) {
  const [completed, setCompleted] = useState(isCompleted);

  const handleComplete = () => {
    setCompleted(true);
    onMarkComplete();
  };

  const article = SAMPLE_ARTICLES[lesson.title] || DEFAULT_ARTICLE;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 28px 48px" }}>
      {/* Lesson Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            background: lesson.type === "video" ? "#fef3c7" : "#f0fdf4",
            color: lesson.type === "video" ? "#d97706" : "#16a34a",
            letterSpacing: ".04em", textTransform: "uppercase",
          }}>
            {lesson.type === "video" ? "▶ Video" : "📄 Article"} · {lesson.duration}
          </span>
          {(completed || isCompleted) && (
            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#dcfce7", color: "#16a34a" }}>
              ✓ Completed
            </span>
          )}
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 26, fontWeight: 700, color: "#1e1b3a",
          margin: 0, lineHeight: 1.3, letterSpacing: "-.02em",
        }}>
          {lesson.title}
        </h1>
      </div>

      {/* Video Player */}
      {lesson.type === "video" && (
        <div style={{
          width: "100%", aspectRatio: "16/9",
          background: "linear-gradient(135deg, #1a0a3e, #2D1B69)",
          borderRadius: 14, marginBottom: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 12,
          border: "1px solid #ede9fe",
        }}>
          {lesson.videoUrl ? (
            <iframe
              src={lesson.videoUrl}
              style={{ width: "100%", height: "100%", borderRadius: 14, border: "none" }}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(124,58,237,.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, color: "#c4b5fd",
              }}>▶</div>
              <p style={{ color: "#a78bfa", fontSize: 14, fontWeight: 500 }}>Video coming soon</p>
              <p style={{ color: "#64748b", fontSize: 12, maxWidth: 300, textAlign: "center", lineHeight: 1.5 }}>
                The video lesson will be embedded here. You can still read the article content below and mark this lesson as complete.
              </p>
            </>
          )}
        </div>
      )}

      {/* Article Content */}
      <div style={{ marginBottom: 36 }}>
        {article.content.map((block, idx) => {
          if (block.type === "heading") {
            return (
              <h2 key={idx} style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 20, fontWeight: 600, color: "#1e1b3a",
                margin: idx === 0 ? "0 0 14px" : "28px 0 14px",
                lineHeight: 1.3,
              }}>
                {block.text}
              </h2>
            );
          }
          if (block.type === "paragraph") {
            return (
              <p key={idx} style={{
                fontSize: 14.5, color: "#374151", lineHeight: 1.8,
                margin: "0 0 16px",
              }}>
                {block.text}
              </p>
            );
          }
          if (block.type === "callout") {
            return (
              <div key={idx} style={{
                padding: "14px 18px",
                background: "#f5f3ff",
                borderLeft: "4px solid #7c3aed",
                borderRadius: "0 10px 10px 0",
                margin: "18px 0",
                fontSize: 13.5, color: "#2D1B69",
                lineHeight: 1.6, fontWeight: 500,
              }}>
                {block.text}
              </div>
            );
          }
          if (block.type === "table") {
            return (
              <div key={idx} style={{ overflowX: "auto", margin: "18px 0" }}>
                <table style={{
                  width: "100%", borderCollapse: "collapse",
                  fontSize: 13, borderRadius: 10, overflow: "hidden",
                  border: "1px solid #ede9fe",
                }}>
                  <thead>
                    <tr>
                      {block.headers.map((h, i) => (
                        <th key={i} style={{
                          padding: "10px 14px", background: "#faf9fe",
                          color: "#2D1B69", fontWeight: 700, fontSize: 12,
                          textAlign: "left", borderBottom: "2px solid #ede9fe",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{
                            padding: "9px 14px",
                            borderBottom: "1px solid #f1f0f9",
                            color: ci === 0 ? "#1e1b3a" : "#64748b",
                            fontWeight: ci === 0 ? 600 : 400,
                          }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "20px 0", borderTop: "1px solid #ede9fe",
      }}>
        {!(completed || isCompleted) ? (
          <button onClick={handleComplete} style={{
            padding: "11px 24px", background: "#2D1B69", color: "#fff",
            border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 8,
            transition: "all .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#3d2b7a"}
            onMouseLeave={e => e.currentTarget.style.background = "#2D1B69"}
          >
            ✓ Mark as Complete
          </button>
        ) : (
          <div style={{
            padding: "11px 24px", background: "#dcfce7",
            borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#16a34a",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            ✓ Completed
          </div>
        )}

        <button onClick={onNext} style={{
          padding: "11px 24px",
          background: "#fff", color: "#7c3aed",
          border: "1.5px solid #e9e5f5", borderRadius: 10,
          fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", gap: 6,
          transition: "all .2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
