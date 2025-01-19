import { GameInput } from "../constants/GameConstants"

export interface Monster {
    id: number;
    name: string;
    defeatSequence: Array<GameInput>;
    level: number;
    score: number;
}

export const firstMonster: Monster = {
    id: 0,
    name: "bat",
    defeatSequence: [GameInput.INPUT_ATTACK],
    level: 1,
    score: 5
}