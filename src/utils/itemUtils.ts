import { GameState } from "@/reducers/GameState";
import { Item } from "@/types/Item";

export const triggerItemEffects = (item: Item, state: GameState): GameState => {
    switch (item.name) {
        case ("Magic scroll"):
            return {
                ...state,
                hints: state.hints + 1
            };
        case ("Healing potion"):
            return {
                ...state,
                currentHealth: state.currentHealth + 1
            };
        case ("Lillies of life"):
            return {
                ...state,
                currentHealth: state.currentHealth + 1,
                maxHealth: state.maxHealth + 1
            };
        default:
            return state;
    };
};