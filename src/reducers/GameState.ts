import { GameInput, MAX_HEALTH } from "@/constants/GameConstants";
import { Encounter, Monster } from "@/types/Monster";
import { Stage } from "@/types/Stage";

export interface PlayerInput {
    input: GameInput,
    isCorrect: boolean
};

export enum GameStatus {
    NOT_STARTED,
    START_NEW_STAGE,
    STAGE_CLEAR,
    STAGE_SELECT,
    IN_PROGRESS,
    IN_SHOP,
    GAME_WIN,
    GAME_OVER
};

export interface GameState {
    status: GameStatus,
    playerInputs: PlayerInput[];
    correctInputs: number;
    currentMonster: Monster | null;
    currentHealth: number;
    currentStage: Stage | null;
    currentLevel: number | null;
    score: number;
    gold: number;
    monsterList: Monster[];
    seenMonsters: number[];
    newestEncounter: Encounter | null;
};

export const initialState: GameState = {
    status: GameStatus.NOT_STARTED,
    playerInputs: [],
    correctInputs: 0,
    currentMonster: null,
    currentHealth: MAX_HEALTH,
    currentStage: null,
    currentLevel: null,
    score: 0,
    gold: 0,
    monsterList: [],
    seenMonsters: [],
    newestEncounter: null
};

export enum GameActionType {
    PLAYER_INPUT,
    START_NEW_STAGE,
    GENERATE_NEXT_MONSTER,
    SET_GAME_STATUS,
    BUY_ITEM,
    CLOSE_INFO_PANEL,
    START_GAME
};

export interface GameAction {
    type: GameActionType;
    payload: unknown;
};
