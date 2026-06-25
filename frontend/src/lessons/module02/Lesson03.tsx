import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import { codeBlockStyle } from "../../styles/common";

const starterCode4 = `#include <unistd.h>

char *my_evil_str(char *str)
{
    // Your code here
}
`;

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

export default function Lesson03() {
  return (
    <LessonLayout title="String manipulation and arrays" modulePath="/module/02" prevPath="/module/02/lesson/02" nextPath="/module/03">

      <p>
        When working with pointers, it is often useful to consult the official documentation of C
        functions. On Unix systems, this is done with the <strong>man</strong> command (short for
        manual). For example, to read about the <code>strlen</code> function from the standard
        library, you would type:
      </p>
      <pre style={codeBlockStyle}>{`man 3 strlen`}</pre>
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
      <pre style={codeBlockStyle}>{`char *str = "hello";
char *end = str + 4;  // points to 'o'`}</pre>
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
      <pre style={codeBlockStyle}>{`char str[] = "hello";  // writable string (stored on the stack)
str[0] = 'H';          // valid: modifies the original`}</pre>
      <p>
        Note that string literals like <code>"hello"</code> are read-only in C. To get a writable
        string, you must declare it as a character array or use <code>strdup</code> to create a
        copy on the heap. This is why <code>my_evil_str</code> takes a <code>char *</code> and not
        a <code>char const *</code>.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        Converting a string like <code>"42"</code> to an integer requires reading each character,
        checking that it is a digit, and building up the result progressively. A character digit
        can be converted to its numeric value by subtracting <code>'0'</code>:
      </p>
      <pre style={codeBlockStyle}>{`char c = '7';
int n = c - '0';  // n is 7`}</pre>
      <p>
        To handle multiple digits, the result is multiplied by 10 at each step before adding the
        next digit. Signs and non-digit characters must also be handled carefully.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        A pointer to an integer array works the same way as a pointer to a string. The pointer
        holds the address of the first element, and you can move through the array with pointer
        arithmetic or array indexing, both are equivalent in C:
      </p>
      <pre style={codeBlockStyle}>{`int arr[] = {3, 1, 2};
int *p = arr;  // points to the first element

// These two are equivalent:
p[1]      // second element via indexing
*(p + 1)  // second element via pointer arithmetic`}</pre>
      <p>
        Sorting an array in place means rearranging its elements without allocating a new array.
        One of the simplest sorting algorithms is the bubble sort: repeatedly compare adjacent
        elements and swap them if they are in the wrong order, until no more swaps are needed.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <QuizQuestion
        question="What does 'man 3 strlen' let you do?"
        choices={[
          "Run the strlen function with 3 arguments",
          "Read the manual page for strlen in the C library section",
          "Install the strlen function on your system",
          "Display the source code of strlen",
        ]}
        correct="Read the manual page for strlen in the C library section"
      />

      <hr style={{ margin: "2rem 0" }} />

      <CodeExercise
        title="Task 04 - my_evil_str"
        description={<>Write a function that swaps each of the string's characters two by two: the first letter with the last one, the second with the second-to-last, and so on. The function should return a pointer to the first character of the modified string. It will be tested with the string <code>"abcdef"</code>, which should become <code>"fedcba"</code>. It must be prototyped as follows:</>}
        prototype="char *my_evil_str(char *str);"
        starterCode={starterCode4}
        expectedOutput="fedcba"
        functionCall={`char str[] = "abcdef"; my_evil_str(str); write(1, str, 6)`}
      />

      <hr style={{ margin: "2rem 0" }} />

      <CodeExercise
        title="Task 05 - my_getnbr"
        description={<>Write a function that returns a number sent to the function as a string. It will be tested with <code>"+--42"</code>, which should return <code>42</code>, and with <code>"42a3"</code>, which should return <code>42</code>. It must be prototyped as follows:</>}
        prototype="int my_getnbr(char const *str);"
        starterCode={starterCode5}
        expectedOutput={"42\n42"}
        functionCall={`int a = my_getnbr("+--42"); int b = my_getnbr("42a3"); char ta = '0' + a/10; char ua = '0' + a%10; char tb = '0' + b/10; char ub = '0' + b%10; write(1, &ta, 1); write(1, &ua, 1); write(1, "\\n", 1); write(1, &tb, 1); write(1, &ub, 1)`}
      />

      <hr style={{ margin: "2rem 0" }} />

      <CodeExercise
        title="Task 06 - my_sort_int_array"
        description={<>Write a function that sorts an integer array in ascending order, given a pointer to the first element of the array and its size. It will be tested with the array <code>[3, 1, 2]</code>, which should become <code>[1, 2, 3]</code>. It must be prototyped as follows:</>}
        prototype="void my_sort_int_array(int *array, int size);"
        starterCode={starterCode6}
        expectedOutput="123"
        functionCall={`int arr[] = {3, 1, 2}; my_sort_int_array(arr, 3); char a = '0' + arr[0]; char b = '0' + arr[1]; char c = '0' + arr[2]; write(1, &a, 1); write(1, &b, 1); write(1, &c, 1)`}
      />

    </LessonLayout>
  );
}
