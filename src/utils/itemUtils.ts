import { GameState } from "@/reducers/GameState";
import { Item } from "@/types/Item";

export const triggerItemEffects = (item: Item, state: GameState): GameState => {
    switch (item.name) {
        case ("Healing potion"):
            return {
                ...state,
                currentHealth: state.currentHealth + 1
            };
        default:
            return state;
    };
};