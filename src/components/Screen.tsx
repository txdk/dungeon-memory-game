import { useContext } from "react";
import HealthBar from "./HealthBar";
import GameContext from "../contexts/GameContext";
import NewGameButton from "./NewGameButton";
import ScoreDisplay from "./ScoreDisplay";
import { GameStatus } from "../reducers/GameReducer";
import CombatDisplay from "./CombatDisplay";
import GameOverScreen from "./GameOverScreen";
import MonsterInfoPanel from "./MonsterInfoPanel";

export default function Screen() {

    const { state, startGame } = useContext(GameContext);
    
    // Determine what element to render on screen based on game status
    let screenElement: JSX.Element = <></>;

    if (state.status === GameStatus.NOT_STARTED) {
        screenElement = <NewGameButton startGame={startGame} />; 
    }
    else if (state.status === GameStatus.IN_PROGRESS) {
        screenElement = (
            <>
                <HealthBar />
                <ScoreDisplay score={state.score} />
                {
                    state.currentMonster !== null && (
                        !state.seenMonsters.includes(state.currentMonster.id)? (
                            <MonsterInfoPanel monster={state.currentMonster} />
                        ):
                        <CombatDisplay monster={state.currentMonster} />
                    )
                }       
            </>
        );
    }
    else if (state.status === GameStatus.GAME_OVER) {
        screenElement = <GameOverScreen monsterName={state.currentMonster!.name} score={state.score} startGame={startGame} />; 
    }

    return ( 
        <div className="mx-2 md:mx-10 w-[95%] md:w-2/3 border rounded-2xl h-[400px] md:h-[350px] relative bg-black">
            {screenElement}  
        </div>  
    );
}