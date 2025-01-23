import { v4 as uuidv4} from 'uuid';
import { Monster } from './Monsters';
import { FIRST_STAGE_FINAL_MONSTER_ID } from '../constants/GameConstants';

// Constants specifying the requirements for a player to complete a stage
export interface StageClearCondition {
    scoreRequirement: number;
    finalMonsterCount: number;
}

export interface Stage {
    id: string;
    name: string;
    monsterList: Monster[];
    scoreReward: number;
    clearCondition: StageClearCondition;
}

export const generateFirstStage = (allMonsters: Monster[]) => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: 500,
        finalMonsterCount: 3
    };

    return {
        id: uuidv4(),
        name: "The Caves",
        monsterList: allMonsters.slice(0, FIRST_STAGE_FINAL_MONSTER_ID + 1),
        scoreReward: 300,
        clearCondition: clearCondition
    } as Stage;
};

export const generateSecondStage = (allMonsters: Monster[]) => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: 2000,
        finalMonsterCount: 3
    };

    return {
        id: uuidv4(),
        name: "The Catacombs",
        monsterList: allMonsters.slice(FIRST_STAGE_FINAL_MONSTER_ID + 1),
        scoreReward: 1000,
        clearCondition: clearCondition
    } as Stage;
}