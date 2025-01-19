// Maximum health of player
export const MAX_HEALTH: number = 5; 

// Possible control inputs from player
export enum GameInput {
    INPUT_LEFT,
    INPUT_UP,
    INPUT_RIGHT,
    INPUT_ATTACK,
    INPUT_SHIELD
}

// Score requirement to level up
const LEVEL_REQUIREMENTS: Map<number, number> = new Map();
LEVEL_REQUIREMENTS.set(1, 10);
LEVEL_REQUIREMENTS.set(2, 30);
LEVEL_REQUIREMENTS.set(3, 60);

export { LEVEL_REQUIREMENTS };