// Maximum health of player
export const MAX_HEALTH: number = 5; 

// Possible control inputs from player
export enum GameInput {
    INPUT_LEFT,
    INPUT_UP,
    INPUT_RIGHT,
    INPUT_ATTACK,
    INPUT_SHIELD
};

// Minimum number of encounters required with the newest monster before the next one can be encountered
export const MIN_ENCOUNTERS_BEFORE_NEW_MONSTER = 2;

// ID of final monster in Stage 1
export const FIRST_STAGE_FINAL_MONSTER_ID: number = 5;

// Score requirement to level up
const LEVEL_REQUIREMENTS: Map<number, number> = new Map();
LEVEL_REQUIREMENTS.set(1, 10);
LEVEL_REQUIREMENTS.set(2, 30);
LEVEL_REQUIREMENTS.set(3, 60);
LEVEL_REQUIREMENTS.set(4, 100);
LEVEL_REQUIREMENTS.set(5, 180);
LEVEL_REQUIREMENTS.set(6, 260);
LEVEL_REQUIREMENTS.set(7, 340);
LEVEL_REQUIREMENTS.set(8, 600);
LEVEL_REQUIREMENTS.set(9, 1200);
LEVEL_REQUIREMENTS.set(10, 2400);

export { LEVEL_REQUIREMENTS };