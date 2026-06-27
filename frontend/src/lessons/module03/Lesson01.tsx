import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode1 = `#include <unistd.h>

int my_compute_factorial_it(int nb)
{
    // Your code here
}
`;

const starterCode2 = `#include <unistd.h>

int my_compute_power_it(int nb, int p)
{
    // Your code here
}
`;

export default function Lesson01() {
  return (
    <LessonLayout title="Iteration" lessonId="module03-lesson01" total={3} modulePath="/module/03" nextPath="/module/03/lesson/02">
      {(progress) => (
        <>
          <p>
            You already know how to use loops to display characters or digits. But loops are also a
            powerful tool for <strong>computation</strong> repeating an operation a certain number
            of times to build up a result.
          </p>
          <p>
            A common pattern is to initialize a result variable before the loop, then update it at
            each iteration:
          </p>
          <CodeBlock code={`int result = 1;
int i = 1;
while (i <= n)
{
    result = result * i;
    i++;
}`} />
          <p>
            At each step, <code>result</code> accumulates the effect of the operation. The loop
            stops when the condition is no longer true, and <code>result</code> holds the final answer.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            The <strong>factorial</strong> of a number <code>n</code> (written <code>n!</code>) is
            the product of all integers from 1 to n:
          </p>
          <CodeBlock code={`0! = 1
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24`} />
          <p>
            By convention, <code>0!</code> equals 1. If the number is negative, the function should
            return 0 as an error value.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            The same pattern applies to <strong>exponentiation</strong> raising a number to a power
            means multiplying it by itself a certain number of times:
          </p>
          <CodeBlock code={`2^0 = 1
2^1 = 2
2^3 = 2 * 2 * 2 = 8`} />
          <p>
            Any number raised to the power 0 equals 1. If the power is negative, the function should
            return 0 as an error value.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What is the value of 0! (zero factorial)?"
            choices={["0", "1", "undefined", "-1"]}
            correct="1"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 01 - my_compute_factorial_it"
              description={<>Write an iterative function that returns the factorial of the number given as a parameter. In case of error, the function should return 0. It must be prototyped as follows:</>}
              prototype="int my_compute_factorial_it(int nb);"
              starterCode={starterCode1}
              expectedOutput="6"
              functionCall={`int r = my_compute_factorial_it(3); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_compute_factorial_it"
              savedCode={progress.getSavedExercise("my_compute_factorial_it")?.code}
              onSuccess={(code) => progress.saveExercise("my_compute_factorial_it", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 01 - my_compute_power_it"
              description={<>Write an iterative function that returns the first argument raised to the power of the second argument. In case of error, the function should return 0. It must be prototyped as follows:</>}
              prototype="int my_compute_power_it(int nb, int p);"
              starterCode={starterCode2}
              expectedOutput="8"
              functionCall={`int r = my_compute_power_it(2, 3); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_compute_power_it"
              savedCode={progress.getSavedExercise("my_compute_power_it")?.code}
              onSuccess={(code) => progress.saveExercise("my_compute_power_it", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
