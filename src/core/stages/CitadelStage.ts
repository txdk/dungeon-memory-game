import { CITADEL_FINAL_MONSTER_ID, CITADEL_FIRST_MONSTER_ID, FOURTH_STAGE_LEVEL_REQUIREMENTS } from "@/constants/GameConstants";
import { Monster } from "@/types/Monster";
import { Stage, StageClearCondition } from "@/types/Stage";
import { v4 as uuidv4} from 'uuid';

export const generateCitadelStage = (selectedMonsters: Monster[], allMonsters: Monster[]): Stage => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: 9000,
        finalMonsterCount: 3
    };

    const monsterList: Monster[] = [
        ...selectedMonsters,
        ...allMonsters.slice(CITADEL_FIRST_MONSTER_ID, CITADEL_FINAL_MONSTER_ID + 1)
    ];

    return {
        id: uuidv4(),
        name: "The Citadel",
        number: 4,
        monsterList: monsterList,
        startTimestamp: new Date().getTime(),
        endTimestamp: Infinity,
        accumulatedScore: 0,
        goldReward: 1000,
        levelRequirements: FOURTH_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: () => [],
        generateNextStage: generateCitadelStage
    } as Stage;

};