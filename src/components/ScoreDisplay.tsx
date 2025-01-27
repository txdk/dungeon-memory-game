import classNames from "classnames";
import SlotCounter from "react-slot-counter";

interface ScoreDisplayProps {
    textColour: string;
    score: number;
}

export default function ScoreDisplay({ textColour, score }: Readonly<ScoreDisplayProps>) {
    return (
        <p className={classNames(textColour, "font-customFont text-left m-2")}>
            SCORE:{" "}
            <SlotCounter value={score} />
        </p>
    )
}