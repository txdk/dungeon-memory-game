import { getRandomArrayElement } from "../../utils/RandomiserUtils";
import { generateBigMonster, generateMiniboss, generateMinotaur, generateNecromancer, generateStage2BasicMonsters, generateTier1Monsters, generateTier2Monsters, Monster } from "./Monsters";
import { v4 as uuidv4} from 'uuid';
import { Stage } from "../Stages";

// Find monster by name
export const findMonsterByName = (name: string, monsterList: Monster[]) => {
    return monsterList.find((monster: Monster) => monster.name === name)!;
};

// Determine whether monster article is "a" or "an"
export const getMonsterArticle = (name: string) => {
    const startsWithVowel: boolean = ['a', 'e', 'i', 'o', 'u'].includes(name[0]);
    return startsWithVowel? "an" : "a";
};

// Return a random monster
export const getRandomMonster = (level: number, monsterList: Array<Monster>) => {
    const availableMonsters: Array<Monster> = monsterList.slice(0, level);
    const randomMonster: Monster = getRandomArrayElement(availableMonsters);
    return {
        ...randomMonster,
        instanceId: uuidv4()
    };
};

// Return a random monster from the current stage
export const getRandomMonsterFromStage = (level: number, stage: Stage) => {
    const availableMonsters: Monster[] = stage.monsterList.slice(0, level);
    const randomMonster: Monster = getRandomArrayElement(availableMonsters);
    return {
        ...randomMonster,
        instanceId: uuidv4()
    };
};

// Generate monster list
export const generateMonsterList = () => {
    const tier1Monsters: Array<Monster> = generateTier1Monsters();

    return [
        ...tier1Monsters,
        ...generateTier2Monsters(),
        ...generateStage2BasicMonsters(),
        generateBigMonster(),
        generateNecromancer(tier1Monsters),
        generateMinotaur(),
        generateMiniboss()
    ];
};
