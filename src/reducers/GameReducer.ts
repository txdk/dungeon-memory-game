import { GameInput, LEVEL_REQUIREMENTS, MAX_HEALTH, MIN_ENCOUNTERS_BEFORE_NEW_MONSTER } from "../constants/GameConstants";
import { checkMonsterDefeated, checkPlayerInput, getGameStatus } from "../core/CombatModule";
import { generateMonsterList, getRandomMonsterFromStage } from "../core/MonsterGenerator";
import { Encounter, Monster } from "../core/Monsters";
import { generateFirstStage, Stage } from "../core/Stages";

export interface PlayerInput {
    input: GameInput,
    isCorrect: boolean
}

export enum GameStatus {
    NOT_STARTED,
    START_NEW_STAGE,
    IN_PROGRESS,
    GAME_OVER
}

export interface GameState {
    status: GameStatus,
    playerInputs: Array<PlayerInput>;
    correctInputs: number;
    currentMonster: Monster | null;
    currentHealth: number;
    currentStage: Stage | null;
    currentLevel: number | undefined;
    score: number;
    monsterList: Array<Monster>;
    seenMonsters: Array<number>;
    newestEncounter: Encounter | null;
}

export const initialState: GameState = {
    status: GameStatus.NOT_STARTED,
    playerInputs: [],
    correctInputs: 0,
    currentMonster: null,
    currentHealth: MAX_HEALTH,
    currentStage: null,
    currentLevel: undefined,
    score: 0,
    monsterList: [],
    seenMonsters: [],
    newestEncounter: null
};

export enum GameActionType {
    PLAYER_INPUT,
    GENERATE_NEXT_MONSTER,
    START_NEW_STAGE,
    CLOSE_INFO_PANEL,
    START_GAME
}

export interface GameAction {
    type: GameActionType;
    payload: unknown;
}

export default function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        // Process game start
        case GameActionType.START_GAME: {
            const monsterList: Array<Monster> = generateMonsterList();
            const firstEncounter: Encounter = {
                monster: {...monsterList[0]},
                quantity: 0
            };

            return {
                ...initialState,
                status: GameStatus.START_NEW_STAGE,
                currentMonster: {...monsterList[0]},
                currentStage: {...(generateFirstStage(monsterList))},
                currentLevel: 1,
                monsterList: monsterList,
                newestEncounter: firstEncounter
            };
        };

        // Process player input
        case GameActionType.PLAYER_INPUT: {
            // Do nothing if there is no active monster or game not in progress
            if (
                state.status !== GameStatus.IN_PROGRESS || 
                state.currentMonster === null || 
                !state.seenMonsters.includes(state.currentMonster.id) ||
                state.currentMonster.isDefeated
            ) {
                return state;
            }

            // Check whether player input is correct and resolve consequences
            const playerInput = action.payload as GameInput;
            const isCorrect: boolean = checkPlayerInput(playerInput, state.correctInputs, state.currentMonster);
            const correctInputs: number = state.correctInputs + Number(isCorrect);
            const playerHealth: number = state.currentHealth - Number(!isCorrect);
            const isMonsterDefeated: boolean = checkMonsterDefeated(correctInputs, state.currentMonster);
            const isNewestMonster: boolean = state.currentMonster.id === state.newestEncounter!.monster.id;

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
                },
                newestEncounter: {
                    ...state.newestEncounter!,
                    quantity: state.newestEncounter!.quantity + ((isNewestMonster && isMonsterDefeated)? 1: 0)
                }
            }; 
        }

        // Generate next monster
        case GameActionType.GENERATE_NEXT_MONSTER: {
            const scoreIncrease: number = state.currentMonster?.isDefeated? state.currentMonster.score: 0;
            const newScore: number = state.score + scoreIncrease;

            // Check level-up condition
            const canLevelUp: boolean = (
                (newScore >= (LEVEL_REQUIREMENTS.get(state.currentLevel!) ?? Infinity)) &&
                (state.newestEncounter!.quantity >= MIN_ENCOUNTERS_BEFORE_NEW_MONSTER)
            );
            const newLevel: number = state.currentLevel! + (canLevelUp? 1: 0);
            const nextMonster: Monster = getRandomMonsterFromStage(newLevel, state.currentStage!);

            return {
                ...state,
                playerInputs: [],
                correctInputs: 0,
                score: newScore,
                currentLevel: newLevel,
                currentMonster: {...nextMonster},
                newestEncounter: {
                    ...(state.newestEncounter!),
                    monster: state.monsterList[newLevel - 1],
                    quantity: canLevelUp? 0: state.newestEncounter!.quantity
                }
            };
        };

        // Start new stage
        case GameActionType.START_NEW_STAGE: 
            return {
                ...state,
                status: GameStatus.IN_PROGRESS
            };

        // Close monster info panel - new monster encounter
        case GameActionType.CLOSE_INFO_PANEL:
            return {
                ...state,
                seenMonsters: [...(state.seenMonsters), state.currentMonster!.id]
            };

        default:
            return state;
    }
}