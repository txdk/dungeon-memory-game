import HealthBar from "@/components/headsUpDisplay/HealthBar";
import GoldDisplay from "@/components/headsUpDisplay/GoldDisplay";

interface HeadsUpDisplayProps {
    textColour: string;
    currentHealth: number;
    maxHealth: number;
    gold: number;
}

export default function HeadsUpDisplay({ textColour, currentHealth, maxHealth, gold }: Readonly<HeadsUpDisplayProps>) {
    return (
        <>
            <HealthBar colour={textColour} currentHealth={currentHealth} maxHealth={maxHealth} />
            <GoldDisplay textColour={textColour} gold={gold} />
        </>
    );
}