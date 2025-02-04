import { useContext } from "react";
import { Monster } from "@/types/Monster";
import Button from "@/components/generic/Button";
import PlayerInputDisplay from "@/components/PlayerInputDisplay";
import GameContext from "@/contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import AnimatedText from "@/components/generic/AnimatedText";
import { getMonsterArticle } from "@/utils/monsterGenerationUtils";
import SlotCounter from "react-slot-counter";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import classNames from "classnames";
import { POWERUP_SOUND, PROCEED_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";
import useSound from "use-sound";

interface CombatDisplayProps {
    monster: Monster | null;
    hints: number;
    textColour: string;
}

export default function CombatDisplay({ monster, hints, textColour }: Readonly<CombatDisplayProps>) {

    const { generateNextMonster, activateHint } = useContext(GameContext);
    const isMonsterDefeated: boolean = monster?.isDefeated ?? false;
    const [playProceed] = useSound(PROCEED_SOUND, {volume: SFX_VOLUME});
    const handleProceed = () => {
        playProceed();
        generateNextMonster();
    };
    useKeyHandler(handleProceed, ["Space", "Enter"], isMonsterDefeated);

    const [playHint] = useSound(POWERUP_SOUND, {volume: SFX_VOLUME});
    const handleActivateHint = () => {
        playHint();
        activateHint();
    };
    useKeyHandler(handleActivateHint, ["KeyH"], !isMonsterDefeated && hints > 0);

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
                monster.isDefeated ? (
                    <div className="flex flex-col md:flex-row items-center">
                        <p className="p-0 md:p-5 ml-5 font-customFont text-green-500 text-sm">
                            You defeated the {monster.name} and gained {" "}
                            <SlotCounter value={monster.score} duration={0.5} />
                            {" "}gold!
                        </p>
                        
                        <Button className="flex p-1 md:p-1.5 mt-3 md:mt-0 h-2/3 items-center" handleClick={handleProceed}>
                            <>
                                <span className="text-xs md:text-sm">Proceed</span>
                                <RxDoubleArrowRight className="ml-2" />
                            </>
                        </Button>
                    </div>  
                ):
                hints > 0 && (
                    <div className="flex justify-center">
                        <Button className="flex p-0.5 md:p-1.5 mt-12 h-2/3 items-center" handleClick={handleActivateHint}>
                            <span className={classNames(textColour, "text-xs")}>Hint? ({hints})</span>
                        </Button>
                    </div>
                )
            }
        </>
    );
}