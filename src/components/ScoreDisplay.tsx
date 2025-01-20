import SlotCounter from "react-slot-counter";

interface ScoreDisplayProps {
    score: number;
}

export default function ScoreDisplay({ score }: Readonly<ScoreDisplayProps>) {
    return (
        <p className="font-customFont text-green-500 text-left m-2">
            SCORE:{" "}
            <SlotCounter value={score} />
        </p>
    )
}