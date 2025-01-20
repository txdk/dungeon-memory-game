import { getRandomArrayIndex } from "../utils/RandomiserUtils";
import { Monster, monsterList } from "./Monsters";
import { v4 as uuidv4} from 'uuid';

// Return a random monster
export const getRandomMonster = (level: number) => {
    const availableMonsters: Array<Monster> = monsterList.slice(0, level);
    const randomIndex: number = getRandomArrayIndex(availableMonsters);
    const randomMonster: Monster = availableMonsters[randomIndex];
    return {
        ...randomMonster,
        instanceId: uuidv4()
    };
}