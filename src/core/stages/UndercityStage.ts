import { THIRD_STAGE_LEVEL_REQUIREMENTS } from '@/constants/GameConstants';
import { Monster } from '@/types/Monster';
import { NewStageParams, Stage, StageClearCondition } from '@/types/Stage';
import { v4 as uuidv4} from 'uuid';

export const generateThirdStage = (selectedMonsters: Monster[], allMonsters: Monster[]) => {

    const clearCondition: StageClearCondition = {
        scoreRequirement: Infinity,
        finalMonsterCount: 3
    };

    return {
        id: uuidv4(),
        name: "The Undercity",
        monsterList: [...selectedMonsters, ...allMonsters.slice(11)],
        startTimestamp: new Date().getTime(),
        endTimestamp: Infinity,
        accumulatedScore: 0,
        goldReward: 3000,
        levelRequirements: THIRD_STAGE_LEVEL_REQUIREMENTS,
        clearCondition: clearCondition,
        generatePathOptions: () => [] as NewStageParams[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        generateNextStage: (_selectedMonsters: Monster[], _allMonsters: Monster[]) => {}
    } as Stage;
};