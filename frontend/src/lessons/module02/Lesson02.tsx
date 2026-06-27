import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import { codeBlockStyle } from "../../styles/common";
import CodeBlock from "../../components/CodeBlock";

const starterCode2 = `#include <unistd.h>

int my_putstr(char const *str)
{
    // Your code here
}
`;

const starterCode3 = `#include <unistd.h>

int my_strlen(char const *str)
{
    // Your code here
}
`;

export default function Lesson02() {
  return (
    <LessonLayout title="Pointers and strings" lessonId="module02-lesson02" total={3} modulePath="/module/02" prevPath="/module/02/lesson/01" nextPath="/module/02/lesson/03">
      {(progress) => (
        <>
          <p>
            In C, a <strong>string</strong> is not a special type, it is simply a sequence of{" "}
            <code>char</code> values stored consecutively in memory. A string is represented as a{" "}
            <code>char *</code>, a pointer to the first character of that sequence:
          </p>
          <CodeBlock code={`char *str = "hello";`} />
          <p>
            The variable <code>str</code> holds the address of the character <code>'h'</code>. The
            remaining characters <code>'e'</code>, <code>'l'</code>, <code>'l'</code>, <code>'o'</code>{" "}
            follow immediately in memory.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Every string in C ends with a special character called the <strong>null terminator</strong>,
            written <code>'\0'</code>. It is automatically added by the compiler at the end of string
            literals. Its value is zero, and it signals to any function reading the string that there
            are no more characters:
          </p>
          <CodeBlock code={`// "hello" is stored as: 'h' 'e' 'l' 'l' 'o' '\\0'`} />
          <p>
            Without the null terminator, there would be no way to know where the string ends. Any
            function that processes a string must check for <code>'\0'</code> to stop at the right place.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Since a string is just a pointer to a first character, you can move through it by
            incrementing the pointer. Each increment moves it forward by one character in memory:
          </p>
          <CodeBlock code={`char *str = "hello";

while (*str != '\\0')
{
    // *str is the current character
    str++;  // move to the next character
}`} />
          <p>
            At each step, <code>*str</code> dereferences the pointer to get the current character.
            When <code>*str</code> equals <code>'\0'</code>, the loop stops.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            The keyword <code>const</code> in <code>char const *str</code> means that the characters
            pointed to cannot be modified through this pointer. The pointer itself can still be
            incremented, only the values it points to are protected. This is a common convention for
            functions that read a string without modifying it.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            To count the characters in a string, you can use the same traversal pattern and keep a
            counter. The counter starts at zero and increments with each character until the null
            terminator is reached. The final value of the counter is the length of the string.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What marks the end of a string in C?"
            choices={[
              "A space character",
              "The null terminator (\\0)",
              "A newline character (\\n)",
              "The number -1",
            ]}
            correct="The null terminator (\0)"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 01 - my_putstr"
              description={<>Write a function that displays, one by one, the characters of a string. The address of the string's first character will be found in the pointer passed as a parameter. It will be tested with the string <code>"hello"</code>. It must be prototyped as follows:</>}
              prototype="int my_putstr(char const *str);"
              starterCode={starterCode2}
              expectedOutput="hello"
              functionCall={`my_putstr("hello")`}
              taskId="my_putstr"
              savedCode={progress.getSavedExercise("my_putstr")?.code}
              onSuccess={(code) => progress.saveExercise("my_putstr", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 02 - my_strlen"
              description={<>Write a function that counts and returns the number of characters found in the string passed as parameter. It will be tested with the string <code>"hello"</code>, whose expected length is <code>5</code>. It must be prototyped as follows:</>}
              prototype="int my_strlen(char const *str);"
              starterCode={starterCode3}
              expectedOutput="5"
              functionCall={`int len = my_strlen("hello"); char c = '0' + len; write(1, &c, 1)`}
              taskId="my_strlen"
              savedCode={progress.getSavedExercise("my_strlen")?.code}
              onSuccess={(code) => progress.saveExercise("my_strlen", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
