import { useNavigate } from "react-router-dom";

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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        CodeBasiks
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "2rem" }}>
        Learn programming fundamentals step by step, through interactive lessons and real coding exercises.
      </p>
      <button
        onClick={() => navigate("/lesson/01")}
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Start
      </button>
    </div>
  );
}
