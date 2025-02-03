import { APP_COLOURS } from "@/constants/AppConstants";
import Button from "@/components/generic/Button";
import { GameStatus } from "@/reducers/GameState";
import useSound from "use-sound";
import { SELECT_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";
import { useKeyHandler } from "@/hooks/useKeyHandler";

interface TutorialScreenProps {
    setGameStatus: (status: GameStatus) => void;
};

export default function TutorialScreen({ setGameStatus }: Readonly<TutorialScreenProps>) {

    const [play] = useSound(SELECT_SOUND, {volume: SFX_VOLUME});
    const handleSelect = () => {
        play();
        setGameStatus(GameStatus.NOT_STARTED);
    };
    useKeyHandler(handleSelect, ["Space", "Enter"]);

    return (
        <div className={`${APP_COLOURS.PRIMARY} text-center font-customFont`}>
            <h1 className={"text-3xl md:text-4xl text-green mt-5"}>Controls</h1>
            <p className="text-sm md:text-base mt-5">Simply click on the relevant input buttons below</p>
            <p className="text-sm md:text-base mt-5">--OR--</p>
            <p className="text-sm md:text-base mt-5">Use arrow keys for directional input</p>
            <p className="text-sm md:text-base">A: attack</p>
            <p className="text-sm md:text-base">D: defend/shield</p>
            <p className="text-sm md:text-base">space/enter: proceed</p>
            <p className="text-sm md:text-base">H: use hint</p>
            <Button className="text-xs mt-5 md:mt-2" handleClick={handleSelect}>OK</Button>
        </div>
    );
};