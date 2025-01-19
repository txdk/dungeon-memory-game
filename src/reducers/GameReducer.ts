import { GameInput, MAX_HEALTH } from "../constants/GameConstants";
import { checkMonsterDefeated, checkPlayerInput, getGameStatus } from "../core/CombatModule";
import { firstMonster, Monster } from "../core/Monsters";

export interface PlayerInput {
    input: GameInput,
    isCorrect: boolean
}

export enum GameStatus {
    NOT_STARTED,
    IN_PROGRESS,
    GAME_OVER
}

export interface GameState {
    status: GameStatus,
    playerInputs: Array<PlayerInput>;
    correctInputs: number;
    currentMonster: Monster | null;
    currentHealth: number;
    currentLevel: number | undefined;
    score: number;
}

export const initialState: GameState = {
    status: GameStatus.NOT_STARTED,
    playerInputs: [],
    correctInputs: 0,
    currentMonster: null,
    currentHealth: MAX_HEALTH,
    currentLevel: undefined,
    score: 0
};

export enum GameActionType {
    PLAYER_INPUT,
    GENERATE_NEXT_MONSTER,
    START_GAME
}

export interface GameAction {
    type: GameActionType;
    payload: unknown;
}

export default function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        // Process game start
        case GameActionType.START_GAME:
            return {
                ...initialState,
                status: GameStatus.IN_PROGRESS,
                currentMonster: {...firstMonster},
                currentLevel: 1
            };

        // Process player input
        case GameActionType.PLAYER_INPUT: {
            // Do nothing if there is no active monster or game not in progress
            if (state.status !== GameStatus.IN_PROGRESS || state.currentMonster === null || state.currentMonster.isDefeated) {
                return state;
            }

            // Check whether player input is correct and resolve consequences
            const playerInput = action.payload as GameInput;
            const isCorrect: boolean = checkPlayerInput(playerInput, state.correctInputs, state.currentMonster);
            const correctInputs: number = state.correctInputs + Number(isCorrect);
            const playerHealth: number = state.currentHealth - Number(!isCorrect);
            const isMonsterDefeated: boolean = checkMonsterDefeated(correctInputs, state.currentMonster);

            return {
                ...state,
                status: getGameStatus(playerHealth),
                playerInputs: [
                    ...state.playerInputs, 
                    {input: playerInput, isCorrect: isCorrect}
                ],
                correctInputs: correctInputs,
                currentHealth: playerHealth,
                currentMonster: {
                    ...state.currentMonster,
                    isDefeated: isMonsterDefeated
                }
            }; 
        }

        // Generate next monster
        case GameActionType.GENERATE_NEXT_MONSTER: {
            const scoreIncrease: number = state.currentMonster? state.currentMonster.score: 0;

            return {
                ...state,
                playerInputs: [],
                correctInputs: 0,
                score: state.score + scoreIncrease,
                currentMonster: {...firstMonster}
            };
        }

        default:
            return state;
    }
}