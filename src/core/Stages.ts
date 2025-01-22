import { v4 as uuidv4} from 'uuid';
import { Monster } from './Monsters';
import { FIRST_STAGE_FINAL_MONSTER_ID } from '../constants/GameConstants';

export interface Stage {
    id: string;
    name: string;
    monsterList: Monster[];
}

export const generateFirstStage = (allMonsters: Monster[]) => {
    return {
        id: uuidv4(),
        name: "The Caves",
        monsterList: allMonsters.slice(0, FIRST_STAGE_FINAL_MONSTER_ID)
    } as Stage;
};