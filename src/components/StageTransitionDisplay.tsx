import { RxDoubleArrowRight } from "react-icons/rx";
import AnimatedText from "./generic/AnimatedText";
import Button from "./generic/Button";
import { useContext, useEffect, useState } from "react";
import { STAGE_TRANSITION_DELAY } from "../constants/AppConstants";
import { Stage } from "../core/Stages";
import GameContext from "../contexts/GameContext";

interface StageTransitionDisplayProps {
    stage: Stage;
}

export default function StageTransitionDisplay({ stage }: Readonly<StageTransitionDisplayProps>) {

    const [cachedId, setCachedId] = useState<string>("");
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(false);
    const { startNewStage } = useContext(GameContext);

    useEffect(() => {

        // Reset element if stage is new
        if (stage.id !== cachedId) {
            setButtonVisibility(false);
            setCachedId(stage.id);
        }

        // Delay display of button
        const timeout = setTimeout(() => {
            setButtonVisibility(true);
        }, STAGE_TRANSITION_DELAY);

        return () => clearTimeout(timeout);
    }, [stage.id, cachedId]);

    return (
        <div className="font-customFont text-green-500 text-center text-xl md:text-2xl mt-[100px]">
            <AnimatedText
                id={stage.id}
                text={`Now entering... ${stage.name.toLowerCase()}`}
                delay={50}
            />
            {
                buttonVisibility &&
                <Button 
                    className="flex mt-[50px] md:mt-[50px] relative p-1 md:p-1.5 left-[32%] md:left-[40%] items-center fade-in" 
                    handleClick={startNewStage}
                >
                    <>
                        <span className="text-xs md:text-sm">Proceed</span>
                        <RxDoubleArrowRight className="ml-2" />
                    </>
                </Button>
            }
        </div>
    );
}