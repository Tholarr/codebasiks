import express from "express";
import cors from "cors";
import { exec } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const app = express();
const PORT = 3001;

const execEnv = {
  ...process.env,
  PATH: `C:\\msys64\\mingw64\\bin;${process.env.PATH}`,
};

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/execute", (req, res) => {
  const { code, expectedOutput, functionCall } = req.body as {
    code: string;
    expectedOutput: string;
    functionCall: string;
  };

  const fullSource = `
${code}

int main(void)
{
    ${functionCall};
    return 0;
}
`;

  const id      = Date.now();
  const srcPath = join(tmpdir(), `code_${id}.c`);
  const binPath = join(tmpdir(), `code_${id}`);

  writeFileSync(srcPath, fullSource);

  exec(`gcc "${srcPath}" -o "${binPath}"`, { timeout: 10000, env: execEnv }, (compileErr, _, compileStderr) => {
    if (compileErr) {
      cleanup(srcPath, binPath);
      return res.json({ success: false, reason: "compile_error", details: compileStderr });
    }

    exec(`"${binPath}"`, { timeout: 5000, env: execEnv }, (runErr, stdout, stderr) => {
      cleanup(srcPath, binPath);

      if (runErr && !stdout) {
        return res.json({ success: false, reason: "runtime_error", details: stderr });
      }

      const output  = stdout.trim();
      const success = output === expectedOutput.trim();

      res.json({ success, reason: success ? "ok" : "wrong_output", stdout: output, expected: expectedOutput });
    });
  });
});

function cleanup(...paths: string[]) {
  paths.forEach(p => { try { unlinkSync(p); } catch {} });
}

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
