import { useContext } from "react";
import GameContext from "@/contexts/GameContext";
import NewGameButton from "@/components/NewGameButton";
import { GameStatus } from "@/reducers/GameState"; 
import CombatDisplay from "@/components/CombatDisplay";
import GameOverScreen from "@/components/GameOverScreen";
import MonsterInfoPanel from "@/components/MonsterInfoPanel";
import StageStartScreen from "@/components/stage/StageStartScreen";
import StageClearScreen from "@/components/stage/StageClearScreen";
import HeadsUpDisplay from "@/components/headsUpDisplay/HeadsUpDisplay";
import StageSelectScreen from "@/components/stage/StageSelectScreen";
import { useAlert } from "@/hooks/useAlert";
import Shop from "@/components/shop/Shop";
import WinScreen from "./WinScreen";

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
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} gold={state.gold} />
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
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} gold={state.gold} />
                        <StageClearScreen stage={state.currentStage!} />
                    </>
                );

            case (GameStatus.STAGE_SELECT):
                return (
                    <>
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} gold={state.gold} />
                        <StageSelectScreen />
                    </>
                );

            case (GameStatus.IN_SHOP):
                return (
                    <>
                        <HeadsUpDisplay textColour={textColour} currentHealth={state.currentHealth} gold={state.gold} />
                        <Shop /> 
                    </>
                );
            
            case (GameStatus.GAME_WIN):
                return (
                    <WinScreen score={state.score} startGame={startGame} />
                ); 
            
            case (GameStatus.GAME_OVER):
                return <GameOverScreen 
                    monsterName={state.currentMonster!.name} 
                    stageName={state.currentStage!.name} 
                    score={state.score} 
                    startGame={startGame} 
                />

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