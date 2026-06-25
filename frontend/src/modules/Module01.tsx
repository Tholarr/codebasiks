import ModuleLayout from "../components/ModuleLayout";

export default function Module01() {
  return (
    <ModuleLayout
      title="Variables, Loops and Conditions"
      description="Learn the building blocks of C programming: how to store data, repeat actions, and make decisions."
      lessons={[
        {
          title: "Lesson 01 - Characters and loops in C",
          description: "Discover the char type, how to iterate through characters with a while loop, and how to display output using write.",
          path: "/module/01/lesson/01",
          icon: "🔤",
        },
        {
          title: "Lesson 02 - Conditions, parameters and nested loops",
          description: "Learn how to pass parameters to functions, use if/else to make decisions, and combine loops to explore combinations.",
          path: "/module/01/lesson/02",
          icon: "🔁",
        },
      ]}
    />
  );
}
