import { createContext } from "react";
import { GameInput } from "../constants/GameConstants";
import { initialState } from "../reducers/GameReducer";

const GameContext = createContext({
    state: initialState, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerInput: (_: GameInput) => {},
    startGame: () => {},
    generateNextMonster: () => {},
    startNewStage: () => {},
    closeInfoPanel: () => {}
});

export default GameContext;

