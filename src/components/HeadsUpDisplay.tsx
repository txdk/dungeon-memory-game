import HealthBar from "@/components/HealthBar";
import ScoreDisplay from "@/components/ScoreDisplay";

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