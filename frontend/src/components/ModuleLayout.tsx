import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import PageWrapper from "./PageWrapper";
import { secondaryButtonStyle } from "../styles/common";
import { useModuleProgress } from "../hooks/useModuleProgress";

type Lesson = {
  title: string;
  description: string;
  path: string;
  icon: string;
  lessonId: string;
  total: number;
};

type Props = {
  title: string;
  moduleId: string;
  description: string;
  lessons: Lesson[];
};

export default function ModuleLayout({ title, moduleId, description, lessons }: Props) {
  const navigate = useNavigate();
  const { isCompleted, stars } = useModuleProgress(moduleId);
  const totalPerLesson = lessons.map(l => l.total);
  const starsDisplay = "★".repeat(stars(totalPerLesson)) + "☆".repeat(3 - stars(totalPerLesson));

  return (
    <PageWrapper>
      <Navbar />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem", lineHeight: 1.7, fontFamily: "sans-serif" }}>
        <button onClick={() => navigate("/")} style={secondaryButtonStyle}>
          ← Back to Home
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
          <h1 style={{ margin: 0 }}>{title}</h1>
          <span style={{ fontSize: "1.5rem", color: "#f5a623" }}>{starsDisplay}</span>
        </div>
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
              <div style={{
                backgroundColor: "#1b3a2f",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1.25rem",
                fontSize: "2rem",
              }}>
                <span>{lesson.icon}</span>
                {isCompleted(lesson.lessonId) && (
                  <span style={{ fontSize: "0.75rem", backgroundColor: "#2e7d32", color: "white", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                    Completed
                  </span>
                )}
              </div>

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
    </PageWrapper>
  );
}
