import { GameInput } from "@/constants/GameConstants";
import { getRandomArrayElement, getRandomCombatInput, getRandomDirection, getRandomInput, getRandomNonCombatInput, randomiseArrayOrder } from "@/utils/randomUtils";
import { Monster } from "@/types/Monster";
import { v4 as uuidv4} from 'uuid';

export const generateStage2BasicMonsters = (tier1Monsters: Monster[]) => {

    const monsterNames: string[] = randomiseArrayOrder(["wraith", "spectre", "plaguebearer", "darkhound"]) as string[];

    const semicircleInputs: GameInput[] = [GameInput.INPUT_LEFT, GameInput.INPUT_UP, GameInput.INPUT_RIGHT];
    const swarmMovementInputs: GameInput[] = Math.random() < 0.5? semicircleInputs: [...semicircleInputs].reverse();
    const carrionSwarm: Monster = {
        id: 6,
        instanceId: uuidv4(),
        name: "carrion swarm",
        description: "Overwhelming in numbers and hungry for flesh. Use large sweeping attacks to keep the swarm at bay!",
        defeatSequence: [...swarmMovementInputs, GameInput.INPUT_ATTACK],
        score: 25,
        isDefeated: false
    };
    const easyMonster: Monster = {
        id: 6,
        instanceId: uuidv4(),
        name: monsterNames[0],
        description: "Sometimes it is better to evade than to engage...",
        defeatSequence: randomiseArrayOrder(
            [getRandomDirection(), getRandomNonCombatInput(), getRandomNonCombatInput()]
        ) as Array<GameInput>,
        score: 25,
        isDefeated: false
    };
    const firstMonster: Monster = getRandomArrayElement([carrionSwarm, easyMonster]);

    return [
        {...firstMonster},
        {
            id: 7,
            instanceId: uuidv4(),
            name: "wretched zombie",
            description: "Risen from the remains of the foes you bested earlier in the caves...",
            defeatSequence: [
                ...(tier1Monsters[1].defeatSequence),
                ...(tier1Monsters[2].defeatSequence)
            ],
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

export const generateBigMonster = (tier2Monsters: Monster[]) => {
    // Create ogre
    const ogreInputs: Array<GameInput> = randomiseArrayOrder(
        [GameInput.INPUT_ATTACK, getRandomInput(), getRandomInput()]
    ) as Array<GameInput>;
    const ogre: Monster = {
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
    };

    // Create stitched monstrosity
    const monstrosity: Monster = {
        id: 9,
        instanceId: uuidv4(),
        name: "stitched monstrosity",
        description: "A macabre undead creation, sewn together from the most vicious creatures you have encountered thus far.",
        defeatSequence: [
            ...(tier2Monsters[0].defeatSequence),
            ...(tier2Monsters[1].defeatSequence)
        ],
        score: 50,
        isDefeated: false
    }

    return Math.random() < 0.5? ogre: monstrosity;
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