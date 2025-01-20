import { getRandomArrayIndex } from "../utils/RandomiserUtils";
import { generateMiniboss, generateMinotaur, generateNecromancer, generateOgre, generateTier1Monsters, generateTier2Monsters, Monster } from "./Monsters";
import { v4 as uuidv4} from 'uuid';

// Determine whether monster article is "a" or "an"
export const getMonsterArticle = (name: string) => {
    const startsWithVowel: boolean = ['a', 'e', 'i', 'o', 'u'].includes(name[0]);
    return startsWithVowel? "an" : "a";
}

// Return a random monster
export const getRandomMonster = (level: number, monsterList: Array<Monster>) => {
    const availableMonsters: Array<Monster> = monsterList.slice(0, level);
    const randomIndex: number = getRandomArrayIndex(availableMonsters);
    const randomMonster: Monster = availableMonsters[randomIndex];
    return {
        ...randomMonster,
        instanceId: uuidv4()
    };
}

// Generate monster list
export const generateMonsterList = () => {
    const tier1Monsters: Array<Monster> = generateTier1Monsters();

    return [
        ...tier1Monsters,
        ...generateTier2Monsters(),
        generateNecromancer(tier1Monsters),
        generateOgre(),
        generateMinotaur(),
        generateMiniboss()
    ];
}
