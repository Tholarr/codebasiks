import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode4 = `#include <unistd.h>

char *my_evil_str(char *str)
{
    // Your code here
}
`;

export default function Lesson03() {
  return (
    <LessonLayout title="Pointer arithmetic and string manipulation" lessonId="module02-lesson03" total={2} modulePath="/module/02" prevPath="/module/02/lesson/02" nextPath="/module/02/lesson/04">
      {(progress) => (
        <>
          <p>
            When working with pointers, it is often useful to consult the official documentation of C
            functions. On Unix systems, this is done with the <strong>man</strong> command (short for
            manual). For example, to read about the <code>strlen</code> function from the standard
            library, you would type:
          </p>
          <CodeBlock code={`man 3 strlen`} />
          <p>
            The number <code>3</code> refers to section 3 of the manual, which covers standard C
            library functions. Other sections cover system calls (section 2), shell commands (section
            1), and so on. Man pages describe the prototype of the function, what it does, its
            parameters, its return value, and related functions. Getting comfortable reading man pages
            is an essential skill in C development.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            You already know that incrementing a pointer moves it to the next element. More generally,
            you can perform arithmetic on pointers: adding or subtracting an integer moves the pointer
            forward or backward by that many elements. This is called <strong>pointer arithmetic</strong>:
          </p>
          <CodeBlock code={`char *str = "hello";
char *end = str + 4;  // points to 'o'`} />
          <p>
            You can also subtract two pointers of the same type to get the number of elements between
            them. This is particularly useful for computing the length of a string or finding a
            position within it.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Unlike <code>char const *</code>, a plain <code>char *</code> allows you to modify the
            characters it points to. This makes it possible to manipulate a string <strong>in place</strong>,
            meaning you modify the original string directly without creating a copy:
          </p>
          <CodeBlock code={`char str[] = "hello";  // writable string (stored on the stack)
str[0] = 'H';          // valid: modifies the original`} />
          <p>
            Note that string literals like <code>"hello"</code> are read-only in C. To get a writable
            string, you must declare it as a character array or use <code>strdup</code> to create a
            copy on the heap. This is why <code>my_evil_str</code> takes a <code>char *</code> and not
            a <code>char const *</code>.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What does pointer arithmetic allow you to do?"
            choices={[
              "Change the type of the pointer",
              "Move a pointer forward or backward through memory",
              "Delete a variable from memory",
              "Convert a pointer to an integer",
            ]}
            correct="Move a pointer forward or backward through memory"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 04 - my_evil_str"
              description={<>Write a function that swaps each of the string's characters two by two: the first letter with the last one, the second with the second-to-last, and so on. The function should return a pointer to the first character of the modified string. It will be tested with the string <code>"abcdef"</code>, which should become <code>"fedcba"</code>. It must be prototyped as follows:</>}
              prototype="char *my_evil_str(char *str);"
              starterCode={starterCode4}
              expectedOutput="fedcba"
              functionCall={`char str[] = "abcdef"; my_evil_str(str); write(1, str, 6)`}
              taskId="my_evil_str"
              savedCode={progress.getSavedExercise("my_evil_str")?.code}
              onSuccess={(code) => progress.saveExercise("my_evil_str", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
