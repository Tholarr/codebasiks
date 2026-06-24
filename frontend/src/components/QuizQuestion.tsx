import { useState } from "react";
import { secondaryButtonStyle } from "../styles/common";

type Props = {
    question: string;
    choices: string[];
    correct: string;
};

export default function QuizQuestion({ question, choices, correct }: Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);

    const getColor = (choice: string): string => {
        if (!verified) return "black";
        if (choice === correct) return "green";
        if (choice === selected) return "red";
        return "black";
    };

    return (
        <div>
            <h2>Question</h2>
            <p><strong>{question}</strong></p>

            {choices.map(choice => (
                <label key={choice} style={{ display: "block", margin: "0.4rem 0", color: getColor(choice) }}>
                    <input
                        type="radio"
                        name="quiz"
                        value={choice}
                        checked={selected === choice}
                        onChange={() => !verified && setSelected(choice)}
                    />
                    {" "}{choice}
                </label>
            ))}

            <button onClick={() => setVerified(true)} style={{ ...secondaryButtonStyle, marginTop: "1rem" }}>
                Verify
            </button>
        </div>
    );
}
