import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Finscure Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--bg-primary)", padding: 20,
        }}>
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: "'Playfair Display',serif" }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
              An unexpected error occurred. This has been logged. Please try refreshing the page.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => window.location.reload()}
                style={{
                  padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                  background: "var(--gradient-green)", color: "var(--btn-text)",
                  border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                }}>
                Refresh Page
              </button>
              <button onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                  background: "var(--surface)", color: "var(--text-secondary)",
                  border: "1px solid var(--border)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                }}>
                Try Again
              </button>
            </div>
            {this.state.error && (
              <details style={{ marginTop: 24, textAlign: "left" }}>
                <summary style={{ fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}>Error details</summary>
                <pre style={{
                  marginTop: 8, padding: 12, background: "var(--surface)", borderRadius: 8,
                  fontSize: 11, color: "var(--red)", overflow: "auto", maxHeight: 120,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
