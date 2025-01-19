import { Monster } from "../core/Monsters";
import PlayerInputDisplay from "./PlayerInputDisplay";

interface CombatDisplayProps {
    monster: Monster | null;
}

export default function CombatDisplay({ monster }: Readonly<CombatDisplayProps>) {

    // Display nothing if there are no active monsters
    if (monster === null) {
        return <></>;
    }

    return (
        <>
            {/* Monster display text */}
            <p className="font-customFont text-green-500 text-center m-5 pt-5">
                You encountered a {monster.name}!
            </p>

            <PlayerInputDisplay />
        </>
    );
}