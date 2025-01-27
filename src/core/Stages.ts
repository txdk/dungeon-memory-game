import { v4 as uuidv4} from 'uuid';
import { Monster } from './monsters/Monster';
import { CATACOMBS_FINAL_MONSTER_ID, CATACOMBS_FIRST_MONSTER_ID, FIRST_STAGE_FINAL_MONSTER_ID, FIRST_STAGE_LEVEL_REQUIREMENTS, SECOND_STAGE_LEVEL_REQUIREMENTS, THIRD_STAGE_LEVEL_REQUIREMENTS } from '../constants/GameConstants';
import { getRandomArrayElement, getRandomArraySample } from '../utils/randomUtils';
import { findMonsterByName } from './monsters/MonsterGenerator';

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
    accumulatedScore: number;
    scoreReward: number;
    levelRequirements: Map<number, number>;
    clearCondition: StageClearCondition;
    generatePathOptions: () => NewStageParams[];
    generateNextStage: (selectedMonsters: Monster[], allMonsters: Monster[]) => Stage;
};

export const generateFirstStage = (allMonsters: Monster[]) => {

    const monsterList: Monster[] = allMonsters.slice(0, FIRST_STAGE_FINAL_MONSTER_ID + 1);

    const clearCondition: StageClearCondition = {
        scoreRequirement: 400,
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
        accumulatedScore: 0,
        scoreReward: 250,
        levelRequirements: FIRST_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions,
        generateNextStage: generateSecondStage
    } as Stage;
};

export const generateSecondStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    // Add monsters to list
    const fleshGolem: Monster = {
        ...(findMonsterByName("ogre", allMonsters)),
        name: "flesh golem"
    };
    const necromancer: Monster = {...findMonsterByName("necromancer", allMonsters)};
    const monsterList: Monster[] = [
        ...selectedMonsters,
        ...allMonsters.slice(CATACOMBS_FIRST_MONSTER_ID, CATACOMBS_FINAL_MONSTER_ID + 1),
        fleshGolem,
        necromancer
    ];

    const clearCondition: StageClearCondition = {
        scoreRequirement: 1200,
        finalMonsterCount: 3
    };

    const generatePathOptions = () => {
        return [
            {
                monsterList: [...getRandomArraySample(monsterList.slice(0,5), 2)],
                rewards: {
                    score: 0,
                    health: 0
                }
            },
            {
                monsterList: [getRandomArrayElement(monsterList.slice(2,5)), getRandomArrayElement(monsterList.slice(5,7))],
                rewards: {
                    score: 250,
                    health: 1
                }
            },
            {
                monsterList: [{...fleshGolem}, {...necromancer}],
                rewards: {
                    score: 500,
                    health: 2
                }
            }
        ] as NewStageParams[];
    };

    return {
        id: uuidv4(),
        name: "The Catacombs",
        monsterList: monsterList,
        accumulatedScore: 0,
        scoreReward: 1000,
        levelRequirements: SECOND_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions,
        generateNextStage: generateThirdStage
    } as Stage;
};

export const generateThirdStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: Infinity,
        finalMonsterCount: 3
    };

    return {
        id: uuidv4(),
        name: "The Undercity",
        monsterList: [...selectedMonsters, ...allMonsters.slice(11)],
        accumulatedScore: 0,
        scoreReward: 3000,
        levelRequirements: THIRD_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: () => [] as NewStageParams[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        generateNextStage: (_selectedMonsters: Monster[], _allMonsters: Monster[]) => {}
    } as Stage;
};