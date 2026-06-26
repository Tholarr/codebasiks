import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import { sendInactivityEmail } from "../mail";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Middleware that checks JWT token
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

// GET /api/user/stats
router.get("/stats", requireAuth, async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const [lessonsResult, scoreResult, totalResult, totalLessonsResult] = await Promise.all([
      pool.query(
        "SELECT COUNT(*) as completed FROM lesson_progress WHERE user_id = $1 AND completed = true",
        [userId]
      ),
      pool.query(
        "SELECT COALESCE(SUM(score), 0) as total_score FROM lesson_progress WHERE user_id = $1",
        [userId]
      ),
      pool.query(
        "SELECT COALESCE(SUM(total), 0) as total_possible FROM lesson_totals"
      ),
      pool.query(
        "SELECT COUNT(*) as total FROM lesson_totals"
      ),
    ]);

    const lessonsCompleted = parseInt(lessonsResult.rows[0].completed);
    const totalScore = parseInt(scoreResult.rows[0].total_score);
    const totalPossible = parseInt(totalResult.rows[0].total_possible);
    const globalPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
    const totalLessons = parseInt(totalLessonsResult.rows[0].total);

    res.json({
      lessonsCompleted,
      totalLessons,
      globalPct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/user/test-email
router.post("/test-email", requireAuth, async (req: any, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT username, email FROM users WHERE id = $1",
      [req.user.id]
    );

    const user = result.rows[0];

    if (!user.email)
      return res.status(400).json({ error: "No email address on your account." });

    await sendInactivityEmail(user.email, user.username, 1);
    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
