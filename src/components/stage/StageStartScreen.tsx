import { RxDoubleArrowRight } from "react-icons/rx";
import AnimatedText from "@/components/generic/AnimatedText";
import Button from "@/components/generic/Button";
import { useContext } from "react";
import GameContext from "@/contexts/GameContext";
import { GameStatus } from "@/reducers/GameState";
import { useDelay } from "@/hooks/useDelay";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import { Stage } from "@/types/Stage";
import useSound from "use-sound";
import { PROCEED_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";

interface StageStartScreenProps {
    stage: Stage;
}

export default function StageStartScreen({ stage }: Readonly<StageStartScreenProps>) {

    const buttonVisibility: boolean = useDelay(stage.id);
    const { setGameStatus } = useContext(GameContext);
    const [play] = useSound(PROCEED_SOUND, {volume: SFX_VOLUME});
    const handleClick = () => {
        play();
        setGameStatus(GameStatus.IN_PROGRESS);
    };
    useKeyHandler(handleClick, ["Space", "Enter"], buttonVisibility);

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