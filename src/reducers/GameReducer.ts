import { GameInput, LEVEL_REQUIREMENTS, MIN_ENCOUNTERS_BEFORE_NEW_MONSTER } from "../constants/GameConstants";
import { checkMonsterDefeated, checkPlayerInput, getGameStatus } from "../core/CombatModule";
import { generateMonsterList, getRandomMonsterFromStage } from "../core/MonsterGenerator";
import { Encounter, Monster } from "../core/Monsters";
import { generateFirstStage } from "../core/Stages";
import { GameAction, GameActionType, GameState, GameStatus, initialState } from "./GameState";

// Start a new game
const handleGameStart = () => {
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
    } as GameState;
};

// Handle player input
const handlePlayerInput = (state: GameState, input: GameInput) => {
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
    const isCorrect: boolean = checkPlayerInput(input, state.correctInputs, state.currentMonster);
    const correctInputs: number = state.correctInputs + Number(isCorrect);
    const playerHealth: number = state.currentHealth - Number(!isCorrect);
    const isMonsterDefeated: boolean = checkMonsterDefeated(correctInputs, state.currentMonster);
    const isNewestMonster: boolean = state.currentMonster.id === state.newestEncounter!.monster.id;

    return {
        ...state,
        status: getGameStatus(playerHealth),
        playerInputs: [
            ...state.playerInputs, 
            {input: input, isCorrect: isCorrect}
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
};

// Set game status
const setGameStatus = (state: GameState, status: GameStatus) => {
    return {
        ...state,
        status: status
    };
};

// Generate next monster
const generateNextMonster = (state: GameState) => {
    const scoreIncrease: number = state.currentMonster?.isDefeated? state.currentMonster.score: 0;
    const newScore: number = state.score + scoreIncrease;

    // Check stage clear condition
    if (
        state.newestEncounter!.quantity >= state.currentStage!.clearCondition.finalMonsterCount &&
        newScore >= state.currentStage!.clearCondition.scoreRequirement
    ) {
        return {
            ...state,
            status: GameStatus.STAGE_CLEAR,
            playerInputs: [],
            correctInputs: 0,
            score: newScore + state.currentStage!.scoreReward
        } as GameState;
    }

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
            monster: state.monsterList[newLevel - 1], // NOTE: next monster is fetched incrementally from the total monster list
            quantity: canLevelUp? 0: state.newestEncounter!.quantity
        }
    } as GameState;
};

// Handle the closing of the new monster encounter info panel and registering the new monster as seen
const handleCloseMonsterInfoPanel = (state: GameState) => {
    return {
        ...state,
        seenMonsters: [...(state.seenMonsters), state.currentMonster!.id]
    } as GameState;
};

// Central management of game state
export default function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        // Process game start
        case GameActionType.START_GAME: 
            return handleGameStart();

        // Process player input
        case GameActionType.PLAYER_INPUT:
            return handlePlayerInput(state, action.payload as GameInput);

        // Generate next monster
        case GameActionType.GENERATE_NEXT_MONSTER:
            return generateNextMonster(state);

        // Set game status
        case GameActionType.SET_GAME_STATUS: 
            return setGameStatus(state, action.payload as GameStatus);

        // Close monster info panel - new monster encounter
        case GameActionType.CLOSE_INFO_PANEL:
            return handleCloseMonsterInfoPanel(state);

        default:
            return state;
    }
}