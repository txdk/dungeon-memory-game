import { Stage } from "../core/Stages";
import { useDelay } from "../hooks/useDelay";
import AnimatedText from "./generic/AnimatedText";
import SlotCounter from "react-slot-counter";
import Button from "./generic/Button";
import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import { GameStatus } from "../reducers/GameState";

interface StageClearScreenProps {
    stage: Stage;
}

export default function StageClearScreen({ stage }: Readonly<StageClearScreenProps>) {

    const buttonVisibility: boolean = useDelay(stage.id);
    const { setGameStatus } = useContext(GameContext);

    return (
        <div className="font-customFont text-green-500 text-center mt-[100px]">
            <div className="text-3xl md:text-4xl">
                <AnimatedText
                    id={stage.id}
                    text={"Stage clear!"}
                    delay={75}
                />
            </div>
            <p className="text-sm md:text-base mt-3 md:mt-5">
                You conquered {stage.name.toLowerCase()} and gained{" "}
                <SlotCounter value={stage.scoreReward} />
                {" "}score!
            </p>
            {
                buttonVisibility &&
                <Button
                    className="flex mt-[50px] md:mt-[50px] relative p-1 md:p-1.5 left-[32%] md:left-[40%] items-center fade-in" 
                    handleClick={() => setGameStatus(GameStatus.STAGE_SELECT)}
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