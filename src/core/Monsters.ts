import { GameInput } from "../constants/GameConstants"
import { getRandomCombatInput, getRandomDirection, getRandomInput, getRandomNonCombatInput, randomiseArrayOrder } from "../utils/RandomiserUtils";
import { v4 as uuidv4} from 'uuid';

export interface Monster {
    id: number;
    instanceId: string;
    name: string;
    description: string;
    defeatSequence: Array<GameInput>;
    score: number;
    isDefeated: boolean;
};

// Tier 1 monsters
const tier1MonsterNames: Array<string> = randomiseArrayOrder(["bat", "goblin", "skeleton", "gingerbread man"]) as Array<string>;

export const firstMonster: Monster = {
    id: 0,
    instanceId: uuidv4(),
    name: tier1MonsterNames[0],
    description: "A pathetic creature that requires only a single attack to slay.",
    defeatSequence: [GameInput.INPUT_ATTACK],
    score: 5,
    isDefeated: false,
};

export const secondMonster: Monster = {
    id: 1,
    instanceId: uuidv4(),
    name: tier1MonsterNames[1],
    description: "Weak but nimble. Slay it easily after dodging its initial attack!",
    defeatSequence: [getRandomDirection(), GameInput.INPUT_ATTACK],
    score: 10,
    isDefeated: false
};

export const thirdMonster: Monster = {
    id: 2,
    instanceId: uuidv4(),
    name: tier1MonsterNames[2],
    description: "Possesses a highly crude combat technique that is easily predictable and readily countered.",
    defeatSequence: [getRandomCombatInput(), getRandomCombatInput()],
    score: 10,
    isDefeated: false
};

// Tier 2 monsters
const tier2MonsterNames: Array<string> = randomiseArrayOrder(["orc", "dire wolf", "cave troll", "fire fox"]) as Array<string>;

export const fourthMonster: Monster = {
    id: 3,
    instanceId: uuidv4(),
    name: tier2MonsterNames[0],
    description: "A cunning creature with moderate combat prowess, can catch the unwary adventurer off-guard.",
    defeatSequence: randomiseArrayOrder(
        [GameInput.INPUT_ATTACK, getRandomNonCombatInput(), getRandomNonCombatInput()]
    ) as Array<GameInput>,
    score: 20,
    isDefeated: false
};

const fifthMonsterMovements: Array<GameInput> = [getRandomDirection(), getRandomDirection()];
export const fifthMonster: Monster = {
    id: 4,
    instanceId: uuidv4(),
    name: tier2MonsterNames[1],
    description: "Study this vicious monster's attack habits closely and exploit its somewhat predictable movements!",
    defeatSequence: [
        fifthMonsterMovements[0], 
        fifthMonsterMovements[0], 
        GameInput.INPUT_ATTACK, 
        fifthMonsterMovements[1], 
        fifthMonsterMovements[1]
    ],
    score: 20,
    isDefeated: false
};

export const sixthMonster: Monster = {
    id: 5,
    instanceId: uuidv4(),
    name: tier2MonsterNames[2],
    description: "This monster is hardy and durable in a fight, and takes many strikes to take down.",
    defeatSequence: [
        GameInput.INPUT_ATTACK,
        getRandomDirection(),
        GameInput.INPUT_ATTACK,
        getRandomCombatInput(),
        GameInput.INPUT_ATTACK
    ],
    score: 20,
    isDefeated: false
};

const skeletonDefeatSequence: Array<GameInput> = [firstMonster, secondMonster, thirdMonster].find((monster) => 
    monster.name === "skeleton")!.defeatSequence;
export const seventhMonster: Monster = {
    id: 6,
    instanceId: uuidv4(),
    name: "necromancer",
    description: "Adept of the dark arts, closely guarded by his skeletal minions.",
    defeatSequence: [
        ...skeletonDefeatSequence,
        getRandomDirection(),
        ...skeletonDefeatSequence,
        getRandomDirection(),
        GameInput.INPUT_ATTACK
    ],
    score: 50,
    isDefeated: false
};

const eighthMonsterInputs: Array<GameInput> = randomiseArrayOrder(
    [GameInput.INPUT_ATTACK, getRandomInput(), getRandomInput()]
) as Array<GameInput>;
export const eighthMonster: Monster = {
    id: 7,
    instanceId: uuidv4(),
    name: "ogre",
    description: "A towering brute that will take repeated and concentrated effort to defeat.",
    defeatSequence: [
        eighthMonsterInputs[0],
        eighthMonsterInputs[0],
        eighthMonsterInputs[0],
        eighthMonsterInputs[1],
        eighthMonsterInputs[1],
        eighthMonsterInputs[1],
        eighthMonsterInputs[1],
        eighthMonsterInputs[2],
        eighthMonsterInputs[2],
        eighthMonsterInputs[2],
        eighthMonsterInputs[2]
    ],
    score: 100,
    isDefeated: false
};

const ninthMonsterInputs: Array<GameInput> = [
    getRandomDirection(), 
    getRandomDirection(),
    getRandomDirection(),
    getRandomDirection(),
    getRandomDirection()
];
const reversedNinthMonsterInputs: Array<GameInput> = ninthMonsterInputs.slice().reverse();
export const ninthMonster: Monster = {
    id: 8,
    instanceId: uuidv4(),
    name: "minotaur",
    description: "A mighty foe awaits you at the centre of a dark maze. Don't lose your bearings!",
    defeatSequence: [
        ...ninthMonsterInputs,
        GameInput.INPUT_SHIELD,
        GameInput.INPUT_ATTACK,
        GameInput.INPUT_ATTACK,
        ...reversedNinthMonsterInputs
    ],
    score: 200,
    isDefeated: false
};

export const tenthMonster: Monster = {
    id: 9,
    instanceId: uuidv4(),
    name: "vampire",
    description: "An ancient deadly foe with no easily exploitable weaknesses. Use all of your cunning to best it in combat!",
    defeatSequence: randomiseArrayOrder([
        getRandomInput(),
        getRandomInput(),
        getRandomInput(),
        getRandomInput(),
        getRandomInput(),
        GameInput.INPUT_ATTACK
    ]) as Array<GameInput>,
    score: 400,
    isDefeated: false
}

// List of all monsters
export const monsterList: Array<Monster> = [
    firstMonster,
    secondMonster,
    thirdMonster,
    fourthMonster,
    fifthMonster,
    sixthMonster,
    seventhMonster,
    eighthMonster,
    ninthMonster
];