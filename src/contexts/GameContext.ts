import { createContext } from "react";
import { GameInput } from "../constants/GameConstants";
import { GameStatus, initialState } from "../reducers/GameState";

const GameContext = createContext({
    state: initialState, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerInput: (_: GameInput) => {},
    startGame: () => {},
    generateNextMonster: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setGameStatus: (_: GameStatus) => {},
    closeInfoPanel: () => {}
});

export default GameContext;

