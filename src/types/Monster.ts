import { GameInput } from "@/constants/GameConstants";

export interface Monster {
    id: number;
    instanceId: string;
    name: string;
    description: string | JSX.Element;
    defeatSequence: Array<GameInput>;
    score: number;
    isDefeated: boolean;
};

export interface Encounter {
    monster: Monster;
    quantity: number;
};