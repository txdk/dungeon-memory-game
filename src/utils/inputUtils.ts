import { GameInput } from "@/constants/GameConstants";

export const swapCombatInputs = (input: GameInput) => {
    switch (input) {
        case GameInput.INPUT_ATTACK:
            return GameInput.INPUT_SHIELD;
        case GameInput.INPUT_SHIELD:
            return GameInput.INPUT_ATTACK;
        default:
            return input;
    };
};