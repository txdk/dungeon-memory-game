import classNames from "classnames";
import Button from "@/components/generic/Button";
import { useKeyHandler } from "@/hooks/useKeyHandler";

interface NewGameButtonProps {
    className?: string;
    startGame: () => void;
}

export default function NewGameButton( { className, startGame }: Readonly<NewGameButtonProps>) {

    useKeyHandler(startGame, ["Space", "Enter"]);

    return (
        <div className={classNames(className, "flex justify-center mt-[130px]")}>
            <Button className="text-yellow-500" handleClick={startGame}>New Game</Button>
        </div>
    );
}