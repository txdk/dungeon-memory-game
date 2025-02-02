import { v4 as uuidv4} from 'uuid';
import { Monster } from '@/types/Monster';
import { FIRST_STAGE_FINAL_MONSTER_ID, FIRST_STAGE_LEVEL_REQUIREMENTS } from '@/constants/GameConstants';
import { getRandomArrayElement } from '@/utils/randomUtils';
import { NewStageParams, Stage, StageClearCondition } from '@/types/Stage';
import { generateSecondStage } from '@/core/stages/CatacombsStage';

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
                    gold: 0
                }
            },
            {
                monsterList: [getRandomArrayElement(monsterList.slice(1, 3)), getRandomArrayElement(monsterList.slice(3, 5))],
                rewards: {
                    health: 1,
                    gold: 50
                }
            },
            {
                monsterList: monsterList.slice(3, 5),
                rewards: {
                    health: 2,
                    gold: 200
                }
            }
        ] as NewStageParams[]);
    };

    return {
        id: uuidv4(),
        name: "The Caves",
        number: 1,
        monsterList: monsterList,
        startTimestamp: new Date().getTime(),
        endTimestamp: Infinity,
        accumulatedScore: 0,
        goldReward: 250,
        levelRequirements: FIRST_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions,
        generateNextStage: generateSecondStage
    } as Stage;
};