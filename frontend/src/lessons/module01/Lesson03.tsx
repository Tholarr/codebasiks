import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const combOutput = (() => {
  const results: string[] = [];
  for (let i = 0; i <= 7; i++)
    for (let j = i + 1; j <= 8; j++)
      for (let k = j + 1; k <= 9; k++)
        results.push(`${i}${j}${k}`);
  return results.join(", ");
})();

const comb2Output = (() => {
  const results: string[] = [];
  for (let i = 0; i <= 98; i++)
    for (let j = i + 1; j <= 99; j++)
      results.push(`${String(i).padStart(2, "0")} ${String(j).padStart(2, "0")}`);
  return results.join(", ");
})();

const starterCode5 = `#include <unistd.h>

int my_print_comb(void)
{
    // Your code here
}
`;

const starterCode6 = `#include <unistd.h>

int my_print_comb2(void)
{
    // Your code here
}
`;

export default function Lesson03() {
  return (
    <LessonLayout title="Nested loops and combinations" lessonId="module01-lesson03" total={3} modulePath="/module/01" prevPath="/module/01/lesson/02" nextPath="/module/02">
      {(progress) => (
        <>
          <p>
            You already know how a <code>while</code> loop works. When you need to repeat something{" "}
            <strong>inside</strong> something that is already repeating, you can place a loop inside
            another loop. This is called a <strong>nested loop</strong>:
          </p>
          <CodeBlock code={`while (a <= max_a)
{
    b = start;
    while (b <= max_b)
    {
        // runs for every combination of a and b
        b++;
    }
    a++;
}`} />
          <p>
            For each iteration of the outer loop, the inner loop runs completely from start to finish.
            This lets you explore every possible combination of two variables.
          </p>
          <p>
            Notice that <code>b</code> is reset at the beginning of each outer iteration. If you forget
            to reset it, the inner loop will only run during the first outer iteration.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Sometimes the output requires formatting; separating values with a comma and a space,
            but <strong>not</strong> after the last one. A common pattern is to check whether you
            are at the last iteration before printing the separator. Think about what condition would
            tell you that the current value is the last one.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            When working with combinations of three elements, you need three nested loops. The key
            constraint is that each element must be strictly greater than the previous one to avoid
            duplicates. For example, for digits:
          </p>
          <CodeBlock code={`i = 0;
while (i <= 7)
{
    j = i + 1;
    while (j <= 8)
    {
        k = j + 1;
        // k goes from j+1 to 9
        k++;
        j++;
    }
    i++;
}`} />

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="In a nested loop, how many times does the inner loop run in total if the outer loop runs 3 times and the inner loop runs 4 times per iteration?"
            choices={["4", "7", "12", "3"]}
            correct="12"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 01 - my_print_comb"
              description={<>Write a function that displays, in ascending order, all the numbers composed by three <strong>different</strong> digits. Given three digits (all different), only the smallest number composed by those digits must be displayed. Numbers are separated by <code>, </code> but not after the last one. It must be prototyped as follows:</>}
              prototype="int my_print_comb(void);"
              starterCode={starterCode5}
              expectedOutput={combOutput}
              functionCall="my_print_comb()"
              taskId="my_print_comb"
              savedCode={progress.getSavedExercise("my_print_comb")?.code}
              onSuccess={(code) => progress.saveExercise("my_print_comb", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 02 - my_print_comb2"
              description={<>Write a function that displays, in ascending order, all the different combinations of two two-digit numbers. Combinations are separated by <code>, </code> but not after the last one. It must be prototyped as follows:</>}
              prototype="int my_print_comb2(void);"
              starterCode={starterCode6}
              expectedOutput={comb2Output}
              functionCall="my_print_comb2()"
              taskId="my_print_comb2"
              savedCode={progress.getSavedExercise("my_print_comb2")?.code}
              onSuccess={(code) => progress.saveExercise("my_print_comb2", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
