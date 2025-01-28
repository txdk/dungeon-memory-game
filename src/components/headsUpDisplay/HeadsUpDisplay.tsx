import HealthBar from "@/components/HealthBar";
import GoldDisplay from "@/components/GoldDisplay";

interface HeadsUpDisplayProps {
    textColour: string;
    currentHealth: number;
    gold: number;
}

export default function HeadsUpDisplay({ textColour, currentHealth, gold }: Readonly<HeadsUpDisplayProps>) {
    return (
        <>
            <HealthBar colour={textColour} currentHealth={currentHealth} />
            <GoldDisplay textColour={textColour} gold={gold} />
        </>
    );
}