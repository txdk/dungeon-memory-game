import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import NewGameButton from "./NewGameButton";
import { GameStatus } from "../reducers/GameState"; 
import CombatDisplay from "./CombatDisplay";
import GameOverScreen from "./GameOverScreen";
import MonsterInfoPanel from "./MonsterInfoPanel";
import StageStartScreen from "./StageStartScreen";
import StageClearScreen from "./StageClearScreen";
import HeadsUpDisplay from "./HeadsUpDisplay";
import StageSelectScreen from "./StageSelectScreen";
import { useAlert } from "../hooks/useAlert";

export default function Screen() {

    const { state, startGame } = useContext(GameContext);
    const textColour = useAlert(state.currentHealth).colour;
    
    // Determine what element to render on screen based on game status
    const renderScreenElement = () => {
        switch (state.status) {
            case (GameStatus.NOT_STARTED):
                return <NewGameButton startGame={startGame} />; 
            
            case (GameStatus.START_NEW_STAGE):
                return <StageStartScreen stage={state.currentStage!} />;

            case (GameStatus.IN_PROGRESS):
                return (
                    <>
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} score={state.score} />
                        {
                            state.currentMonster !== null && (
                                !state.seenMonsters.includes(state.currentMonster.id)? (
                                    <MonsterInfoPanel monster={state.currentMonster} />
                                ):
                                <CombatDisplay textColour={textColour} monster={state.currentMonster} />
                            )
                        }       
                    </>
                );

            case (GameStatus.STAGE_CLEAR):
                return (
                    <>
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} score={state.score} />
                        <StageClearScreen stage={state.currentStage!} />
                    </>
                );

            case (GameStatus.STAGE_SELECT):
                return (
                    <>
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} score={state.score} />
                        <StageSelectScreen />
                    </>
                );
                
            case (GameStatus.GAME_OVER):
                return <GameOverScreen monsterName={state.currentMonster!.name} score={state.score} startGame={startGame} />

            default:
                return <></>;
        }
    };

    return ( 
        <div className="mx-2 md:mx-10 w-[95%] md:w-2/3 border rounded-2xl h-[400px] md:h-[350px] relative bg-black">
            {renderScreenElement()}
        </div>  
    );
}