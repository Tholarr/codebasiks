import ModuleLayout from "../components/ModuleLayout";

export default function Module03() {
  return (
    <ModuleLayout
      title="Functions and Recursion"
      moduleId="module03"
      description="Learn how to break problems into smaller pieces using functions, iteration and recursion."
      lessons={[
        {
          title: "Lesson 01 - Iteration",
          description: "Use loops as a computation tool to solve mathematical problems step by step.",
          path: "/module/03/lesson/01",
          icon: "🔄",
          lessonId: "module03-lesson01",
          total: 3,
        },
        {
          title: "Lesson 02 - Recursion",
          description: "Discover recursion, base cases, and how functions can call themselves to solve problems.",
          path: "/module/03/lesson/02",
          icon: "🪞",
          lessonId: "module03-lesson02",
          total: 3,
        },
        {
          title: "Lesson 03 - Number theory",
          description: "Explore mathematical algorithms involving square roots and prime numbers.",
          path: "/module/03/lesson/03",
          icon: "🔢",
          lessonId: "module03-lesson03",
          total: 4,
        },
        {
          title: "Lesson 04 - Backtracking",
          description: "Learn how to explore all possible solutions recursively with the N-Queens problem.",
          path: "/module/03/lesson/04",
          icon: "♟️",
          lessonId: "module03-lesson04",
          total: 2,
        },
      ]}
    />
  );
}
