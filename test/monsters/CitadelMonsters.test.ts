import { GameState, GameStatus, initialState, GameActionType } from "@/reducers/GameState";
import { GameInput } from "@/constants/GameConstants";
import { Monster, Encounter } from "@/types/Monster";
import { Stage } from "@/types/Stage";
import { generateMonsterList } from "@/utils/monsterGenerationUtils";
import { generateCitadelStage } from "@/core/stages/CitadelStage";
import gameReducer from "@/reducers/GameReducer";
import { beforeEach, expect, test } from 'vitest';

let gameState: GameState;
const generateNextMonster: GameState = (gameState: GameState) => gameReducer(gameState, {
    type: GameActionType.GENERATE_NEXT_MONSTER,
    payload: null
});

beforeEach(() => {
    const monsterList: Monster[] = generateMonsterList();
    const stage: Stage = generateCitadelStage([], monsterList);

    gameState = {
        ...initialState,
        status: GameStatus.IN_PROGRESS,
        monsterList: monsterList,
        currentLevel: 1,
        currentStage: stage,
        newestEncounter: null
    };
});

test('cabal highpriest reverses next monster inputs', () => {

    // Initialise test
    const basicMonster: Monster = gameState.monsterList[1];
    const highpriest: Monster = gameState.monsterList.find((monster) => monster.name === "cabal highpriest");
    const encounter: Encounter = {
        monster: highpriest,
        quantity: 1
    };

    gameState = {
        ...gameState,
        currentStage: {
            ...gameState.currentStage,
            monsterList: [basicMonster]
        },
        currentMonster: {...highpriest},
        newestEncounter: encounter
    };

    // Generate next monster and check inputs are reversed
    gameState = generateNextMonster(gameState);
    expect(
        gameState.currentMonster.defeatSequence
    ).toEqual(
        [...basicMonster.defeatSequence].reverse()
    );

    // Generate next monster and check inputs are not reversed
    gameState = generateNextMonster(gameState);
    expect(
        gameState.currentMonster.defeatSequence
    ).toEqual(
        [...basicMonster.defeatSequence]
    );
});

test('mechagolem inputs correctly cycle', () => {

    // Initialise test
    const mechagolem: Monster = {
        ...(gameState.monsterList.find((monster) => monster.name === "mechagolem")),
        defeatSequence: [
            GameInput.INPUT_LEFT, 
            GameInput.INPUT_UP,
            GameInput.INPUT_RIGHT
        ]
    };
    const encounter: Encounter = {
        monster: mechagolem,
        quantity: 1
    };

    gameState = {
        ...gameState,
        currentStage: {
            ...gameState.currentStage,
            monsterList: [mechagolem]
        },
        currentMonster: {...mechagolem},
        newestEncounter: encounter
    };

    // Run test
    gameState = generateNextMonster(gameState);
    expect(gameState.currentMonster.defeatSequence).toEqual(
        [
            GameInput.INPUT_UP,
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_LEFT
        ]
    );
    expect(gameState.currentStage.monsterList[0].defeatSequence).toEqual(
        [
            GameInput.INPUT_UP,
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_LEFT
        ]
    );

    gameState = generateNextMonster(gameState);
    expect(gameState.currentMonster.defeatSequence).toEqual(
        [
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_LEFT,
            GameInput.INPUT_UP,
        ]
    );
});

test('cabal highpriest reverses mechagolem inputs', () => {
    // Initialise test
    const mechagolem: Monster = {
        ...(gameState.monsterList.find((monster) => monster.name === "mechagolem")),
        defeatSequence: [
            GameInput.INPUT_LEFT, 
            GameInput.INPUT_UP,
            GameInput.INPUT_RIGHT
        ]
    };
    const highpriest: Monster = gameState.monsterList.find((monster) => monster.name === "cabal highpriest");
    const encounter: Encounter = {
        monster: highpriest,
        quantity: 1
    };

    gameState = {
        ...gameState,
        currentStage: {
            ...gameState.currentStage,
            monsterList: [mechagolem]
        },
        currentMonster: {...highpriest},
        newestEncounter: encounter
    };

    // Generate mechagolem and check that its inputs are cycled first, then reversed
    gameState = generateNextMonster(gameState);
    expect(
        gameState.currentMonster.defeatSequence
    ).toEqual(
        [
            GameInput.INPUT_LEFT,
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_UP
        ]
    );

    // Generate mechagolem and check that its inputs are cycled based on the non-reversed sequence
    gameState = generateNextMonster(gameState);
    expect(
        gameState.currentMonster.defeatSequence
    ).toEqual(
        [
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_LEFT,
            GameInput.INPUT_UP
        ]
    );
});