import { getMonsterArticle } from "../core/MonsterGenerator";
import NewGameButton from "./NewGameButton";
import SlotCounter from "react-slot-counter";

interface GameOverScreenProps {
    monsterName: string;
    score: number;
    startGame: () => void;
}

export default function GameOverScreen({ monsterName, score, startGame }: Readonly<GameOverScreenProps>) {
    return (
        <>
            <p className="font-customFont text-4xl text-green-500 text-center mt-[100px]">Game Over!</p>
            <p className="font-customFont text-green-500 text-center mt-3">
                Slain by {getMonsterArticle(monsterName)} {monsterName}...
            </p>
            <p className="font-customFont text-green-500 text-center mt-3">
                FINAL SCORE:{" "}
                <SlotCounter value={score} />
            </p>
            <NewGameButton className="mt-[60px]" startGame={startGame} />
        </>
    );
}