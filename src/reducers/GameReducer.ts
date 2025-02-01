import { GameInput, MIN_ENCOUNTERS_BEFORE_NEW_MONSTER } from "@/constants/GameConstants";
import { checkMonsterDefeated, checkPlayerInput, getGameStatus } from "@/utils/combatUtils";
import { generateMonsterList, generateUniqueMonsterInputs, getRandomMonsterFromStage, handleUpdateMonsterList } from "@/utils/monsterGenerationUtils";
import { Encounter, Monster } from "@/types/Monster";
import { generateFirstStage } from "@/core/stages/CaveStage";
import { GameAction, GameActionType, GameState, GameStatus, initialState } from "@/reducers/GameState";
import { NewStageParams, Stage } from "@/types/Stage";
import { Item } from "@/types/Item";
import { triggerItemEffects } from "@/utils/itemUtils";

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
    };

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

// Handle buying an item
const handleBuyItem = (state: GameState, item: Item) => {

    const newState: GameState = triggerItemEffects(item, state);

    return {
        ...newState,
        gold: newState.gold - item.baseCost
    };
};

// Generate next monster
const generateNextMonster = (state: GameState) => {
    const scoreIncrease: number = state.currentMonster?.isDefeated? state.currentMonster.score: 0;
    const newScore: number = state.score + scoreIncrease;
    const newStageScore: number = state.currentStage!.accumulatedScore + scoreIncrease;
    const newGold: number = state.gold + scoreIncrease;

    // Check stage clear condition
    if (
        state.newestEncounter!.quantity >= state.currentStage!.clearCondition.finalMonsterCount &&
        newStageScore >= state.currentStage!.clearCondition.scoreRequirement
    ) {
        return {
            ...state,
            status: GameStatus.STAGE_CLEAR,
            currentStage: {
                ...state.currentStage,
                endTimestamp: new Date().getTime(),
            },
            playerInputs: [],
            correctInputs: 0,
            gold: newGold + state.currentStage!.goldReward,
            score: newScore + state.currentStage!.goldReward
        } as GameState;
    };

    // Check level-up condition
    const canLevelUp: boolean = (
        (newStageScore >= (state.currentStage!.levelRequirements.get(state.currentLevel!) ?? Infinity)) &&
        (state.newestEncounter!.quantity >= MIN_ENCOUNTERS_BEFORE_NEW_MONSTER)
    );
    const newLevel: number = state.currentLevel! + (canLevelUp? 1: 0);
    const nextMonsterType: Monster = getRandomMonsterFromStage(newLevel, state.currentStage!);
    const nextMonster: Monster = generateUniqueMonsterInputs(nextMonsterType, state.currentMonster!);
    const modifiedMonsterList: Monster[] = handleUpdateMonsterList(nextMonster, state.monsterList);

    return {
        ...state,
        playerInputs: [],
        correctInputs: 0,
        score: newScore,
        gold: newGold,
        currentLevel: newLevel,
        currentMonster: {...nextMonster},
        newestEncounter: {
            ...(state.newestEncounter!),
            monster: state.currentStage!.monsterList[newLevel - 1], 
            quantity: canLevelUp? 0: state.newestEncounter!.quantity
        },
        currentStage: {
            ...state.currentStage,
            accumulatedScore: newStageScore
        },
        monsterList: [...modifiedMonsterList]
    } as GameState;
};

// Handle starting a new stage
const handleStageStart = (state: GameState, newStageParams: NewStageParams) => {

    const newHealth: number = state.currentHealth + (newStageParams.rewards.health ?? 0);
    const newScore: number = state.score + (newStageParams.rewards.gold ?? 0);
    const newStage: Stage = state.currentStage!.generateNextStage(newStageParams.monsterList, state.monsterList);
    const initialLevel: number = newStageParams.monsterList.length;

    const firstMonster: Monster = {...getRandomMonsterFromStage(initialLevel, newStage)};
    const firstEncounter: Encounter = {
        monster: {...firstMonster},
        quantity: 0
    };

    return {
        ...state,
        status: GameStatus.START_NEW_STAGE,
        currentHealth: Math.min(state.maxHealth, newHealth),
        score: newScore,
        currentStage: newStage,
        currentLevel: initialLevel,
        currentMonster: {...firstMonster},
        newestEncounter: firstEncounter
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

        case GameActionType.BUY_ITEM:
            return handleBuyItem(state, action.payload as Item);

        // Start new stage
        case GameActionType.START_NEW_STAGE:
            return handleStageStart(state, action.payload as NewStageParams);

        // Close monster info panel - new monster encounter
        case GameActionType.CLOSE_INFO_PANEL:
            return handleCloseMonsterInfoPanel(state);

        default:
            return state;
    }
}