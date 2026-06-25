import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { secondaryButtonStyle } from "../styles/common";

type Lesson = {
  title: string;
  description: string;
  path: string;
  icon: string;
};

type Props = {
  title: string;
  description: string;
  lessons: Lesson[];
};

export default function ModuleLayout({ title, description, lessons }: Props) {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem", lineHeight: 1.7 }}>
        <button onClick={() => navigate("/")} style={secondaryButtonStyle}>
          ← Back to Home
        </button>

        <h1 style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>{title}</h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>{description}</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}>
          {lessons.map(lesson => (
            <div
              key={lesson.path}
              onClick={() => { window.scrollTo(0, 0); navigate(lesson.path); }}
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
              {/* Icon banner */}
              <div style={{
                backgroundColor: "#1b3a2f",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}>
                {lesson.icon}
              </div>

              {/* Card body */}
              <div style={{ padding: "1rem" }}>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "#2e7d32" }}>
                  {lesson.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#555", lineHeight: 1.5 }}>
                  {lesson.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
