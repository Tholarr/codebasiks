import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Register
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const existing = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    if (existing.rows.length > 0)
      return res.status(409).json({ error: "Username already taken" });

    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [username, password_hash]
    );

    const token = jwt.sign({ id: result.rows[0].id, username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, username });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid username or password" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, username });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
