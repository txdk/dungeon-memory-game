/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { GameInput } from "@/constants/GameConstants";
import { GameStatus, initialState } from "@/reducers/GameState";
import { NewStageParams } from "@/types/Stage";
import { Item } from "@/types/Item";

const GameContext = createContext({
    state: initialState, 
    registerInput: (_: GameInput) => {},
    startGame: () => {},
    startNewStage: (_: NewStageParams) => {},
    generateNextMonster: () => {},
    setGameStatus: (_: GameStatus) => {},
    buyItem: (_: Item) => {},
    closeInfoPanel: () => {}
});

export default GameContext;

