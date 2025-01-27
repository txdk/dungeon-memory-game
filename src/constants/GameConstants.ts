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
export const FIRST_STAGE_FINAL_MONSTER_ID: number = 4;

// ID of first monster in Stage 2 - Catacombs
export const CATACOMBS_FIRST_MONSTER_ID: number = 6;

// ID of final basic monster in Stage 2 - Catacombs
export const CATACOMBS_FINAL_MONSTER_ID: number = 8;

// Score requirement to level up
const FIRST_STAGE_LEVEL_REQUIREMENTS: Map<number, number> = new Map();
FIRST_STAGE_LEVEL_REQUIREMENTS.set(1, 10);
FIRST_STAGE_LEVEL_REQUIREMENTS.set(2, 50);
FIRST_STAGE_LEVEL_REQUIREMENTS.set(3, 100);
FIRST_STAGE_LEVEL_REQUIREMENTS.set(4, 200);

const SECOND_STAGE_LEVEL_REQUIREMENTS: Map<number, number> = new Map();
SECOND_STAGE_LEVEL_REQUIREMENTS.set(1, 0);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(2, 50);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(3, 275);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(4, 400);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(5, 550);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(6, 800);

const THIRD_STAGE_LEVEL_REQUIREMENTS: Map<number, number> = new Map();
THIRD_STAGE_LEVEL_REQUIREMENTS.set(1, 0);
THIRD_STAGE_LEVEL_REQUIREMENTS.set(2, 300);
THIRD_STAGE_LEVEL_REQUIREMENTS.set(3, 700);

export { FIRST_STAGE_LEVEL_REQUIREMENTS, SECOND_STAGE_LEVEL_REQUIREMENTS, THIRD_STAGE_LEVEL_REQUIREMENTS };