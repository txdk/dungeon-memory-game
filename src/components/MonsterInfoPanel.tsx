import { useContext } from "react";
import { Monster } from "@/types/Monster";
import Button from "@/components/generic/Button";
import GameContext from "@/contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import AnimatedText from "@/components/generic/AnimatedText";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import { renderDefeatSequence } from "@/utils/monsterInfoUtils";
import useSound from "use-sound";
import { PROCEED_SOUND } from "@/constants/AudioConstants";

interface MonsterInfoPanelProps {
    monster: Monster;
    monsterType: Monster;
}

export default function MonsterInfoPanel({ monster, monsterType }: Readonly<MonsterInfoPanelProps>) {

    const { closeInfoPanel } = useContext(GameContext);
    const [play] = useSound(PROCEED_SOUND, {volume: 0.5});
    const handleProceed = () => {
        play();
        closeInfoPanel();
    };

    useKeyHandler(handleProceed, ["Space", "Enter"]);

    return (
        <div className="font-customFont text-green-500 text-center text-sm md:text-base m-5 pt-5">
            <AnimatedText 
                id={monster.instanceId}
                text={`New monster discovered: ${monster.name}!`}
                delay={25}
            />
            <p className="text-xs md:text-base pt-5">
                {monster.description}
            </p>
            <span className="flex justify-left mt-5 text-xs md:text-base">
                To defeat: {renderDefeatSequence(monsterType)}
            </span>
            <Button className="flex mt-7 md:mt-3 relative p-1 md:p-1.5 left-[32%] md:left-[40%] items-center" handleClick={handleProceed}>
                <>
                    <span className="text-xs md:text-sm">Proceed</span>
                    <RxDoubleArrowRight className="ml-2" />
                </>
            </Button>
        </div>
    );
}