import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { primaryButtonStyle } from "../styles/common";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Navbar />
      <div style={{
        maxWidth: 500,
        margin: "6rem auto",
        padding: "2rem",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "8rem", fontWeight: "bold", color: "#2e7d32", margin: 0, lineHeight: 1 }}>
          404
        </p>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#333", margin: "1rem 0 0.5rem" }}>
          Oops!
        </p>
        <p style={{ color: "#888", marginBottom: "2rem" }}>
          The page you are looking for was not found.
        </p>
        <button onClick={() => navigate("/")} style={primaryButtonStyle}>
          Back to home
        </button>
      </div>
    </PageWrapper>
  );
}
