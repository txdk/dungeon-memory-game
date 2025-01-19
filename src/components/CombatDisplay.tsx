import { useContext } from "react";
import { Monster } from "../core/Monsters";
import Button from "./Button";
import PlayerInputDisplay from "./PlayerInputDisplay";
import GameContext from "../contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";

interface CombatDisplayProps {
    monster: Monster | null;
}

export default function CombatDisplay({ monster }: Readonly<CombatDisplayProps>) {

    const { generateNextMonster } = useContext(GameContext);

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
            {
                monster.isDefeated && (
                    <div className="flex items-center">
                        <p className="p-5 ml-5 font-customFont text-green-500">
                            You defeated the {monster.name} and gained {monster.score} score!
                        </p>
                        
                        <Button className="flex p-2 h-2/3 items-center" handleClick={generateNextMonster}>
                            <>
                                <span className="text-sm">Proceed</span>
                                <RxDoubleArrowRight className="ml-2" />
                            </>
                        </Button>
                    </div>  
                )
            }
        </>
    );
}