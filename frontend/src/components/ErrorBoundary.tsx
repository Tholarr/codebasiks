import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: 500,
          margin: "6rem auto",
          padding: "2rem",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "8rem", fontWeight: "bold", color: "#c62828", margin: 0, lineHeight: 1 }}>
            500
          </p>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#333", margin: "1rem 0 0.5rem" }}>
            Something exploded
          </p>
          <p style={{ color: "#888", marginBottom: "2rem" }}>
            A wild bug appeared. It was super effective.
          </p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = "/"; }}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: "#c62828",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Back to home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
