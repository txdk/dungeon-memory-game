import { getRandomArrayIndex } from "../utils/RandomiserUtils";
import { Monster, monsterList } from "./Monsters";

// Return a random monster
export const getRandomMonster = (level: number) => {
    const availableMonsters: Array<Monster> = monsterList.slice(0, level);
    const randomIndex: number = getRandomArrayIndex(availableMonsters);
    return availableMonsters[randomIndex];
}