import LessonLayout from "../../components/LessonLayout";
import QuizQuestion from "../../components/QuizQuestion";
import CodeExercise from "../../components/CodeExercise";
import CodeBlock from "../../components/CodeBlock";

const starterCode = `#include <unistd.h>

int count_valid_queens_placements(int n)
{
    // Your code here
}
`;

export default function Lesson04() {
  return (
    <LessonLayout title="Backtracking" lessonId="module03-lesson04" total={2} modulePath="/module/03" prevPath="/module/03/lesson/03" nextPath="/">
      {(progress) => (
        <>
          <p>
            <strong>Backtracking</strong> is a recursive technique used to explore all possible
            solutions to a problem. The idea is simple: try a choice, recurse to explore its
            consequences, and if it leads to a dead end, undo the choice and try another one.
          </p>
          <CodeBlock code={`void explore(state)
{
    if (is_solution(state))
    {
        count++;
        return;
    }
    for each possible choice
    {
        if (is_valid(choice))
        {
            apply(choice);
            explore(state);
            undo(choice);    // backtrack
        }
    }
}`} />

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            The <strong>N-Queens problem</strong> is a classic backtracking challenge: place <code>n</code> queens
            on an <code>n×n</code> chessboard so that no two queens can attack each other. Queens
            attack along rows, columns, and diagonals.
          </p>
          <p>
            The goal is not to find one solution, but to <strong>count all valid placements</strong>.
            For example:
          </p>
          <CodeBlock code={`n=1 -> 1 solution
n=2 -> 0 solutions
n=3 -> 0 solutions
n=4 -> 2 solutions
n=5 -> 10 solutions`} />

          <hr style={{ margin: "1.5rem 0" }} />

          <p>
            A common approach is to place queens row by row. For each row, try placing a queen in
            each column. Before placing, check that no previously placed queen attacks that position.
            If the placement is valid, recurse to the next row. If you reach the last row successfully,
            you have found one valid solution.
          </p>
          <p>
            To check if a position is safe, you need to verify three conditions: no queen in the
            same column, no queen on the same diagonal going up-left, and no queen on the same
            diagonal going up-right.
          </p>

          <hr style={{ margin: "1.5rem 0" }} />

          <QuizQuestion
            question="What does backtracking do when it reaches a dead end?"
            choices={[
              "It stops the program",
              "It undoes the last choice and tries another",
              "It restarts from the beginning",
              "It skips to the next solution",
            ]}
            correct="It undoes the last choice and tries another"
            savedAnswer={progress.quizAnswer}
            onAnswer={progress.saveQuizAnswer}
          />

          <hr style={{ margin: "2rem 0" }} />

          {progress.loaded ? (
            <CodeExercise
              title="Task 01 - count_valid_queens_placements"
              description={<>Write a function that computes recursively and returns the number of possible ways to place <code>n</code> queens on an <code>n×n</code> chessboard without them being able to run into each other. It must be prototyped as follows:</>}
              prototype="int count_valid_queens_placements(int n);"
              starterCode={starterCode}
              expectedOutput="2"
              functionCall={`int r = count_valid_queens_placements(4); char c = '0' + r; write(1, &c, 1)`}
              taskId="count_valid_queens_placements"
              savedCode={progress.getSavedExercise("count_valid_queens_placements")?.code}
              onSuccess={(code) => progress.saveExercise("count_valid_queens_placements", code, true)}
            />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>Loading...</p>
          )}
        </>
      )}
    </LessonLayout>
  );
}
