import NewGameButton from "./NewGameButton";

interface GameOverScreenProps {
    score: number;
    startGame: () => void;
}

export default function GameOverScreen({ score, startGame }: Readonly<GameOverScreenProps>) {
    return (
        <>
            <p className="font-customFont text-4xl text-green-500 text-center mt-[100px]">Game Over!</p>
            <p className="font-customFont text-green-500 text-center mt-3">FINAL SCORE: {score}</p>
            <NewGameButton className="mt-[100px]" startGame={startGame} />
        </>
    );
}