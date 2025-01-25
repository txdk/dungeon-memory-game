import { GameInput } from "../../constants/GameConstants"
import { getRandomArrayElement, getRandomCombatInput, getRandomDirection, getRandomInput, getRandomNonCombatInput, randomiseArrayOrder } from "../../utils/RandomiserUtils";
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

export interface Encounter {
    monster: Monster;
    quantity: number;
};

// Tier 1 monsters
export const generateTier1Monsters = () => {
    const tier1MonsterNames: Array<string> = randomiseArrayOrder(["bat", "goblin", "skeleton"]) as Array<string>;
    const firstMonster: Monster = {
        id: 0,
        instanceId: uuidv4(),
        name: tier1MonsterNames[0],
        description: "A pathetic creature that requires only a single attack to slay.",
        defeatSequence: [GameInput.INPUT_ATTACK],
        score: 5,
        isDefeated: false,
    };
    
    const secondMonster: Monster = {
        id: 1,
        instanceId: uuidv4(),
        name: tier1MonsterNames[1],
        description: "Weak but nimble. Slay it easily after dodging its initial attack!",
        defeatSequence: [getRandomDirection(), GameInput.INPUT_ATTACK],
        score: 10,
        isDefeated: false
    };
    
    const thirdMonster: Monster = {
        id: 2,
        instanceId: uuidv4(),
        name: tier1MonsterNames[2],
        description: "Possesses a highly crude combat technique that is easily predictable and readily countered.",
        defeatSequence: [getRandomCombatInput(), getRandomCombatInput()],
        score: 10,
        isDefeated: false
    };

    return [firstMonster, secondMonster, thirdMonster];
};

// Tier 2 monsters
export const generateTier2Monsters = () => {
    const tier2MonsterNames: Array<string> = randomiseArrayOrder(["orc", "dire wolf", "cave troll", "fire fox"]) as Array<string>;

    const fourthMonster: Monster = {
        id: 3,
        instanceId: uuidv4(),
        name: tier2MonsterNames[0],
        description: "A cunning creature with moderate combat prowess. Can catch the unwary adventurer off-guard.",
        defeatSequence: randomiseArrayOrder(
            [GameInput.INPUT_ATTACK, getRandomNonCombatInput(), getRandomNonCombatInput()]
        ) as Array<GameInput>,
        score: 20,
        isDefeated: false
    };

    const fifthMonsterMovements: Array<GameInput> = [getRandomDirection(), getRandomDirection()];
    const fifthMonster: Monster = {
        id: 4,
        instanceId: uuidv4(),
        name: tier2MonsterNames[1],
        description: "Study this vicious monster's attack habits closely and exploit its somewhat predictable movements!",
        defeatSequence: [
            ...(new Array(2).fill(fifthMonsterMovements[0])),
            GameInput.INPUT_ATTACK, 
            ...(new Array(2).fill(fifthMonsterMovements[1]))
        ],
        score: 20,
        isDefeated: false
    };

    const sixthMonster: Monster = {
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

    return [fourthMonster, fifthMonster, sixthMonster];
}

export const generateStage2BasicMonsters = () => {

    const monsterNames: string[] = randomiseArrayOrder(["wraith", "spectre", "plaguebearer", "darkhound"]) as string[];

    const semicircleInputs: GameInput[] = [GameInput.INPUT_LEFT, GameInput.INPUT_UP, GameInput.INPUT_RIGHT];
    const swarmMovementInputs: GameInput[] = Math.random() < 0.5? semicircleInputs: [...semicircleInputs].reverse();

    return [
        {
            id: 6,
            instanceId: uuidv4(),
            name: monsterNames[0],
            description: "Sometimes it is better to evade than to engage...",
            defeatSequence: randomiseArrayOrder(
                [getRandomDirection(), getRandomNonCombatInput(), getRandomNonCombatInput()]
            ) as Array<GameInput>,
            score: 25,
            isDefeated: false
        } as Monster,
        {
            id: 7,
            instanceId: uuidv4(),
            name: "carrion swarm",
            description: "Overwhelming in numbers and hungry for flesh. Use large sweeping attacks to keep the swarm at bay!",
            defeatSequence: [...swarmMovementInputs, GameInput.INPUT_ATTACK],
            score: 25,
            isDefeated: false
        } as Monster,
        {
            id: 8,
            instanceId: uuidv4(),
            name: monsterNames[1],
            description: "The insidious aura of undeath surrounds this creature. Deadly and unpredictable.",
            defeatSequence: randomiseArrayOrder(
                [getRandomInput(), getRandomNonCombatInput(), getRandomNonCombatInput(), getRandomCombatInput()]
            ) as Array<GameInput>,
            score: 50,
            isDefeated: false
        } as Monster
    ];
};

export const generateBigMonster = () => {
    const ogreInputs: Array<GameInput> = randomiseArrayOrder(
        [GameInput.INPUT_ATTACK, getRandomInput(), getRandomInput()]
    ) as Array<GameInput>;
    return {
        id: 9,
        instanceId: uuidv4(),
        name: "ogre",
        description: "A towering brute that will take repeated and concentrated effort to defeat.",
        defeatSequence: [
            ...(new Array(3).fill(ogreInputs[0])),
            ...(new Array(4).fill(ogreInputs[1])),
            ...(new Array(4).fill(ogreInputs[2])),
        ],
        score: 50,
        isDefeated: false
    } as Monster;
};

export const generateNecromancer = (tier1Monsters: Array<Monster>) => {
    const skeletonDefeatSequence: Array<GameInput> = tier1Monsters.find(
        (monster) => monster.name === "skeleton"
    )!.defeatSequence;
    
    return {
        id: 10,
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
        score: 100,
        isDefeated: false
    } as Monster;
};

export const generateMinotaur = () => {
    const mazeInputs: Array<GameInput> = [
        getRandomDirection(), 
        getRandomDirection(),
        getRandomDirection(),
        getRandomDirection(),
        getRandomDirection()
    ];
    const reversedMazeInputs: Array<GameInput> = mazeInputs.slice().reverse();
    
    return {
        id: 11,
        instanceId: uuidv4(),
        name: "minotaur",
        description: "A mighty foe awaits you at the centre of a dark maze. Don't lose your bearings!",
        defeatSequence: [
            ...mazeInputs,
            GameInput.INPUT_SHIELD,
            GameInput.INPUT_ATTACK,
            GameInput.INPUT_ATTACK,
            ...reversedMazeInputs
        ],
        score: 200,
        isDefeated: false
    } as Monster;
}

export const generateMiniboss = () => {
    const minibossNames: Array<string> = ["vampire", "mind flayer", "death knight"];
    const minibossName: string = getRandomArrayElement(minibossNames);

    return {
        id: 12,
        instanceId: uuidv4(),
        name: minibossName,
        description: "An ancient deadly foe with no easily exploitable weaknesses. Use all of your cunning to best it in combat!",
        defeatSequence: randomiseArrayOrder([
            getRandomInput(),
            GameInput.INPUT_LEFT,
            GameInput.INPUT_UP,
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_SHIELD, 
            GameInput.INPUT_ATTACK
        ]) as Array<GameInput>,
        score: 400,
        isDefeated: false
    } as Monster;
}