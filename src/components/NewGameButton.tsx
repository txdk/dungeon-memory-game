import classNames from "classnames";
import Button from "./Button";

interface NewGameButtonProps {
    className?: string;
    startGame: () => void;
}

export default function NewGameButton( { className, startGame }: Readonly<NewGameButtonProps>) {
    return (
        <div className={classNames(className, "flex justify-center mt-[130px]")}>
            <Button className="text-yellow-500" handleClick={startGame}>New Game</Button>
        </div>
    );
}