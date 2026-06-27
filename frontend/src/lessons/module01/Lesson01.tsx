import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode1 = `#include <unistd.h>

int my_print_alpha(void)
{
    // Your code here
}
`;

const starterCode2 = `#include <unistd.h>

int my_print_revalpha(void)
{
    // Your code here
}
`;

const starterCode3 = `#include <unistd.h>

int my_print_digits(void)
{
    // Your code here
}
`;

export default function Lesson01() {
  return (
    <LessonLayout title="Characters and loops in C" lessonId="module01-lesson01" total={4} modulePath="/module/01" nextPath="/module/01/lesson/02">
      {(progress) => (
        <>
          <p>
            In C, every piece of data has a <strong>type</strong>. The type tells the program what kind
            of value a variable holds: a whole number, a decimal number, or a single character.
          </p>
          <p>
            To store a single character, C provides the <code>char</code> type. A <code>char</code> can
            hold any single character: a letter, a digit, or a symbol. You declare and assign one like this:
          </p>
          <CodeBlock code={`char c;\nc = 'a';`} />
          <p>
            Notice that characters are always written between <strong>single quotes</strong> <code>' '</code>.
            This is how C knows you mean the character <code>a</code>, and not something else.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Characters in C are closely related to numbers. Under the hood, each character corresponds
            to a numeric value. The alphabet is ordered, which means the characters <code>'a'</code> through <code>'z'</code> follow
            each other in a predictable sequence. This has an interesting implication: you can perform
            arithmetic on characters just like on integers.
          </p>
          <p>
            For example, if <code>c</code> holds the value <code>'a'</code>, then <code>c++</code> moves
            it to the next character in the sequence. You can also compare characters with operators
            like <code>{"<="}</code> or <code>==</code>.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>A <strong>while loop</strong> repeats a block of code as long as a given condition remains true:</p>
          <CodeBlock code={`while (condition)\n{\n    // code to repeat\n}`} />
          <p>
            The condition is checked before each iteration. The moment it becomes false, the loop stops.
            If it never becomes false, the loop runs forever (something to be careful about).
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            To display output in C, one of the available tools is the <code>write</code> function,
            which comes from the <code>&lt;unistd.h&gt;</code> library:
          </p>
          <CodeBlock code={`write(1, &c, 1);`} />
          <ul>
            <li>The first is the destination: <code>1</code> means the terminal</li>
            <li>The second is the address of the data to write: <code>&c</code> gives the address of the variable <code>c</code></li>
            <li>The third is the number of bytes to write: a single <code>char</code> occupies exactly <code>1</code> byte</li>
          </ul>
          <p>
            Unlike <code>printf</code>, <code>write</code> is a low-level function that directly
            communicates with the operating system. It is the foundation upon which higher-level
            display functions are built.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What happens if the condition of a while loop never becomes false?"
            choices={[
              "The program skips the loop entirely",
              "The loop runs forever",
              "The program crashes immediately",
              "The loop runs exactly once",
            ]}
            correct="The loop runs forever"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 01 - my_print_alpha"
              description={<>Write a function that, beginning with <strong>a</strong>, displays the lowercase alphabet in ascending order, on a single line. It must be prototyped as follows:</>}
              prototype="int my_print_alpha(void);"
              starterCode={starterCode1}
              expectedOutput="abcdefghijklmnopqrstuvwxyz"
              functionCall="my_print_alpha()"
              taskId="my_print_alpha"
              savedCode={progress.getSavedExercise("my_print_alpha")?.code}
              onSuccess={(code) => progress.saveExercise("my_print_alpha", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 02 - my_print_revalpha"
              description={<>Write a function that, beginning with <strong>z</strong>, displays the lowercase alphabet in descending order, on a single line. It must be prototyped as follows:</>}
              prototype="int my_print_revalpha(void);"
              starterCode={starterCode2}
              expectedOutput="zyxwvutsrqponmlkjihgfedcba"
              functionCall="my_print_revalpha()"
              taskId="my_print_revalpha"
              savedCode={progress.getSavedExercise("my_print_revalpha")?.code}
              onSuccess={(code) => progress.saveExercise("my_print_revalpha", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 03 - my_print_digits"
              description={<>Write a function that displays all the digits, on a single line, in ascending order. It must be prototyped as follows:</>}
              prototype="int my_print_digits(void);"
              starterCode={starterCode3}
              expectedOutput="0123456789"
              functionCall="my_print_digits()"
              taskId="my_print_digits"
              savedCode={progress.getSavedExercise("my_print_digits")?.code}
              onSuccess={(code) => progress.saveExercise("my_print_digits", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
