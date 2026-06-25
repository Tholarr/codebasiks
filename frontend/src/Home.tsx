import { useNavigate } from "react-router-dom";
import { primaryButtonStyle } from "./styles/common";
import Navbar from "./components/Navbar";

const modules = [
  { name: "Variables, Loops and Conditions", path: "/module/01" },
  { name: "Pointers", path: "/module/02" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />

      <div style={{
        maxWidth: 740,
        margin: "0 auto",
        padding: "4rem 2rem",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>CodeBasiks</h1>
        <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "2rem" }}>
          Learn programming fundamentals step by step, through interactive lessons and real coding exercises.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {modules.map(mod => (
            <button key={mod.path} onClick={() => navigate(mod.path)} style={primaryButtonStyle}>
              {mod.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
