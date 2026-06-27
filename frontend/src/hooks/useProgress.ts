import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

type ExerciseSubmission = {
  task_id: string;
  code: string;
  success: boolean;
};

type LessonProgressData = {
  progress: { completed: boolean; score: number; total: number } | null;
  quiz: { answer: string; correct: boolean } | null;
  exercises: ExerciseSubmission[];
};

export type ExerciseState = {
  taskId: string;
  code: string;
  success: boolean;
};

export function useProgress(lessonId: string, total: number) {
  const { token } = useAuth();
  const [saved, setSaved] = useState<LessonProgressData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [exercises, setExercises] = useState<ExerciseState[]>([]);

  // Fetch saved progress on mount
  useEffect(() => {
    if (!token) {
      setLoaded(true);
      return;
    }
    fetch(`/api/progress/${lessonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((data: LessonProgressData) => {
        setSaved(data);
        if (data.quiz) {
          setQuizAnswer(data.quiz.answer);
          setQuizCorrect(data.quiz.correct);
        }
      })
      .catch(console.error)
      .finally(() => setLoaded(true));
  }, [lessonId, token]);

  // Called when quiz is verified
  const saveQuizAnswer = (answer: string, correct: boolean) => {
    setQuizAnswer(answer);
    setQuizCorrect(correct);
  };

  // Called when an exercise is run successfully
  const saveExercise = (taskId: string, code: string, success: boolean) => {
    setExercises(prev => {
      const existing = prev.find(e => e.taskId === taskId);
      if (existing)
        return prev.map(e => e.taskId === taskId ? { taskId, code, success } : e);
      return [...prev, { taskId, code, success }];
    });
  };

  // Called when user clicks Next - saves everything to DB
  const saveProgress = async () => {
    if (!token) return;

    // Merge session exercises with already saved ones from DB
    const savedExercises = saved?.exercises.map(e => ({
      taskId: e.task_id,
      code: e.code,
      success: e.success,
    })) || [];

    const mergedExercises = [...savedExercises];
    for (const ex of exercises) {
      const exists = mergedExercises.find(e => e.taskId === ex.taskId);
      if (exists) {
        Object.assign(exists, ex);
      } else {
        mergedExercises.push(ex);
      }
    }

    await fetch(`/api/progress/${lessonId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        total,
        quizAnswer,
        quizCorrect,
        exercises: mergedExercises,
      }),
    });
  };

  // Get saved code for a specific exercise
  const getSavedExercise = (taskId: string): ExerciseSubmission | null => {
    if (!saved) return null;
    return saved.exercises.find(e => e.task_id === taskId) || null;
  };

  return {
    loaded,
    saved,
    quizAnswer,
    quizCorrect,
    saveQuizAnswer,
    saveExercise,
    saveProgress,
    getSavedExercise,
  };
}
