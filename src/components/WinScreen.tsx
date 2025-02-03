import AnimatedText from "@/components/generic/AnimatedText";
import SlotCounter from "react-slot-counter";
import { v4 as uuidv4} from 'uuid';
import NewGameButton from "@/components/NewGameButton";
import useSound from "use-sound";
import { LEVEL_CLEAR_SOUND } from "@/constants/AudioConstants";
import { useEffect } from "react";

interface WinScreenProps {
    score: number;
    startGame: () => void;
};

export default function WinScreen({ score, startGame }: Readonly<WinScreenProps>) {

    const [play] = useSound(LEVEL_CLEAR_SOUND, {volume: 0.5});

    useEffect(() => {
        play();
    }, [play]);

    return (
        <>
            <div className="font-customFont text-3xl md:text-4xl text-green-500 text-center mt-[100px]">
                <AnimatedText
                    id={uuidv4()}
                    text={"You win!"}
                    delay={75}
                />
            </div>
            <p className="font-customFont text-green-500 text-center text-sm md:text-base mt-3">
                FINAL SCORE:{" "}
                <SlotCounter value={score} />
            </p>
            <NewGameButton className="mt-[60px]" startGame={startGame} />
        </>
    );
};