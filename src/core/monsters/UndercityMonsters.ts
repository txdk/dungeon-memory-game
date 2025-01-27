import { GameInput } from "../../constants/GameConstants";
import { getRandomArrayElement, getRandomDirection, getRandomInput, randomiseArrayOrder } from "../../utils/randomUtils";
import { v4 as uuidv4} from 'uuid';
import { Monster } from "./Monster";

export const generateMinotaur = () => {
    const mazeInputs: Array<GameInput> = [
        getRandomDirection(), 
        getRandomDirection(),
        getRandomDirection(),
        getRandomDirection(),
        getRandomDirection()
    ];
    const reversedMazeInputs: Array<GameInput> = mazeInputs.slice().reverse();
    
    return {
        id: 11,
        instanceId: uuidv4(),
        name: "minotaur",
        description: "A mighty foe awaits you at the centre of a dark maze. Don't lose your bearings!",
        defeatSequence: [
            ...mazeInputs,
            GameInput.INPUT_SHIELD,
            GameInput.INPUT_ATTACK,
            GameInput.INPUT_ATTACK,
            ...reversedMazeInputs
        ],
        score: 200,
        isDefeated: false
    } as Monster;
};

export const generateMiniboss = () => {
    const minibossNames: Array<string> = ["vampire", "mind flayer", "death knight"];
    const minibossName: string = getRandomArrayElement(minibossNames);

    return {
        id: 12,
        instanceId: uuidv4(),
        name: minibossName,
        description: "An ancient deadly foe with no easily exploitable weaknesses. Use all of your cunning to best it in combat!",
        defeatSequence: randomiseArrayOrder([
            getRandomInput(),
            GameInput.INPUT_LEFT,
            GameInput.INPUT_UP,
            GameInput.INPUT_RIGHT,
            GameInput.INPUT_SHIELD, 
            GameInput.INPUT_ATTACK
        ]) as Array<GameInput>,
        score: 400,
        isDefeated: false
    } as Monster;
};