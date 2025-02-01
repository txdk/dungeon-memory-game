import { THIRD_STAGE_LEVEL_REQUIREMENTS, UNDERCITY_FINAL_MONSTER_ID, UNDERCITY_FIRST_MONSTER_ID } from '@/constants/GameConstants';
import { Monster } from '@/types/Monster';
import { NewStageParams, Stage, StageClearCondition } from '@/types/Stage';
import { getRandomArrayElement, getRandomArraySample } from '@/utils/randomUtils';
import { v4 as uuidv4} from 'uuid';
import { generateCitadelStage } from './CitadelStage';

export const generateThirdStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: 3500,
        finalMonsterCount: 3
    };

    const monsterList: Monster[] = [
        ...selectedMonsters, 
        ...allMonsters.slice(UNDERCITY_FIRST_MONSTER_ID, UNDERCITY_FINAL_MONSTER_ID + 1)
    ];

    const generatePathOptions = () => {
        return [
            {
                monsterList: [...getRandomArraySample(monsterList.slice(0,5), 2)],
                rewards: {
                    gold: 0,
                    health: 0
                }
            },
            {
                monsterList: [getRandomArrayElement(monsterList.slice(2,5)), getRandomArrayElement(monsterList.slice(5,7))],
                rewards: {
                    gold: 500,
                    health: 1
                }
            },
            {
                monsterList: [...monsterList.slice(5)],
                rewards: {
                    gold: 750,
                    health: 2
                }
            }
        ] as NewStageParams[];
    };

    return {
        id: uuidv4(),
        name: "The Undercity",
        number: 3,
        monsterList: monsterList,
        startTimestamp: new Date().getTime(),
        endTimestamp: Infinity,
        accumulatedScore: 0,
        goldReward: 750,
        levelRequirements: THIRD_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions,
        generateNextStage: generateCitadelStage
    } as Stage;
};