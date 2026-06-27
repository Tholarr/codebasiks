import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { secondaryButtonStyle } from "../styles/common";

export default function Module04() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Navbar />
      <div style={{
        maxWidth: 600,
        margin: "6rem auto",
        padding: "2rem",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚧</p>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Coming soon</h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          This module is currently being written. Check back soon!
        </p>
        <button onClick={() => navigate("/")} style={secondaryButtonStyle}>
          ← Back to Home
        </button>
      </div>
    </PageWrapper>
  );
}
