import { GameState, GameStatus, initialState, GameActionType } from "@/reducers/GameState";
import { GameInput } from "@/constants/GameConstants";
import { Monster, Encounter } from "@/types/Monster";
import { Stage } from "@/types/Stage";
import { generateMonsterList } from "@/utils/monsterGenerationUtils";
import { generateSecondStage } from "@/core/stages/CatacombsStage";
import { debuffMonsterNames } from "@/core/monsters/CatacombsMonsters";
import gameReducer from "@/reducers/GameReducer";
import { beforeEach, expect, test } from 'vitest';

let gameState: GameState;
const generateNextMonster: GameState = (gameState: GameState) => gameReducer(gameState, {
    type: GameActionType.GENERATE_NEXT_MONSTER,
    payload: null
});

beforeEach(() => {
    const monsterList: Monster[] = generateMonsterList();
    const stage: Stage = generateSecondStage([], monsterList);

    gameState = {
        ...initialState,
        status: GameStatus.IN_PROGRESS,
        monsterList: monsterList,
        currentLevel: 1,
        currentStage: stage,
        newestEncounter: null
    };
});

test('debuff monster swaps attack and defend inputs of next monster', () => {
     // Initialise test
     const inputs: GameInput[] = [GameInput.INPUT_ATTACK, GameInput.INPUT_SHIELD, GameInput.INPUT_LEFT];
     const basicMonster: Monster = {
        ...gameState.monsterList[1],
        defeatSequence: [...inputs]
     };
     const debuffMonster: Monster = gameState.monsterList.find((monster) => debuffMonsterNames.includes(monster.name));
     const encounter: Encounter = {
         monster: debuffMonster,
         quantity: 1
     };
 
     gameState = {
         ...gameState,
         currentStage: {
             ...gameState.currentStage,
             monsterList: [basicMonster]
         },
         currentMonster: {...debuffMonster},
         newestEncounter: encounter
     };

     // Generate next monster and check combat inputs are swapped
    gameState = generateNextMonster(gameState);
    expect(
        gameState.currentMonster.defeatSequence
    ).toEqual(
        [GameInput.INPUT_SHIELD, GameInput.INPUT_ATTACK, GameInput.INPUT_LEFT]
    );

    // Generate next monster and check inputs are back to normal
    gameState = generateNextMonster(gameState);
    expect(
        gameState.currentMonster.defeatSequence
    ).toEqual(
        [...inputs]
    );
});