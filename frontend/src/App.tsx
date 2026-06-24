import { useState } from "react";
import { useNavigate } from "react-router-dom";

const choices = ["The program skips the loop entirely", "The loop runs forever", "The program crashes immediately", "The loop runs exactly once"];
const correct = "The loop runs forever";

const starterCode = `#include <unistd.h>

int my_print_alpha(void)
{
    // Your code here
}
`;

const expectedOutput = "abcdefghijklmnopqrstuvwxyz";

type RunResult = {
  success: boolean;
  reason: string;
  stdout?: string;
  expected?: string;
  details?: string;
};

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState(starterCode);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const navigate = useNavigate();

  const getColor = (choice: string): string => {
    if (!verified) return "black";
    if (choice === correct) return "green";
    if (choice === selected) return "red";
    return "black";
  };

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
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif", lineHeight: 1.7 }}>
      <button onClick={() => navigate("/")} style={secondaryButtonStyle}>
        ← Back to Home
      </button>

      {/* ── Lesson ── */}
      <h1>Characters and loops in C</h1>

      <p>
        In C, every piece of data has a <strong>type</strong>. The type tells the program what kind
        of value a variable holds: a whole number, a decimal number, or a single character.
      </p>
      <p>
        To store a single character, C provides the <code>char</code> type. A <code>char</code> can
        hold any single character: a letter, a digit, or a symbol. You declare and assign one like this:
      </p>
      <pre style={codeBlockStyle}>
{`char c;
c = 'a';`}
      </pre>
      <p>
        Notice that characters are always written between <strong>single quotes</strong> <code>' '</code>.
        This is how C knows you mean the character <code>a</code>, and not something else.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        Characters in C are closely related to numbers. Under the hood, each character corresponds
        to a numeric value. The alphabet is ordered, which means the characters <code>'a'</code> through <code>'z'</code> follow
        each other in a predictable sequence. This has an interesting implication: you can perform
        arithmetic on characters just like on integers.
      </p>
      <p>
        For example, if <code>c</code> holds the value <code>'a'</code>, then <code>c++</code> moves
        it to the next character in the sequence. You can also compare characters with operators
        like <code>{"<="}</code> or <code>==</code>.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>A <strong>while loop</strong> repeats a block of code as long as a given condition remains true:</p>
      <pre style={codeBlockStyle}>
{`while (condition)
{
    // code to repeat
}`}
      </pre>
      <p>
        The condition is checked before each iteration. The moment it becomes false, the loop stops.
        If it never becomes false, the loop runs forever (something to be careful about).
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        To display output in C, one of the available tools is the <code>write</code> function,
        which comes from the <code>&lt;unistd.h&gt;</code> library:
      </p>
      <pre style={codeBlockStyle}>
{`write(1, &c, 1);`}
      </pre>
      <p>This function takes three arguments:</p>
      <ul>
        <li>The first is the destination: <code>1</code> means the terminal</li>
        <li>The second is the address of the data to write: <code>&c</code> gives the address of the variable <code>c</code></li>
        <li>The third is the number of bytes to write: a single <code>char</code> occupies exactly <code>1</code> byte</li>
      </ul>
      <p>
        Unlike <code>printf</code>, <code>write</code> is a low-level function that directly
        communicates with the operating system. It is the foundation upon which higher-level
        display functions are built.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ── Question ── */}
      <h2>Question</h2>
      <p><strong>What happens if the condition of a <code>while</code> loop never becomes false?</strong></p>

      {choices.map(choice => (
        <label key={choice} style={{ display: "block", margin: "0.4rem 0", color: getColor(choice) }}>
          <input
            type="radio"
            name="answer"
            value={choice}
            checked={selected === choice}
            onChange={() => !verified && setSelected(choice)}
          />
          {" "}{choice}
        </label>
      ))}

      <button onClick={() => setVerified(true)} style={secondaryButtonStyle}>
        Verify
      </button>

      <hr style={{ margin: "2rem 0" }} />

      {/* ── Exercise ── */}
      <h2>Task 01 - my_print_alpha</h2>
      <p><strong>Delivery:</strong> my_print_alpha.c</p>
      <p>
        Write a function that, beginning with <strong>a</strong>, displays the lowercase alphabet
        in ascending order, on a single line. It must be prototyped as follows:
      </p>
      <pre style={codeBlockStyle}>int my_print_alpha(void);</pre>

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

      <button onClick={runCode} disabled={running} style={secondaryButtonStyle}>
        {running ? "Running..." : "Run"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: result.success ? "#1e3a1e" : "#3a1e1e",
            color: result.success ? "#8fdb8f" : "#db8f8f",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
          }}
        >
          {resultMessage()}
        </pre>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={() => navigate("/lesson/02")}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

const codeBlockStyle: React.CSSProperties = {
  backgroundColor: "#1e1e1e",
  color: "#d4d4d4",
  padding: "1rem",
  borderRadius: "4px",
  fontFamily: "monospace",
  fontSize: "14px",
  overflowX: "auto",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "0.5rem 1.25rem",
  fontSize: "0.9rem",
  cursor: "pointer",
  backgroundColor: "#999999",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginTop: "1rem",
};
