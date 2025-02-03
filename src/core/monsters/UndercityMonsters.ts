import { BOSS_NAMES, GameInput } from "@/constants/GameConstants";
import { getRandomArrayElement, getRandomCombatInput, getRandomDirection, getRandomInput, randomiseArrayOrder } from "@/utils/randomUtils";
import { v4 as uuidv4} from 'uuid';
import { Monster } from "@/types/Monster";

export const generateStage3BasicMonsters = (): Monster[] => {

    const firstMonsterInputs: GameInput[] = [...Array(6)].map(() => getRandomCombatInput());

    const firstMonster: Monster = {
        id: 11,
        instanceId: uuidv4(),
        name: "stone sentinel",
        description: "A stalwart guardian of the undercity. Brings death to all but the most combat-trained interlopers.",
        defeatSequence: firstMonsterInputs,
        score: 200,
        isDefeated: false
    };

    const secondMonsterPartialInputs: GameInput[] = randomiseArrayOrder(
        [GameInput.INPUT_ATTACK, getRandomInput(), getRandomInput(), getRandomInput()]
    ) as GameInput[];
    const secondMonsterInputs: GameInput[] = (
        Math.random() < 0.5? 
        [...secondMonsterPartialInputs, ...secondMonsterPartialInputs]:
        secondMonsterPartialInputs.flatMap(input => [input, input])
    );

    const secondMonster: Monster = {
        id: 12,
        instanceId: uuidv4(),
        name: "manticore",
        description: "A fearsome beast that enjoys toying with its prey. Observe its hunting habits to keep the upper hand!",
        defeatSequence: secondMonsterInputs,
        score: 200,
        isDefeated: false
    };

    return [firstMonster, secondMonster];
};

export const generateShapeshifter = () => {
    return {
        id: 13,
        instanceId: uuidv4(),
        name: "shapeshifter",
        description: "A master of cunning and trickery. Note: Transforms into the previous monster you encountered.",
        defeatSequence: [GameInput.INPUT_ATTACK],
        score: 200,
        isDefeated: false
    } as Monster
};

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
        id: 14,
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
        score: 400,
        isDefeated: false
    } as Monster;
};

export const generateMiniboss = () => {
    const minibossNames: string[] = [...BOSS_NAMES.keys()];
    const minibossName: string = getRandomArrayElement(minibossNames);

    return {
        id: 15,
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
        score: 500,
        isDefeated: false
    } as Monster;
};