import { useContext } from "react";
import Button from "./Button";
import HealthBar from "./HealthBar";
import GameContext from "../contexts/GameContext";

export default function Screen() {

    const { state, startGame } = useContext(GameContext);

    return ( 
        <div className="mx-10 w-2/3 border rounded-2xl h-[350px] relative bg-black">
            {
                state.currentLevel === undefined? 
                <div className="flex justify-center mt-[130px]">
                    <Button className="text-yellow-500" handleClick={startGame}>New Game</Button>
                </div>:
                <>
                    <HealthBar />
                    <p className="font-customFont text-green-500 text-left m-2">Score: {state.score}</p>
                    <p className="font-customFont text-green-500 text-center m-5">You encountered: a goblin!</p>
                </>
            }
            
        </div>  
    );
}