import { Stage } from "@/types/Stage";
import { useDelay } from "@/hooks/useDelay";
import AnimatedText from "@/components/generic/AnimatedText";
import SlotCounter from "react-slot-counter";
import Button from "@/components/generic/Button";
import { useContext } from "react";
import GameContext from "@/contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import { GameStatus } from "@/reducers/GameState";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import { getTimeInterval } from "@/utils/mathUtils";
import { FINAL_STAGE_NUMBER } from "@/constants/GameConstants";

interface StageClearScreenProps {
    stage: Stage;
};

export default function StageClearScreen({ stage }: Readonly<StageClearScreenProps>) {

    const buttonVisibility: boolean = useDelay(stage.id);
    const { setGameStatus } = useContext(GameContext);
    const handleClick = () => {

        if (stage.number === FINAL_STAGE_NUMBER) {
            setGameStatus(GameStatus.GAME_WIN);
        }
        else {
            setGameStatus(GameStatus.IN_SHOP); 
        };
    };
    useKeyHandler(handleClick, ["Space", "Enter"], buttonVisibility);

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
                You conquered {stage.name.toLowerCase()} in{" "}
                {getTimeInterval(stage.startTimestamp, stage.endTimestamp)} and gained{" "}
                <SlotCounter value={stage.goldReward} />
                {" "}gold!
            </p>
            {
                buttonVisibility &&
                <Button
                    className="flex mt-[50px] md:mt-[50px] relative p-1 md:p-1.5 left-[32%] md:left-[43%] items-center fade-in" 
                    handleClick={handleClick}
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