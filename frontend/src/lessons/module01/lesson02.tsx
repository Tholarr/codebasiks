import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import { codeBlockStyle } from "../../styles/common";

// Expected outputs generated in JS to avoid hardcoding long strings
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

const starterCode4 = `#include <unistd.h>

int my_isneg(int n)
{
    // Your code here
}
`;

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

export default function Lesson02() {
  return (
    <LessonLayout title="Conditions, parameters and nested loops" prevPath="/module/01/lesson/01" nextPath="/module/02">

      {/* ── Lesson content ── */}
      <p>
        A function in C can receive <strong>parameters</strong> values passed by the caller that
        the function can use internally. The parameter is declared inside the parentheses of the
        prototype, with its type and a name:
      </p>
      <pre style={codeBlockStyle}>{`int my_function(int n);`}</pre>
      <p>
        Inside the function, <code>n</code> behaves like any other variable. Its value depends on
        what was passed when the function was called. The type <code>int</code> is used to store
        whole numbers (positive, negative, or zero).
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        To make a decision based on a value, C provides the <code>if</code> / <code>else</code> structure:
      </p>
      <pre style={codeBlockStyle}>{`if (condition)
{
    // runs if condition is true
}
else
{
    // runs if condition is false
}`}</pre>
      <p>
        The condition can use comparison operators: <code>==</code> (equal), <code>!=</code> (not equal),{" "}
        <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Only one
        branch runs, either the <code>if</code> block or the <code>else</code> block, never both.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        You already know how a <code>while</code> loop works. When you need to repeat something{" "}
        <strong>inside</strong> something that is already repeating, you can place a loop inside
        another loop, this is called a <strong>nested loop</strong>:
      </p>
      <pre style={codeBlockStyle}>{`while (a <= max_a)
{
    b = start;
    while (b <= max_b)
    {
        // runs for every combination of a and b
        b++;
    }
    a++;
}`}</pre>
      <p>
        For each iteration of the outer loop, the inner loop runs completely from start to finish.
        This lets you explore every possible combination of two variables, which is useful when
        the output requires pairing values together.
      </p>
      <p>
        Notice that <code>b</code> is reset at the beginning of each outer iteration. If you forget
        to reset it, the inner loop will only run during the first outer iteration.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        Sometimes the output requires formatting, separating values with a comma and a space, but{" "}
        <strong>not</strong> after the last one. A common pattern is to check whether you are at
        the last iteration before printing the separator. Think about what condition would tell you
        that the current value is the last one.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ── Question ── */}
      <QuizQuestion
        question="In a nested loop, how many times does the inner loop run in total if the outer loop runs 3 times and the inner loop runs 4 times per iteration?"
        choices={["4", "7", "12", "3"]}
        correct="12"
      />

      <hr style={{ margin: "2rem 0" }} />

      {/* ── Exercises ── */}
      <CodeExercise
        title="Task 04 - my_isneg"
        description={<>Write a function that displays either <strong>N</strong> if the integer passed as parameter is negative, or <strong>P</strong> if positive or null. It must be prototyped as follows:</>}
        prototype="int my_isneg(int n);"
        starterCode={starterCode4}
        expectedOutput={"N\nP\nP"}
        functionCall={`my_isneg(-1); write(1, "\\n", 1); my_isneg(1); write(1, "\\n", 1); my_isneg(0)`}
      />

      <hr style={{ margin: "2rem 0" }} />

      <CodeExercise
        title="Task 05 - my_print_comb"
        description={<>Write a function that displays, in ascending order, all the numbers composed by three <strong>different</strong> digits. Given three digits (all different), only the smallest number composed by those digits must be displayed. Numbers are separated by <code>, </code> but not after the last one. It must be prototyped as follows:</>}
        prototype="int my_print_comb(void);"
        starterCode={starterCode5}
        expectedOutput={combOutput}
        functionCall="my_print_comb()"
      />

      <hr style={{ margin: "2rem 0" }} />

      <CodeExercise
        title="Task 06 - my_print_comb2"
        description={<>Write a function that displays, in ascending order, all the different combinations of two two-digit numbers. Combinations are separated by <code>, </code> but not after the last one. It must be prototyped as follows:</>}
        prototype="int my_print_comb2(void);"
        starterCode={starterCode6}
        expectedOutput={comb2Output}
        functionCall="my_print_comb2()"
      />

    </LessonLayout>
  );
}
