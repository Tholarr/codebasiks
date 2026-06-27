import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode = `#include <unistd.h>

int my_isneg(int n)
{
    // Your code here
}
`;

export default function Lesson02() {
  return (
    <LessonLayout title="Conditions and parameters" lessonId="module01-lesson02" total={2} modulePath="/module/01" prevPath="/module/01/lesson/01" nextPath="/module/01/lesson/03">
      {(progress) => (
        <>
          <p>
            A function in C can receive <strong>parameters</strong>, which are values passed by the
            caller that the function can use internally. The parameter is declared inside the
            parentheses of the prototype, with its type and a name:
          </p>
          <CodeBlock code={`int my_function(int n);`} />
          <p>
            Inside the function, <code>n</code> behaves like any other variable. Its value depends
            on what was passed when the function was called. The type <code>int</code> is used to
            store whole numbers, whether positive, negative, or zero.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            To make a decision based on a value, C provides the <code>if</code> / <code>else</code> structure:
          </p>
          <CodeBlock code={`if (condition)
{
    // runs if condition is true
}
else
{
    // runs if condition is false
}`} />
          <p>
            The condition can use comparison operators: <code>==</code> (equal), <code>!=</code> (not equal),{" "}
            <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Only one
            branch runs, either the <code>if</code> block or the <code>else</code> block, never both.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Parameters and conditions are often used together. A function receives a value and makes
            a decision based on it. The combination of these two tools lets you write functions that
            behave differently depending on their input.
          </p>
          <p>
            A common pattern is to check whether a number is negative, zero, or positive; and
            respond accordingly using <code>if</code> / <code>else</code>.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="When does the else block is executed?"
            choices={[
              "Always, regardless of the condition",
              "Only when the if condition is true",
              "Only when the if condition is false",
              "Only when the variable equals zero",
            ]}
            correct="Only when the if condition is false"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 04 - my_isneg"
              description={<>Write a function that displays either <strong>N</strong> if the integer passed as parameter is negative, or <strong>P</strong> if positive or null. It must be prototyped as follows:</>}
              prototype="int my_isneg(int n);"
              starterCode={starterCode}
              expectedOutput={"N\nP\nP"}
              functionCall={`my_isneg(-1); write(1, "\\n", 1); my_isneg(1); write(1, "\\n", 1); my_isneg(0)`}
              taskId="my_isneg"
              savedCode={progress.getSavedExercise("my_isneg")?.code}
              onSuccess={(code) => progress.saveExercise("my_isneg", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
