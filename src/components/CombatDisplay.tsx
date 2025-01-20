import { useContext } from "react";
import { Monster } from "../core/Monsters";
import Button from "./Button";
import PlayerInputDisplay from "./PlayerInputDisplay";
import GameContext from "../contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import AnimatedText from "./AnimatedText";
import { getMonsterArticle } from "../core/MonsterGenerator";

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
            <div className="text-center m-5 pt-5">
                <AnimatedText 
                    id={monster.instanceId}
                    text={`You encountered ${getMonsterArticle(monster.name)} ${monster.name}!`}
                    delay={25}
                />
            </div>

            <PlayerInputDisplay />
            {
                monster.isDefeated && (
                    <div className="flex items-center">
                        <p className="p-5 ml-5 font-customFont text-green-500">
                            You defeated the {monster.name} and gained {monster.score} score!
                        </p>
                        
                        <Button className="flex p-1.5 h-2/3 items-center" handleClick={generateNextMonster}>
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