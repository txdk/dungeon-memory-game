import { useCallback, useMemo, useReducer } from "react";
import gameReducer, { GameInput, initialState } from "../reducers/GameReducer";
import GameContext from "./GameContext";

export default function GameProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [gameState, dispatch] = useReducer(gameReducer, initialState);

    // Register the action of the player pressing an input control
    const registerInput = useCallback(
        (input: GameInput) => {
            dispatch(input)
        }, 
        [dispatch]
    );

    // Handle starting a new game
    const startGame = () => {
        dispatch(GameInput.START_GAME);
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