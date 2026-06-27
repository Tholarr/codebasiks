import ModuleLayout from "../components/ModuleLayout";

export default function Module02() {
  return (
    <ModuleLayout
      title="Pointers"
      moduleId="module02"
      description="Understand how memory works in C and how pointers let you directly manipulate it."
      lessons={[
        {
          title: "Lesson 01 - Introduction to pointers",
          description: "Discover what memory addresses are, how to use the & and * operators, and why pointers allow functions to modify variables directly.",
          path: "/module/02/lesson/01",
          icon: "📍",
          lessonId: "module02-lesson01",
          total: 2,
        },
        {
          title: "Lesson 02 - Pointers and strings",
          description: "Learn how strings are represented in C as char pointers, how the null terminator works, and how to traverse a string character by character.",
          path: "/module/02/lesson/02",
          icon: "🔗",
          lessonId: "module02-lesson02",
          total: 3,
        },
        {
          title: "Lesson 03 - Pointer arithmetic and string manipulation",
          description: "Go further with pointer arithmetic and learn how to manipulate strings in place using the man pages as reference.",
          path: "/module/02/lesson/03",
          icon: "🧮",
          lessonId: "module02-lesson03",
          total: 2,
        },
        {
          title: "Lesson 04 - Parsing and sorting",
          description: "Learn how to convert strings to integers and sort integer arrays using pointers.",
          path: "/module/02/lesson/04",
          icon: "🔢",
          lessonId: "module02-lesson04",
          total: 3,
        },
      ]}
    />
  );
}
