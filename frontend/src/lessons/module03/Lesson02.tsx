import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode1 = `#include <unistd.h>

int my_compute_factorial_rec(int nb)
{
    // Your code here
}
`;

const starterCode2 = `#include <unistd.h>

int my_compute_power_rec(int nb, int p)
{
    // Your code here
}
`;

export default function Lesson02() {
  return (
    <LessonLayout title="Recursion" lessonId="module03-lesson02" total={3} modulePath="/module/03" prevPath="/module/03/lesson/01" nextPath="/module/03/lesson/03">
      {(progress) => (
        <>
          <p>
            <strong>Recursion</strong> is a technique where a function solves a problem by calling
            itself on a smaller version of the same problem. Instead of using a loop, the function
            breaks the problem down step by step until it reaches a case simple enough to solve directly.
          </p>
          <p>
            Every recursive function has two parts:
          </p>
          <CodeBlock code={`int my_function(int n)
{
    if (n == base_case)   // base case: stop here
        return base_value;
    return my_function(n - 1);  // recursive call
}`} />

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            The <strong>base case</strong> is essential, it is the condition that stops the recursion.
            Without it, the function would call itself forever and eventually crash with a stack overflow.
          </p>
          <p>
            Each recursive call is placed on the <strong>call stack</strong>, a region of memory that
            tracks active function calls. When the base case is reached, the calls unwind one by one
            and each returns its result to the previous call.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Factorial is a natural fit for recursion because it has a clear mathematical definition:
          </p>
          <CodeBlock code={`n! = n * (n - 1)!
0! = 1           // base case`} />
          <p>
            The same applies to exponentiation:
          </p>
          <CodeBlock code={`nb^p = nb * nb^(p-1)
nb^0 = 1         // base case`} />

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Iteration and recursion can often solve the same problems. Recursion tends to produce
            cleaner, more readable code for problems that have a natural recursive structure, while
            iteration is generally more efficient in terms of memory usage.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What happens if a recursive function has no base case?"
            choices={[
              "It returns 0 automatically",
              "It runs forever and eventually crashes",
              "It stops after 100 calls",
              "It compiles but does nothing",
            ]}
            correct="It runs forever and eventually crashes"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 02 - my_compute_factorial_rec"
              description={<>Write a recursive function that returns the factorial of the number given as a parameter. In case of error, the function should return 0. It must be prototyped as follows:</>}
              prototype="int my_compute_factorial_rec(int nb);"
              starterCode={starterCode1}
              expectedOutput="6"
              functionCall={`int r = my_compute_factorial_rec(3); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_compute_factorial_rec"
              savedCode={progress.getSavedExercise("my_compute_factorial_rec")?.code}
              onSuccess={(code) => progress.saveExercise("my_compute_factorial_rec", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 04 - my_compute_power_rec"
              description={<>Write a recursive function that returns the first argument raised to the power of the second argument. In case of error, the function should return 0. It must be prototyped as follows:</>}
              prototype="int my_compute_power_rec(int nb, int p);"
              starterCode={starterCode2}
              expectedOutput="8"
              functionCall={`int r = my_compute_power_rec(2, 3); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_compute_power_rec"
              savedCode={progress.getSavedExercise("my_compute_power_rec")?.code}
              onSuccess={(code) => progress.saveExercise("my_compute_power_rec", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
