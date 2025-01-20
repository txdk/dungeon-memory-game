import { GameInput } from "../constants/GameConstants"
import { getRandomCombatInput, getRandomDirection, randomiseArrayOrder } from "../utils/RandomiserUtils";
import { v4 as uuidv4} from 'uuid';

export interface Monster {
    id: number;
    instanceId: string;
    name: string;
    description: string;
    defeatSequence: Array<GameInput>;
    score: number;
    isDefeated: boolean;
}

// Level 1 monsters
const level1MonsterNames: Array<string> = randomiseArrayOrder(["bat", "goblin", "skeleton"]) as Array<string>;

export const firstMonster: Monster = {
    id: 0,
    instanceId: uuidv4(),
    name: level1MonsterNames[0],
    description: "A pathetic creature that requires only a single attack to slay.",
    defeatSequence: [GameInput.INPUT_ATTACK],
    score: 5,
    isDefeated: false,
}

export const secondMonster: Monster = {
    id: 1,
    instanceId: uuidv4(),
    name: level1MonsterNames[1],
    description: "Weak but nimble. Slay it easily after dodging its initial attack!",
    defeatSequence: [getRandomDirection(), GameInput.INPUT_ATTACK],
    score: 10,
    isDefeated: false
}

export const thirdMonster: Monster = {
    id: 2,
    instanceId: uuidv4(),
    name: level1MonsterNames[2],
    description: "Possesses a highly crude combat technique that is easily predictable and readily countered.",
    defeatSequence: [getRandomCombatInput(), getRandomCombatInput()],
    score: 10,
    isDefeated: false
}

// List of all monsters
export const monsterList: Array<Monster> = [
    firstMonster,
    secondMonster,
    thirdMonster
];