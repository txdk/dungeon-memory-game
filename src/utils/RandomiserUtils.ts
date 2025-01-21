import { GameInput } from "../constants/GameConstants";

const DIRECTIONAL_INPUTS = [GameInput.INPUT_LEFT, GameInput.INPUT_UP, GameInput.INPUT_RIGHT];
const COMBAT_INPUTS = [GameInput.INPUT_ATTACK, GameInput.INPUT_SHIELD];
const NON_COMBAT_INPUTS = [...DIRECTIONAL_INPUTS, GameInput.INPUT_SHIELD];
const ALL_INPUTS = [...DIRECTIONAL_INPUTS, ...COMBAT_INPUTS];

// Return a random index from an array
export const getRandomArrayIndex = (array: Array<unknown>) => {
    return Math.floor(Math.random() * array.length);
}

// Return a random element from an array
export const getRandomArrayElement = <T>(array: Array<T>) => {
    const randomIndex: number = getRandomArrayIndex(array);
    return array[randomIndex];
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
    return getRandomArrayElement(DIRECTIONAL_INPUTS);
};

// Get a random combat input
export const getRandomCombatInput = () => {
    return getRandomArrayElement(COMBAT_INPUTS);
}

// Get a random noncombat input
export const getRandomNonCombatInput = () => {
    return getRandomArrayElement(NON_COMBAT_INPUTS);
}

// Get a random input
export const getRandomInput = () => {
    return getRandomArrayElement(ALL_INPUTS);
}