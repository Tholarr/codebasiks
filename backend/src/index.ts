import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { exec } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import cron from "node-cron";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import progressRouter from "./routes/progress";
import { pool } from "./db";
import { sendInactivityEmail } from "./mail";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const execEnv = {
  ...process.env,
  PATH: `C:\\msys64\\mingw64\\bin;${process.env.PATH}`,
};

app.use(cors({ origin: ["http://localhost:5173", "https://codebasiks.vercel.app"] }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/progress", progressRouter);

// Ping route to keep Render awake
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

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

      const output = stdout.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      const success = output === expectedOutput.trim();

      res.json({ success, reason: success ? "ok" : "wrong_output", stdout: output, expected: expectedOutput });
    });
  });
});

function cleanup(...paths: string[]) {
  paths.forEach(p => { try { unlinkSync(p); } catch {} });
}

// Keep Render awake every 5 minutes (test mode)
cron.schedule("*/5 * * * *", async () => {
  try {
    await fetch(`https://codebasiks.onrender.com/api/ping`);
    console.log(">> Keep-alive ping sent");
  } catch {}
});

// Run inactivity check every 5 minutes (test mode)
cron.schedule("*/5 * * * *", async () => {
  console.log(">> Running inactivity check...");
  try {
    const result = await pool.query(`
      SELECT id, username, email, last_active
      FROM users
      WHERE email IS NOT NULL
      AND last_active < NOW() - INTERVAL '5 minutes'
    `);

    for (const user of result.rows) {
      const minutesSince = Math.floor(
        (Date.now() - new Date(user.last_active).getTime()) / (1000 * 60)
      );
      await sendInactivityEmail(user.email, user.username, minutesSince);
      console.log(`>> Email sent to ${user.username}`);
    }

    console.log(`>> Done - ${result.rows.length} email(s) sent`);
  } catch (error) {
    console.error("Inactivity job error:", error);
  }
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
