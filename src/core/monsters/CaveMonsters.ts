import { GameInput } from "../../constants/GameConstants";
import { getRandomCombatInput, getRandomDirection, getRandomNonCombatInput, randomiseArrayOrder } from "../../utils/randomUtils";
import { Monster } from "./Monster";
import { v4 as uuidv4} from 'uuid';

// Tier 1 monsters
export const generateTier1Monsters = () => {
    const tier1MonsterNames: string[] = randomiseArrayOrder(["bat", "goblin", "skeleton"]) as string[];
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
    const tier2MonsterNames: string[] = randomiseArrayOrder(["orc", "dire wolf", "cave troll", "fire fox"]) as string[];

    const fourthMonster: Monster = {
        id: 3,
        instanceId: uuidv4(),
        name: tier2MonsterNames[0],
        description: "A cunning creature with moderate combat prowess. Can catch the unwary adventurer off-guard.",
        defeatSequence: randomiseArrayOrder(
            [GameInput.INPUT_ATTACK, getRandomNonCombatInput(), getRandomNonCombatInput()]
        ) as GameInput[],
        score: 20,
        isDefeated: false
    };

    const fifthMonsterMovements: GameInput[] = [getRandomDirection(), getRandomDirection()];
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
};