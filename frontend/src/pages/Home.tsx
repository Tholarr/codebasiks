import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar";
import { useModuleProgress } from "../hooks/useModuleProgress";

const modules = [
  {
    name: "Variables, Loops and Conditions",
    description: "Learn the building blocks of C programming: how to store data, repeat actions, and make decisions.",
    path: "/module/01",
    icon: "🔤",
    moduleId: "module01",
    totalPerLesson: [4, 4],
  },
  {
    name: "Pointers",
    description: "Understand how memory works in C and how pointers let you directly manipulate it.",
    path: "/module/02",
    icon: "📍",
    moduleId: "module02",
    totalPerLesson: [2, 3, 4],
  },
];

function ModuleCard({ mod }: { mod: typeof modules[0] }) {
  const navigate = useNavigate();
  const { stars } = useModuleProgress(mod.moduleId);
  const starsDisplay = "★".repeat(stars(mod.totalPerLesson)) + "☆".repeat(3 - stars(mod.totalPerLesson));

  return (
    <div
      onClick={() => { window.scrollTo(0, 0); navigate(mod.path); }}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{
        backgroundColor: "#1b3a2f",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        fontSize: "2rem",
      }}>
        <span>{mod.icon}</span>
        <span style={{ fontSize: "1.1rem", color: "#f5a623" }}>{starsDisplay}</span>
      </div>

      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "#2e7d32" }}>
          {mod.name}
        </h3>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#555", lineHeight: 1.5 }}>
          {mod.description}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PageWrapper>
      <div style={{ fontFamily: "sans-serif" }}>
        <Navbar />

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem", lineHeight: 1.7 }}>
          <h1 style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>CodeBasiks</h1>
          <p style={{ color: "#555", marginBottom: "3rem" }}>
            Learn programming fundamentals step by step, through interactive lessons and real coding exercises.
          </p>

          <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Modules</h2>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}>
            {modules.map(mod => (
              <ModuleCard key={mod.path} mod={mod} />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
