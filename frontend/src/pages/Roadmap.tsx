import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { useModuleProgress } from "../hooks/useModuleProgress";

type Lesson = {
  id: string;
  title: string;
  path: string;
};

type Module = {
  moduleId: string;
  title: string;
  icon: string;
  path: string;
  totalPerLesson: number[];
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    moduleId: "module01",
    title: "Variables, Loops and Conditions",
    icon: "🔤",
    path: "/module/01",
    totalPerLesson: [4, 4],
    lessons: [
      { id: "module01-lesson01", title: "Characters and loops in C", path: "/module/01/lesson/01" },
      { id: "module01-lesson02", title: "Conditions, parameters and nested loops", path: "/module/01/lesson/02" },
    ],
  },
  {
    moduleId: "module02",
    title: "Pointers",
    icon: "📍",
    path: "/module/02",
    totalPerLesson: [2, 3, 4],
    lessons: [
      { id: "module02-lesson01", title: "Introduction to pointers", path: "/module/02/lesson/01" },
      { id: "module02-lesson02", title: "Pointers and strings", path: "/module/02/lesson/02" },
      { id: "module02-lesson03", title: "String manipulation and arrays", path: "/module/02/lesson/03" },
    ],
  },
    {
    moduleId: "module03",
    title: "Functions and Recursion",
    icon: "🔄",
    path: "/module/03",
    totalPerLesson: [3, 3, 4, 2],
    lessons: [
      { id: "module03-lesson01", title: "Iteration", path: "/module/03/lesson/01" },
      { id: "module03-lesson02", title: "Recursion", path: "/module/03/lesson/02" },
      { id: "module03-lesson03", title: "Number theory", path: "/module/03/lesson/03" },
      { id: "module03-lesson04", title: "Backtracking", path: "/module/03/lesson/04" },
    ],
  },
];

function ModuleCard({ mod }: { mod: Module }) {
  const navigate = useNavigate();
  const { stars, isCompleted, loaded } = useModuleProgress(mod.moduleId);
  const starsCount = loaded ? stars(mod.totalPerLesson) : 0;
  const starsStr = "★".repeat(starsCount) + "☆".repeat(3 - starsCount);

  const borderColor = !loaded ? "#ddd"
    : starsCount === 3 ? "#f5a623"
    : starsCount > 0 ? "#2e7d32"
    : "#ddd";

  return (
    <div style={{
      border: `1px solid ${borderColor}`,
      borderRadius: "8px",
      padding: "1.25rem",
      marginBottom: "1rem",
    }}>
      {/* Module header */}
      <div
        onClick={() => navigate(mod.path)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        <span style={{
          fontSize: "1.5rem",
          backgroundColor: "#1b3a2f",
          borderRadius: "8px",
          padding: "0.4rem 0.6rem",
        }}>
          {mod.icon}
        </span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "0.95rem", color: "#333" }}>
            {mod.title}
          </p>
          {loaded && (
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#f5a623" }}>
              {starsStr}
            </p>
          )}
        </div>
        <span style={{ fontSize: "0.85rem", color: borderColor === "#ddd" ? "#aaa" : borderColor, fontWeight: "bold" }}>
          {starsCount === 3 ? "Completed ✓" : starsCount > 0 ? "In progress →" : "Not started"}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "#f0f0f0", marginBottom: "1rem" }} />

      {/* Lessons list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {mod.lessons.map((lesson, i) => {
          const done = isCompleted(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => navigate(lesson.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                padding: "0.4rem 0.5rem",
                borderRadius: "6px",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: done ? "#2e7d32" : "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: done ? "white" : "#888",
                fontWeight: "bold",
                flexShrink: 0,
              }}>
                {done ? "✓" : String(i + 1).padStart(2, "0")}
              </div>
              <span style={{
                fontSize: "0.875rem",
                color: done ? "#2e7d32" : "#888",
                fontWeight: done ? "500" : "normal",
              }}>
                {lesson.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <PageWrapper>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>Roadmap</h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Your learning path through CodeBasiks.
        </p>

        {modules.map(mod => (
          <ModuleCard key={mod.moduleId} mod={mod} />
        ))}
      </div>
    </PageWrapper>
  );
}
