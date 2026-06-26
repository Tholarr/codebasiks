import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

type LessonProgress = {
  lesson_id: string;
  completed: boolean;
  score: number;
  total: number;
};

export function useModuleProgress(moduleId: string) {
  const { token } = useAuth();
  const [progress, setProgress] = useState<LessonProgress[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/progress/module/${moduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setProgress)
      .catch(console.error);
  }, [moduleId, token]);

  const isCompleted = (lessonId: string) =>
    progress.find(p => p.lesson_id === lessonId)?.completed ?? false;

  // Stars for the module: average score across all lessons
  const stars = (totalPerLesson: number[]): number => {
    if (progress.length === 0) return 0;
    const totalScore = progress.reduce((acc, p) => acc + p.score, 0);
    const totalPossible = totalPerLesson.reduce((acc, t) => acc + t, 0);
    if (totalPossible === 0) return 0;
    const pct = totalScore / totalPossible;
    if (pct === 1) return 3;
    if (pct >= 0.5) return 2;
    if (pct > 0) return 1;
    return 0;
  };

  return { isCompleted, stars };
}
