import { THIRD_STAGE_LEVEL_REQUIREMENTS, UNDERCITY_FINAL_MONSTER_ID, UNDERCITY_FIRST_MONSTER_ID } from '@/constants/GameConstants';
import { Monster } from '@/types/Monster';
import { NewStageParams, Stage, StageClearCondition } from '@/types/Stage';
import { v4 as uuidv4} from 'uuid';

export const generateThirdStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: 3500,
        finalMonsterCount: 3
    };

    const monsterList: Monster[] = [
        ...selectedMonsters, 
        ...allMonsters.slice(UNDERCITY_FIRST_MONSTER_ID, UNDERCITY_FINAL_MONSTER_ID + 1)
    ];

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
        generatePathOptions: () => [] as NewStageParams[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        generateNextStage: (_selectedMonsters: Monster[], _allMonsters: Monster[]) => {}
    } as Stage;
};