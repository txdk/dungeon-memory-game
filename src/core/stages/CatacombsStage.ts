import { v4 as uuidv4} from 'uuid';
import { Monster } from "@/types/Monster";
import { findMonsterByName } from "@/utils/monsterGenerationUtils";
import { CATACOMBS_FINAL_MONSTER_ID, CATACOMBS_FIRST_MONSTER_ID, SECOND_STAGE_LEVEL_REQUIREMENTS } from "@/constants/GameConstants";
import { NewStageParams, Stage, StageClearCondition } from "@/types/Stage";
import { getRandomArrayElement, getRandomArraySample } from "@/utils/randomUtils";
import { generateThirdStage } from '@/core/stages/UndercityStage';

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
                    gold: 0,
                    health: 0
                }
            },
            {
                monsterList: [getRandomArrayElement(monsterList.slice(2,5)), getRandomArrayElement(monsterList.slice(5,7))],
                rewards: {
                    gold: 250,
                    health: 1
                }
            },
            {
                monsterList: [{...fleshGolem}, {...necromancer}],
                rewards: {
                    gold: 500,
                    health: 2
                }
            }
        ] as NewStageParams[];
    };

    return {
        id: uuidv4(),
        name: "The Catacombs",
        monsterList: monsterList,
        startTimestamp: new Date().getTime(),
        endTimestamp: Infinity,
        accumulatedScore: 0,
        goldReward: 1000,
        levelRequirements: SECOND_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions,
        generateNextStage: generateThirdStage
    } as Stage;
};
