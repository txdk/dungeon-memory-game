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
SECOND_STAGE_LEVEL_REQUIREMENTS.set(1, 700);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(2, 850);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(3, 925);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(4, 1050);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(5, 1350);
SECOND_STAGE_LEVEL_REQUIREMENTS.set(6, 1600);

const THIRD_STAGE_LEVEL_REQUIREMENTS: Map<number, number> = new Map();
THIRD_STAGE_LEVEL_REQUIREMENTS.set(1, 3500);
THIRD_STAGE_LEVEL_REQUIREMENTS.set(2, 4000);
THIRD_STAGE_LEVEL_REQUIREMENTS.set(3, 5000);

export { FIRST_STAGE_LEVEL_REQUIREMENTS, SECOND_STAGE_LEVEL_REQUIREMENTS, THIRD_STAGE_LEVEL_REQUIREMENTS };