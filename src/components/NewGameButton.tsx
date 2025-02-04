import classNames from "classnames";
import Button from "@/components/generic/Button";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import useSound from "use-sound";
import { SELECT_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";

interface NewGameButtonProps {
    className?: string;
    startGame: () => void;
};

export default function NewGameButton( { className, startGame }: Readonly<NewGameButtonProps>) {

    const [play] = useSound(SELECT_SOUND, {volume: SFX_VOLUME});
    const handleGameStart = () => {
        play();
        startGame();
    };

    useKeyHandler(handleGameStart, ["Space", "Enter"]);

    return (
        <div className={classNames(className, "flex justify-center mt-[130px]")}>
            <Button className="text-yellow-500" handleClick={handleGameStart}>New Game</Button>
        </div>
    );
}