import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode5 = `#include <unistd.h>

int my_getnbr(char const *str)
{
    // Your code here
}
`;

const starterCode6 = `#include <unistd.h>

void my_sort_int_array(int *array, int size)
{
    // Your code here
}
`;

export default function Lesson04() {
  return (
    <LessonLayout title="Parsing and sorting" lessonId="module02-lesson04" total={3} modulePath="/module/02" prevPath="/module/02/lesson/03" nextPath="/module/03">
      {(progress) => (
        <>
          <p>
            Converting a string like <code>"42"</code> to an integer requires reading each character,
            checking that it is a digit, and building up the result progressively. A character digit
            can be converted to its numeric value by subtracting <code>'0'</code>:
          </p>
          <CodeBlock code={`char c = '7';
int n = c - '0';  // n is 7`} />
          <p>
            To handle multiple digits, the result is multiplied by 10 at each step before adding the
            next digit. Signs and non-digit characters must also be handled carefully — the function
            should stop as soon as it encounters a character that is not a digit.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            Signs before the number can be handled by reading them first and keeping track of whether
            the final result should be positive or negative. Multiple signs in a row follow the rules
            of arithmetic: two negatives make a positive.
          </p>
          <CodeBlock code={`// "+--42" -> sign flips twice -> positive -> 42
// "42a3" -> stops at 'a' -> 42`} />

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            A pointer to an integer array works the same way as a pointer to a string. The pointer
            holds the address of the first element, and you can move through the array with pointer
            arithmetic or array indexing — both are equivalent in C:
          </p>
          <CodeBlock code={`int arr[] = {3, 1, 2};
int *p = arr;  // points to the first element

// These two are equivalent:
p[1]      // second element via indexing
*(p + 1)  // second element via pointer arithmetic`} />
          <p>
            Sorting an array in place means rearranging its elements without allocating a new array.
            One of the simplest sorting algorithms is the bubble sort: repeatedly compare adjacent
            elements and swap them if they are in the wrong order, until no more swaps are needed.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What does subtracting '0' from a character digit do?"
            choices={[
              "Deletes the character",
              "Converts it to its numeric integer value",
              "Moves the pointer to the next character",
              "Checks if the character is a letter",
            ]}
            correct="Converts it to its numeric integer value"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 05 - my_getnbr"
              description={<>Write a function that returns a number sent to the function as a string. It will be tested with <code>"+--42"</code>, which should return <code>42</code>, and with <code>"42a3"</code>, which should return <code>42</code>. It must be prototyped as follows:</>}
              prototype="int my_getnbr(char const *str);"
              starterCode={starterCode5}
              expectedOutput={"42\n42"}
              functionCall={`int a = my_getnbr("+--42"); int b = my_getnbr("42a3"); char ta = '0' + a/10; char ua = '0' + a%10; char tb = '0' + b/10; char ub = '0' + b%10; write(1, &ta, 1); write(1, &ua, 1); write(1, "\\n", 1); write(1, &tb, 1); write(1, &ub, 1)`}
              taskId="my_getnbr"
              savedCode={progress.getSavedExercise("my_getnbr")?.code}
              onSuccess={(code) => progress.saveExercise("my_getnbr", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 06 - my_sort_int_array"
              description={<>Write a function that sorts an integer array in ascending order, given a pointer to the first element of the array and its size. It will be tested with the array <code>[3, 1, 2]</code>, which should become <code>[1, 2, 3]</code>. It must be prototyped as follows:</>}
              prototype="void my_sort_int_array(int *array, int size);"
              starterCode={starterCode6}
              expectedOutput="123"
              functionCall={`int arr[] = {3, 1, 2}; my_sort_int_array(arr, 3); char a = '0' + arr[0]; char b = '0' + arr[1]; char c = '0' + arr[2]; write(1, &a, 1); write(1, &b, 1); write(1, &c, 1)`}
              taskId="my_sort_int_array"
              savedCode={progress.getSavedExercise("my_sort_int_array")?.code}
              onSuccess={(code) => progress.saveExercise("my_sort_int_array", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
