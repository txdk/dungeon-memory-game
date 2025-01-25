import { useCallback, useMemo, useReducer } from "react";
import gameReducer from "../reducers/GameReducer";
import GameContext from "./GameContext";
import { GameInput } from "../constants/GameConstants";
import { GameActionType, GameStatus, initialState } from "../reducers/GameState";
import { NewStageParams } from "../core/Stages";

export default function GameProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [gameState, dispatch] = useReducer(gameReducer, initialState);

    // Register the action of the player pressing an input control
    const registerInput = useCallback(
        (input: GameInput) => {
            dispatch({
                type: GameActionType.PLAYER_INPUT,
                payload: input
            })
        }, 
        [dispatch]
    );

    // Handle starting a new game
    const startGame = () => {
        dispatch({
            type: GameActionType.START_GAME,
            payload: null
        });
    };

    // Handle starting a new stage
    const startNewStage = (newStageParams : NewStageParams) => {
        dispatch({
            type: GameActionType.START_NEW_STAGE,
            payload: newStageParams
        });
    };

    // Generate next monster encounter
    const generateNextMonster = () => {
        dispatch({
           type: GameActionType.GENERATE_NEXT_MONSTER,
           payload: null 
        });
    };

    // Set game status
    const setGameStatus = (status: GameStatus) => {
        dispatch({
            type: GameActionType.SET_GAME_STATUS,
            payload: status
        })
    };

    // Close monster info panel
    const closeInfoPanel = () => {
        dispatch({
            type: GameActionType.CLOSE_INFO_PANEL,
            payload: null
        })
    }

    const providerValue = useMemo(() => ({
        state: gameState,
        registerInput: registerInput,
        startGame: startGame,
        startNewStage: startNewStage,
        generateNextMonster: generateNextMonster,
        setGameStatus: setGameStatus,
        closeInfoPanel: closeInfoPanel
    }), [gameState, registerInput])

    return (
        <GameContext.Provider value={providerValue}>
            {children}
        </GameContext.Provider>
    )
}