import HealthBar from "./HealthBar";
import ScoreDisplay from "./ScoreDisplay";

interface HeadsUpDisplayProps {
    textColour: string;
    currentHealth: number;
    score: number;
}

export default function HUD({ textColour, currentHealth, score }: Readonly<HeadsUpDisplayProps>) {
    return (
        <>
            <HealthBar colour={textColour} currentHealth={currentHealth} />
            <ScoreDisplay textColour={textColour} score={score} />
        </>
    );
}