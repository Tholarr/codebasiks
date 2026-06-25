import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import { codeBlockStyle } from "../../styles/common";

const starterCode = `#include <unistd.h>

void my_swap(int *a, int *b)
{
    // Your code here
}
`;

export default function Lesson01() {
  return (
    <LessonLayout title="Introduction to pointers" nextPath="/module/02/lesson/02">

      <p>
        Every variable stored in a program occupies a specific location in memory. That location
        has an <strong>address</strong>, which is simply a number identifying where in memory the
        value lives. In C, you can access this address using the <code>&</code> operator:
      </p>
      <pre style={codeBlockStyle}>{`int n = 42;
int *p = &n;  // p now holds the address of n`}</pre>
      <p>
        The type <code>int *</code> means "a pointer to an integer"; in other words, a variable
        that stores the address of an <code>int</code>. The variable <code>p</code> itself does
        not hold <code>42</code>, it holds the address where <code>42</code> is stored.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        To access or modify the value <em>at</em> the address stored in a pointer, you use the{" "}
        <code>*</code> operator. This is called <strong>dereferencing</strong>:
      </p>
      <pre style={codeBlockStyle}>{`int n = 42;
int *p = &n;

*p = 100;  // modifies the value at the address p points to
// n is now 100`}</pre>
      <p>
        Notice that <code>*p = 100</code> does not change what address <code>p</code> points to.
        It changes the value stored at that address. This is the key distinction between a pointer
        and the value it points to.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        When you pass a variable to a function normally, C makes a copy of it. Any changes made
        inside the function affect only the copy, not the original. This is called{" "}
        <strong>passing by value</strong>.
      </p>
      <p>
        By passing a <strong>pointer</strong> instead, you give the function the address of the
        original variable. The function can then dereference that address and modify the original
        directly. This is called <strong>passing by reference</strong>:
      </p>
      <pre style={codeBlockStyle}>{`void set_to_zero(int *n)
{
    *n = 0;  // modifies the original variable
}

int main(void)
{
    int x = 42;
    set_to_zero(&x);  // passes the address of x
    // x is now 0
}`}</pre>
      <p>
        This mechanism is fundamental to C. Any function that needs to modify a variable declared
        outside of it must receive a pointer to that variable.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>
        A temporary variable is often needed when swapping two values. Think about what happens if
        you try to swap two values directly without one, the first assignment overwrites a value
        before it has been saved anywhere.
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <QuizQuestion
        question="What does the & operator do when applied to a variable?"
        choices={[
          "It returns the value stored in the variable",
          "It returns the memory address of the variable",
          "It creates a copy of the variable",
          "It deletes the variable from memory",
        ]}
        correct="It returns the memory address of the variable"
      />

      <hr style={{ margin: "2rem 0" }} />

      <CodeExercise
        title="Task 01 - my_swap"
        description={<>Write a function that swaps the content of two integers, whose addresses are given as parameters. It must be prototyped as follows. It will be tested with <code>a = 3</code> and <code>b = 7</code>.</>}
        prototype="void my_swap(int *a, int *b);"
        starterCode={starterCode}
        expectedOutput="7 3"
        functionCall={`int a = 3; int b = 7; my_swap(&a, &b); char ca = '0' + a; char cb = '0' + b; write(1, &ca, 1); write(1, " ", 1); write(1, &cb, 1)`}
      />

    </LessonLayout>
  );
}
