import { v4 as uuidv4} from 'uuid';
import { Monster } from './monsters/Monsters';
import { FIRST_STAGE_FINAL_MONSTER_ID } from '../constants/GameConstants';
import { getRandomArrayElement } from '../utils/RandomiserUtils';

// Constants specifying the requirements for a player to complete a stage
export interface StageClearCondition {
    scoreRequirement: number;
    finalMonsterCount: number;
}

export interface Rewards {
    health?: number;
    score?: number;
};

export interface NewStageParams {
    monsterList: Monster[];
    rewards: Rewards;
};

export interface Stage {
    id: string;
    name: string;
    monsterList: Monster[];
    scoreReward: number;
    clearCondition: StageClearCondition;
    generatePathOptions: () => {monsterList: Monster[], rewards: Rewards}[];
}

export const generateFirstStage = (allMonsters: Monster[]) => {

    const monsterList: Monster[] = allMonsters.slice(0, FIRST_STAGE_FINAL_MONSTER_ID + 1);

    const clearCondition: StageClearCondition = {
        scoreRequirement: 500,
        finalMonsterCount: 3
    };

    const generatePathOptions = () => {
        return ([
            {
                monsterList: monsterList.slice(0, 2),
                rewards: {
                    health: 0,
                    score: 0
                }
            },
            {
                monsterList: [getRandomArrayElement(monsterList.slice(1, 3)), getRandomArrayElement(monsterList.slice(3, 5))],
                rewards: {
                    health: 1,
                    score: 50
                }
            },
            {
                monsterList: monsterList.slice(3, 5),
                rewards: {
                    health: 2,
                    score: 200
                }
            }
        ]);
    };

    return {
        id: uuidv4(),
        name: "The Caves",
        monsterList: monsterList,
        scoreReward: 300,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions
    } as Stage;
};

export const generateSecondStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    const monsterList = [...selectedMonsters, ...allMonsters.slice(FIRST_STAGE_FINAL_MONSTER_ID + 1)]

    const clearCondition: StageClearCondition = {
        scoreRequirement: 2000,
        finalMonsterCount: 3
    };

    return {
        id: uuidv4(),
        name: "The Catacombs",
        monsterList: monsterList,
        scoreReward: 1000,
        clearCondition: clearCondition,
        // TODO: add generatePathOptions
    } as Stage;
}