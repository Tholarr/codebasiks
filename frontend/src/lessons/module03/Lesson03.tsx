import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode1 = `#include <unistd.h>

int my_compute_square_root(int nb)
{
    // Your code here
}
`;

const starterCode2 = `#include <unistd.h>

int my_is_prime(int nb)
{
    // Your code here
}
`;

const starterCode3 = `#include <unistd.h>

int my_find_prime_sup(int nb)
{
    // Your code here
}
`;

export default function Lesson03() {
  return (
    <LessonLayout title="Number theory" lessonId="module03-lesson03" total={4} modulePath="/module/03" prevPath="/module/03/lesson/02" nextPath="/module/03/lesson/04">
      {(progress) => (
        <>
          <p>
            Many mathematical problems can be solved by applying a simple algorithm repeatedly.
            This section covers three classic problems: square roots, prime numbers, and finding
            the next prime.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            The <strong>square root</strong> of a number <code>n</code> is the value <code>x</code> such
            that <code>x * x = n</code>. The simplest way to find it is to try every integer starting
            from 1 until <code>x * x</code> exceeds <code>n</code>:
          </p>
          <CodeBlock code={`// Is 16 a perfect square?
1 * 1 = 1   // too small
2 * 2 = 4   // too small
3 * 3 = 9   // too small
4 * 4 = 16  // found it`} />
          <p>
            If no integer <code>x</code> satisfies <code>x * x == n</code>, then the square root
            is not a whole number and the function should return 0.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            A <strong>prime number</strong> is a number greater than 1 that has no divisors other
            than 1 and itself. To check if a number is prime, try dividing it by every integer from
            2 up to the number minus 1. If any division has no remainder, the number is not prime.
          </p>
          <CodeBlock code={`// Is 7 prime?
7 % 2 = 1   // not divisible
7 % 3 = 1   // not divisible
7 % 4 = 3   // not divisible
7 % 5 = 2   // not divisible
7 % 6 = 1   // not divisible
// no divisor found -> 7 is prime`} />
          <p>
            By convention, 0 and 1 are not prime numbers.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            To find the <strong>smallest prime greater than or equal to a given number</strong>, start
            at that number and keep incrementing until you find one that passes the primality test.
            This is a common pattern: combining two functions: one to test, one to search.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="Which of the following numbers is prime?"
            choices={["12", "17", "21", "25"]}
            correct="17"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 05 - my_compute_square_root"
              description={<>Write a function that returns the square root of a number if it is a whole number, or 0 otherwise. It must be prototyped as follows:</>}
              prototype="int my_compute_square_root(int nb);"
              starterCode={starterCode1}
              expectedOutput="4"
              functionCall={`int r = my_compute_square_root(16); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_compute_square_root"
              savedCode={progress.getSavedExercise("my_compute_square_root")?.code}
              onSuccess={(code) => progress.saveExercise("my_compute_square_root", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 06 - my_is_prime"
              description={<>Write a function that returns 1 if the number is prime and 0 if not. It must be prototyped as follows:</>}
              prototype="int my_is_prime(int nb);"
              starterCode={starterCode2}
              expectedOutput="1"
              functionCall={`int r = my_is_prime(7); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_is_prime"
              savedCode={progress.getSavedExercise("my_is_prime")?.code}
              onSuccess={(code) => progress.saveExercise("my_is_prime", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 07 - my_find_prime_sup"
              description={<>Write a function that returns the smallest prime number that is greater than or equal to the number given as a parameter. It must be prototyped as follows:</>}
              prototype="int my_find_prime_sup(int nb);"
              starterCode={starterCode3}
              expectedOutput="7"
              functionCall={`int r = my_find_prime_sup(6); char c = '0' + r; write(1, &c, 1)`}
              taskId="my_find_prime_sup"
              savedCode={progress.getSavedExercise("my_find_prime_sup")?.code}
              onSuccess={(code) => progress.saveExercise("my_find_prime_sup", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
