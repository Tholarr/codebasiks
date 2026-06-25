import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Middleware to verify JWT token
function requireAuth(req: any, res: Response, next: any) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// GET /api/progress/:lessonId - fetch progress for a lesson
router.get("/:lessonId", requireAuth, async (req: any, res: Response) => {
  const { lessonId } = req.params;
  const userId = req.user.id;

  try {
    const [progress, quiz, exercises] = await Promise.all([
      pool.query(
        "SELECT * FROM lesson_progress WHERE user_id = $1 AND lesson_id = $2",
        [userId, lessonId]
      ),
      pool.query(
        "SELECT * FROM quiz_answers WHERE user_id = $1 AND lesson_id = $2",
        [userId, lessonId]
      ),
      pool.query(
        "SELECT * FROM exercise_submissions WHERE user_id = $1 AND lesson_id = $2",
        [userId, lessonId]
      ),
    ]);

    res.json({
      progress: progress.rows[0] || null,
      quiz: quiz.rows[0] || null,
      exercises: exercises.rows,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/progress/:lessonId - save progress when user clicks Next
router.post("/:lessonId", requireAuth, async (req: any, res: Response) => {
  const { lessonId } = req.params;
  const userId = req.user.id;
  const { total, quizAnswer, quizCorrect, exercises } = req.body as {
    total: number;
    quizAnswer: string | null;
    quizCorrect: boolean;
    exercises: { taskId: string; code: string; success: boolean }[];
  };

  try {
    // Score = correct quiz + successful exercises
    const score = (quizCorrect ? 1 : 0) + exercises.filter(e => e.success).length;

    // Upsert lesson progress
    await pool.query(
      `INSERT INTO lesson_progress (user_id, lesson_id, completed, score, total, updated_at)
       VALUES ($1, $2, true, $3, $4, NOW())
       ON CONFLICT (user_id, lesson_id)
       DO UPDATE SET completed = true, score = $3, total = $4, updated_at = NOW()`,
      [userId, lessonId, score, total]
    );

    // Upsert quiz answer if provided
    if (quizAnswer !== null) {
      await pool.query(
        `INSERT INTO quiz_answers (user_id, lesson_id, answer, correct, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id, lesson_id)
         DO UPDATE SET answer = $3, correct = $4, updated_at = NOW()`,
        [userId, lessonId, quizAnswer, quizCorrect]
      );
    }

    // Upsert each successful exercise submission
    for (const ex of exercises) {
      if (ex.success) {
        await pool.query(
          `INSERT INTO exercise_submissions (user_id, lesson_id, task_id, code, success, updated_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           ON CONFLICT (user_id, lesson_id, task_id)
           DO UPDATE SET code = $4, success = $5, updated_at = NOW()`,
          [userId, lessonId, ex.taskId, ex.code, ex.success]
        );
      }
    }

    res.json({ success: true, score, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
