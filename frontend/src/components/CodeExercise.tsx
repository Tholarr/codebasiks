import { useState } from "react";
import { codeBlockStyle, secondaryButtonStyle } from "../styles/common";

type RunResult = {
  success: boolean;
  reason: string;
  stdout?: string;
  expected?: string;
  details?: string;
};

type Props = {
  title: string;
  delivery: string;
  description: React.ReactNode;
  prototype: string;
  starterCode: string;
  expectedOutput: string;
};

export default function CodeExercise({ title, delivery, description, prototype, starterCode, expectedOutput }: Props) {
  const [code, setCode] = useState(starterCode);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);

  const runCode = async () => {
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, expectedOutput }),
      });
      const data: RunResult = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, reason: "network_error" });
    } finally {
      setRunning(false);
    }
  };

  const resultMessage = () => {
    if (!result) return null;
    if (result.success) return "✅ Correct! Output matches.";
    if (result.reason === "compile_error") return `❌ Compilation error:\n${result.details}`;
    if (result.reason === "runtime_error") return `❌ Runtime error:\n${result.details}`;
    if (result.reason === "wrong_output")
      return `❌ Wrong output.\nExpected: "${result.expected}"\nGot: "${result.stdout}"`;
    return `❌ Error: ${result.reason}`;
  };

  return (
    <div>
      <h2>{title}</h2>
      <p><strong>Delivery:</strong> {delivery}</p>
      <p>{description}</p>
      <pre style={codeBlockStyle}>{prototype}</pre>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          height: "200px",
          marginTop: "1rem",
          fontFamily: "monospace",
          fontSize: "14px",
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          border: "1px solid #444",
          borderRadius: "4px",
          padding: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button onClick={runCode} disabled={running} style={{ ...secondaryButtonStyle, marginTop: "0.5rem" }}>
        {running ? "Running..." : "Run"}
      </button>

      {result && (
        <pre style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: result.success ? "#1e3a1e" : "#3a1e1e",
          color: result.success ? "#8fdb8f" : "#db8f8f",
          borderRadius: "4px",
          whiteSpace: "pre-wrap",
        }}>
          {resultMessage()}
        </pre>
      )}
    </div>
  );
}
