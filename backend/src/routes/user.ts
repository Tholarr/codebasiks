import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Middleware that check JWT token
function requireAuth(req: any, res: Response, next: any) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// GET /api/user/me
router.get("/me", requireAuth, async (req: any, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, username, created_at FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
