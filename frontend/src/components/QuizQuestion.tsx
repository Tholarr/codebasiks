import { useState, useEffect } from "react";
import { secondaryButtonStyle } from "../styles/common";

type Props = {
  question: string;
  choices: string[];
  correct: string;
  savedAnswer?: string | null;
  onAnswer?: (answer: string, correct: boolean) => void;
};

export default function QuizQuestion({ question, choices, correct, savedAnswer, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (savedAnswer) {
      setSelected(savedAnswer);
      setVerified(true);
    }
  }, [savedAnswer]);

  const getColor = (choice: string): string => {
    if (!verified) return "black";
    if (choice === correct) return "green";
    if (choice === selected) return "red";
    return "black";
  };

  const handleVerify = () => {
    if (!selected) return;
    setVerified(true);
    onAnswer?.(selected, selected === correct);
  };

  return (
    <div>
      <h2>Question</h2>
      <p><strong>{question}</strong></p>

      {choices.map(choice => (
        <label key={choice} style={{ display: "block", margin: "0.4rem 0", color: getColor(choice) }}>
          <input
            type="radio"
            name={`quiz-${question}`}
            value={choice}
            checked={selected === choice}
            onChange={() => !verified && setSelected(choice)}
            disabled={verified}
          />
          {" "}{choice}
        </label>
      ))}

      {!verified && (
        <button onClick={handleVerify} style={{ ...secondaryButtonStyle, marginTop: "1rem" }}>
          Verify
        </button>
      )}
    </div>
  );
}
