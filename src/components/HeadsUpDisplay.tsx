import HealthBar from "./HealthBar";
import ScoreDisplay from "./ScoreDisplay";

interface HeadsUpDisplayProps {
    score: number;
}

export default function HUD({ score }: Readonly<HeadsUpDisplayProps>) {
    return (
        <>
            <HealthBar />
            <ScoreDisplay score={score} />
        </>
    );
}