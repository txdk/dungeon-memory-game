import Button from "@/components/generic/Button";
import { SELECT_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";
import { GameStatus } from "@/reducers/GameState";
import useSound from "use-sound";

interface HelpButtonProps {
    setGameStatus: (status: GameStatus) => void;
};

export default function HelpButton({ setGameStatus }: Readonly<HelpButtonProps>) {

    const [play] = useSound(SELECT_SOUND, {volume: SFX_VOLUME});

    const handleClick = () => {
        play();
        setGameStatus(GameStatus.TUTORIAL);
    };

    return (
        <div className="flex justify-center">
            <Button className="text-xs mt-10" handleClick={handleClick}>Help?</Button>
        </div>
    );
};