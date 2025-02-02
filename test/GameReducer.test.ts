import { beforeEach, expect, test } from "vitest";
import { initialState, GameState, GameAction, GameActionType } from "@/reducers/GameState";
import { GameInput } from "@/constants/GameConstants";
import gameReducer from "@/reducers/GameReducer";

let gameState: GameState;

beforeEach(() => {
    gameState = initialState;
});

test('start new game', () => {
    const startGameAction: GameAction = {
        type: GameActionType.START_GAME,
        payload: null
    };
    gameState = gameReducer(gameState, startGameAction);
    expect(gameState.currentStage.name).toBe("The Caves");
    expect(gameState.currentStage.number).toBe(1);
    expect(gameState.currentLevel).toBe(1);
    expect(gameState.currentMonster.defeatSequence).toEqual([GameInput.INPUT_ATTACK]);
    expect(gameState.currentStage.monsterList.length).toBe(5);
});