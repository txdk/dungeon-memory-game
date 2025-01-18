import { createContext } from "react";
import { GameInput, initialState } from "../reducers/GameReducer";

const GameContext = createContext({
    state: initialState, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerInput: (_: GameInput) => {},
    startGame: () => {}
});

export default GameContext;

