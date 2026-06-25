// import { useNavigate } from "react-router-dom";
// import { primaryButtonStyle, secondaryButtonStyle } from "../styles/common";

// type Props = {
//     title: string;
//     nextPath?: string;
//     children: React.ReactNode;
// };

// export default function LessonLayout({ title, nextPath, children }: Props) {
//     const navigate = useNavigate();

//     return (
//         <div style={{ maxWidth: 740, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif", lineHeight: 1.7 }}>
//             <button onClick={() => { window.scrollTo(0, 0); navigate("/"); }} style={secondaryButtonStyle}>
//                 ← Back to Home
//             </button>

//             <h1 style={{ marginTop: "1.5rem" }}>{title}</h1>

//             {children}

//             {nextPath && (
//                 <div style={{ marginTop: "2rem", textAlign: "center" }}>
//                     <button onClick={() => { window.scrollTo(0, 0); navigate(nextPath); }} style={primaryButtonStyle}>
//                         Next lesson
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
import { useNavigate } from "react-router-dom";
import { primaryButtonStyle, secondaryButtonStyle } from "../styles/common";

type Props = {
  title: string;
  prevPath?: string;
  nextPath?: string;
  children: React.ReactNode;
};

export default function LessonLayout({ title, prevPath, nextPath, children }: Props) {
  const navigate = useNavigate();

  const go = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif", lineHeight: 1.7 }}>
      <button onClick={() => go("/")} style={secondaryButtonStyle}>
        ← Back to Home
      </button>

      <h1 style={{ marginTop: "1.5rem" }}>{title}</h1>

      {children}

      {(prevPath || nextPath) && (
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          {prevPath && (
            <button onClick={() => go(prevPath)} style={primaryButtonStyle}>
              ← Previous lesson
            </button>
          )}
          {nextPath && (
            <button onClick={() => go(nextPath)} style={primaryButtonStyle}>
              Next lesson →
            </button>
          )}
        </div>
      )}
    </div>
  );
}