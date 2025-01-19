import { useCallback, useMemo, useReducer } from "react";
import gameReducer, { GameActionType, initialState } from "../reducers/GameReducer";
import GameContext from "./GameContext";
import { GameInput } from "../constants/GameConstants";

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

    const providerValue = useMemo(() => ({
        state: gameState,
        registerInput: registerInput,
        startGame: startGame
    }), [gameState, registerInput])

    return (
        <GameContext.Provider value={providerValue}>
            {children}
        </GameContext.Provider>
    )
}