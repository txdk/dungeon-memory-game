import { GameInput } from "../constants/GameConstants";

const DIRECTIONAL_INPUTS = [GameInput.INPUT_LEFT, GameInput.INPUT_UP, GameInput.INPUT_RIGHT];
const COMBAT_INPUTS = [GameInput.INPUT_ATTACK, GameInput.INPUT_SHIELD];

// Return a random index from an array
export const getRandomArrayIndex = (array: Array<unknown>) => {
    return Math.floor(Math.random() * array.length);
}

// Randomise the order of elements in an array
export const randomiseArrayOrder = (array: Array<unknown>) => {
    const randomisedArray: Array<unknown> = [];
    const numElements: number = array.length;

    for (let i = 0; i < numElements; i++) {
        const randomIndex: number = getRandomArrayIndex(array);
        const randomElement: unknown = array[randomIndex];
        randomisedArray.push(randomElement);
        array = array.filter((_, index) => index !== randomIndex);
    }

    return randomisedArray;
}

// Get a random directional input
export const getRandomDirection = () => {
    const randomIndex: number = getRandomArrayIndex(DIRECTIONAL_INPUTS);
    return DIRECTIONAL_INPUTS[randomIndex];
};

// Get a random combat input
export const getRandomCombatInput = () => {
    const randomIndex: number = getRandomArrayIndex(COMBAT_INPUTS);
    return COMBAT_INPUTS[randomIndex];
}