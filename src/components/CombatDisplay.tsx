import { useContext } from "react";
import { Monster } from "../core/monsters/Monster";
import Button from "./generic/Button";
import PlayerInputDisplay from "./PlayerInputDisplay";
import GameContext from "../contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import AnimatedText from "./generic/AnimatedText";
import { getMonsterArticle } from "../core/monsters/MonsterGenerator";
import SlotCounter from "react-slot-counter";
import { useKeyHandler } from "../hooks/useKeyHandler";

interface CombatDisplayProps {
    monster: Monster | null;
    textColour: string;
}

export default function CombatDisplay({ monster, textColour }: Readonly<CombatDisplayProps>) {

    const { generateNextMonster } = useContext(GameContext);
    useKeyHandler(generateNextMonster, monster?.isDefeated ?? false);

    // Display nothing if there are no active monsters
    if (monster === null) {
        return <></>;
    };

    return (
        <>
            {/* Monster display text */}
            <div className="text-center m-5 pt-5">
                <AnimatedText 
                    id={monster.instanceId}
                    className={textColour}
                    text={`You encountered ${getMonsterArticle(monster.name)} ${monster.name}!`}
                    delay={25}
                />
            </div>

            <PlayerInputDisplay className={textColour} />
            {
                monster.isDefeated && (
                    <div className="flex flex-col md:flex-row items-center">
                        <p className="p-0 md:p-5 ml-5 font-customFont text-green-500 text-sm">
                            You defeated the {monster.name} and gained {" "}
                            <SlotCounter value={monster.score} duration={0.5} />
                            {" "}score!
                        </p>
                        
                        <Button className="flex p-1 md:p-1.5 mt-3 md:mt-0 h-2/3 items-center" handleClick={generateNextMonster}>
                            <>
                                <span className="text-xs md:text-sm">Proceed</span>
                                <RxDoubleArrowRight className="ml-2" />
                            </>
                        </Button>
                    </div>  
                )
            }
        </>
    );
}