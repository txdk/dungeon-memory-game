import { MAX_HEALTH } from "../constants/GameConstants";

export interface GameState {
    playerInputs: Array<GameInput>;
    currentHealth: number;
    currentLevel: number | undefined;
    score: number;
}

export const initialState: GameState = {
    playerInputs: [],
    currentHealth: MAX_HEALTH,
    currentLevel: undefined,
    score: 0
};

export enum GameInput {
    INPUT_LEFT,
    INPUT_UP,
    INPUT_RIGHT,
    INPUT_ATTACK,
    INPUT_SHIELD,
    START_GAME
}

export default function gameReducer(state: GameState, action: GameInput): GameState {
    // Process game start
    if (action === GameInput.START_GAME) {
        return {
            ...initialState,
            currentLevel: 1
        };
    }

    // Process controller input
    return {
        ...state,
        playerInputs: [...state.playerInputs, action]
    };
}