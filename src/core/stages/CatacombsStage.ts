import { v4 as uuidv4} from 'uuid';
import { Monster } from "@/types/Monster";
import { CATACOMBS_FINAL_MONSTER_ID, CATACOMBS_FIRST_MONSTER_ID, SECOND_STAGE_LEVEL_REQUIREMENTS } from "@/constants/GameConstants";
import { NewStageParams, Stage, StageClearCondition } from "@/types/Stage";
import { getRandomArrayElement, getRandomArraySample } from "@/utils/randomUtils";
import { generateThirdStage } from '@/core/stages/UndercityStage';
import { debuffMonsterNames } from '../monsters/CatacombsMonsters';

export const generateSecondStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    const monsterList: Monster[] = [
        ...selectedMonsters,
        ...allMonsters.slice(CATACOMBS_FIRST_MONSTER_ID, CATACOMBS_FINAL_MONSTER_ID + 1)
    ];

    const clearCondition: StageClearCondition = {
        scoreRequirement: 1100,
        finalMonsterCount: 3
    };

    const generatePathOptions = () => {
        const debuffMonster: Monster = monsterList.find((monster) => debuffMonsterNames.includes(monster.name))!;
        const necromancer: Monster = monsterList.find((monster) => monster.name === "necromancer")!;

        return [
            {
                monsterList: [...getRandomArraySample(monsterList.slice(0,5), 2)],
                rewards: {}
            },
            {
                monsterList: [getRandomArrayElement(monsterList.slice(2,4)), getRandomArrayElement(monsterList.slice(4,7))],
                rewards: {
                    gold: 250,
                    health: 1
                }
            },
            {
                monsterList: [debuffMonster, necromancer],
                rewards: {
                    gold: 500,
                    health: 2,
                    hints: 1
                }
            }
        ] as NewStageParams[];
    };

    return {
        id: uuidv4(),
        name: "The Catacombs",
        number: 2,
        monsterList: monsterList,
        startTimestamp: new Date().getTime(),
        endTimestamp: Infinity,
        accumulatedScore: 0,
        goldReward: 500,
        levelRequirements: SECOND_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: generatePathOptions,
        generateNextStage: generateThirdStage
    } as Stage;
};
