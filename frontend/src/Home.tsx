import { useNavigate } from "react-router-dom";
import { primaryButtonStyle } from "./styles/common";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: 740,
      margin: "0 auto",
      padding: "4rem 2rem",
      fontFamily: "sans-serif",
      textAlign: "center",
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>CodeBasiks</h1>
      <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "2rem" }}>
        Learn programming fundamentals step by step, through interactive lessons and real coding exercises.
      </p>
      <button onClick={() => navigate("/module/01/lesson/01")} style={primaryButtonStyle}>
        Start
      </button>
    </div>
  );
}
