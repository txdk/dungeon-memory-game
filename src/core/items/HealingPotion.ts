import { Item } from "@/types/Item";
import { GiHealthPotion } from "react-icons/gi";

export const HEALING_POTION: Item = {
    name: "Healing potion",
    baseCost: 200,
    description: "Restore 1 HP",
    displayIcon: GiHealthPotion
};