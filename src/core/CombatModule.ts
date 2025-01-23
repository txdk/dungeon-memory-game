import { GameInput } from "../constants/GameConstants";
import { GameStatus } from "../reducers/GameState";
import { Monster } from "./Monsters";

// Check whether player input is correct
export const checkPlayerInput = (input: GameInput, correctInputs: number, monster: Monster) => {
    return input === monster.defeatSequence[correctInputs];
}

// Check whether the current monster has been defeated
export const checkMonsterDefeated = (correctInputs: number, monster: Monster) => {
    return correctInputs === monster.defeatSequence.length;
}

// Get the game status. Checks whether the game over condition is met
export const getGameStatus = (playerHealth: number) => {
    if (playerHealth <= 0) {
        return GameStatus.GAME_OVER
    }
    else {
        return GameStatus.IN_PROGRESS;
    }
}