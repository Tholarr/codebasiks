import { useNavigate } from "react-router-dom";
import { primaryButtonStyle, secondaryButtonStyle } from "../styles/common";
import PageWrapper from "./PageWrapper";
import Navbar from "./Navbar";
import { useProgress } from "../hooks/useProgress";
import { useAuth } from "../auth/AuthContext";

type Props = {
  title: string;
  lessonId: string;
  total: number;
  modulePath: string;
  prevPath?: string;
  nextPath?: string;
  children: (progress: ReturnType<typeof useProgress>) => React.ReactNode;
};

export default function LessonLayout({ title, lessonId, total, modulePath, prevPath, nextPath, children }: Props) {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const progress = useProgress(lessonId, total);

  const go = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleNext = async (path: string) => {
    await progress.saveProgress();
    go(path);
  };

  const handleReset = async () => {
    if (!confirm("Reset your progress on this lesson?")) return;
    await fetch(`/api/progress/${lessonId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <PageWrapper>
      <Navbar />
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "2rem", lineHeight: 1.7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => go(modulePath)} style={secondaryButtonStyle}>
            ← Back to Module
          </button>
          {user && (
            <button onClick={handleReset} style={{ ...secondaryButtonStyle, color: "#c62828" }}>
              Reset progress
            </button>
          )}
        </div>

        <h1 style={{ marginTop: "1.5rem" }}>{title}</h1>

        {children(progress)}

        {(prevPath || nextPath) && (
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
            {prevPath && (
              <button onClick={() => go(prevPath)} style={secondaryButtonStyle}>
                ← Previous
              </button>
            )}
            {nextPath && (
              <button onClick={() => handleNext(nextPath)} style={primaryButtonStyle}>
                Next →
              </button>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
