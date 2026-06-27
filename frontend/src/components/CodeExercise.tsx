import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { secondaryButtonStyle } from "../styles/common";
import CodeBlock from "./CodeBlock";

type RunResult = {
  success: boolean;
  reason: string;
  stdout?: string;
  expected?: string;
  details?: string;
};

type Props = {
  title: string;
  description: React.ReactNode;
  prototype: string;
  starterCode: string;
  expectedOutput: string;
  functionCall: string;
  taskId: string;
  savedCode?: string | null;
  onSuccess?: (code: string) => void;
};

export default function CodeExercise({
  title, description, prototype,
  starterCode, expectedOutput, functionCall,
  taskId, savedCode, onSuccess,
}: Props) {
  const [code, setCode] = useState(starterCode);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [completed, setCompleted] = useState(false);

  // Update code and mark as completed when savedCode arrives from DB
  useEffect(() => {
    if (savedCode) {
      setCode(savedCode);
      setCompleted(true);
      setResult({ success: true, reason: "ok" });
    }
  }, [savedCode]);

  const runCode = async () => {
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, expectedOutput, functionCall }),
      });
      const data: RunResult = await res.json();
      setResult(data);
      if (data.success) {
        setCompleted(true);
        onSuccess?.(code);
      }
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
      <h2>{title} {completed && <span style={{ color: "green", fontSize: "1rem" }}>✅</span>}</h2>
      <p>{description}</p>

      <CodeBlock code={prototype} />

      {completed ? (
        <CodeBlock code={code} />
      ) : (
        <Editor
          height="200px"
          language="c"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            lineNumbers: "on",
          }}
        />
      )}

      {!completed && (
        <button onClick={runCode} disabled={running} style={{ ...secondaryButtonStyle, marginTop: "0.5rem" }}>
          {running ? "Running..." : "Run"}
        </button>
      )}

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
