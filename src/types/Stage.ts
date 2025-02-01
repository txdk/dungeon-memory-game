import { Monster } from "@/types/Monster";

// Constants specifying the requirements for a player to complete a stage
export interface StageClearCondition {
    scoreRequirement: number;
    finalMonsterCount: number;
}

export interface Rewards {
    health?: number;
    gold?: number;
};

export interface NewStageParams {
    monsterList: Monster[];
    rewards: Rewards;
};

export interface Stage {
    id: string;
    name: string;
    number: number;
    monsterList: Monster[];
    startTimestamp: number;
    endTimestamp: number;
    accumulatedScore: number;
    goldReward: number;
    levelRequirements: Map<number, number>;
    clearCondition: StageClearCondition;
    generatePathOptions: () => NewStageParams[];
    generateNextStage: (selectedMonsters: Monster[], allMonsters: Monster[]) => Stage;
};
