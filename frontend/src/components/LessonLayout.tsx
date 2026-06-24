import { useNavigate } from "react-router-dom";
import { primaryButtonStyle, secondaryButtonStyle } from "../styles/common";

type Props = {
  title: string;
  nextPath?: string;
  children: React.ReactNode;
};

export default function LessonLayout({ title, nextPath, children }: Props) {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif", lineHeight: 1.7 }}>
      <button onClick={() => navigate("/")} style={secondaryButtonStyle}>
        ← Back to Home
      </button>

      <h1 style={{ marginTop: "1.5rem" }}>{title}</h1>

      {children}

      {nextPath && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button onClick={() => navigate(nextPath)} style={primaryButtonStyle}>
            Next lesson
          </button>
        </div>
      )}
    </div>
  );
}
