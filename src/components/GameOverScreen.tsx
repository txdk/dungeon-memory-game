import { getMonsterArticle } from "@/utils/monsterGenerationUtils";
import AnimatedText from "@/components/generic/AnimatedText";
import NewGameButton from "@/components/NewGameButton";
import SlotCounter from "react-slot-counter";
import { v4 as uuidv4} from 'uuid';

interface GameOverScreenProps {
    monsterName: string;
    stageName: string;
    score: number;
    startGame: () => void;
}

export default function GameOverScreen({ monsterName, stageName, score, startGame }: Readonly<GameOverScreenProps>) {
    return (
        <>
            <div className="font-customFont text-3xl md:text-4xl text-green-500 text-center mt-[100px]">
                <AnimatedText
                    id={uuidv4()}
                    text={"Game Over!"}
                    delay={75}
                />
            </div>
            <p className="font-customFont text-green-500 text-center text-sm md:text-base mt-3">
                Slain by {getMonsterArticle(monsterName)} {monsterName} in {stageName.toLowerCase()}...
            </p>
            <p className="font-customFont text-green-500 text-center text-sm md:text-base mt-3">
                FINAL SCORE:{" "}
                <SlotCounter value={score} />
            </p>
            <NewGameButton className="mt-[60px]" startGame={startGame} />
        </>
    );
}