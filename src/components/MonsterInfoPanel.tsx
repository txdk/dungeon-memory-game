import { useContext } from "react";
import { Monster } from "@/types/Monster";
import Button from "@/components/generic/Button";
import InputIcon from "@/components/generic/InputIcon";
import GameContext from "@/contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import { GameInput } from "@/constants/GameConstants";
import { v4 as uuidv4} from 'uuid';
import AnimatedText from "@/components/generic/AnimatedText";
import { useKeyHandler } from "@/hooks/useKeyHandler";

interface MonsterInfoPanelProps {
    monster: Monster;
}

export default function MonsterInfoPanel({ monster }: Readonly<MonsterInfoPanelProps>) {

    const { closeInfoPanel } = useContext(GameContext);
    useKeyHandler(closeInfoPanel);

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
                To defeat: {monster.defeatSequence.map((input: GameInput) => {
                    return <InputIcon key={`icon-${uuidv4()}`} input={input} />
                })}
            </span>
            <Button className="flex mt-7 md:mt-3 relative p-1 md:p-1.5 left-[32%] md:left-[40%] items-center" handleClick={closeInfoPanel}>
                <>
                    <span className="text-xs md:text-sm">Proceed</span>
                    <RxDoubleArrowRight className="ml-2" />
                </>
            </Button>
        </div>
    );
}