import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  const lines = code.split("\n").length;
  const height = lines * 19 + 16;

  return (
    <div style={{ borderRadius: "6px", overflow: "hidden", margin: "1rem 0" }}>
      <Editor
        height={`${height}px`}
        language="c"
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          lineNumbers: "off",
          folding: false,
          renderLineHighlight: "none",
          scrollbar: { vertical: "hidden", horizontal: "hidden" },
          overviewRulerLanes: 0,
        }}
      />
    </div>
  );
}
