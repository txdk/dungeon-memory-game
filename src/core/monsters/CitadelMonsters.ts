import { BOSS_NAMES, GameInput } from '@/constants/GameConstants';
import { Monster } from '@/types/Monster';
import { getRandomCombatInput, getRandomDirection, getRandomInput, getRandomNonCombatInput, randomiseArrayOrder } from '@/utils/randomUtils';
import { v4 as uuidv4} from 'uuid';

export const generateDemonicEnforcer = (): Monster => {

    const moveSequence: GameInput[] = [getRandomDirection(), getRandomDirection(), getRandomDirection()];
    const combatSequence: GameInput[] = [getRandomCombatInput(), getRandomCombatInput(), getRandomCombatInput()];

    return {
        id: 16,
        instanceId: uuidv4(),
        name: "demonic enforcer",
        description: "Conjured from hatred and hellfire with the sole purpose of stamping out intruders to the citadel.",
        defeatSequence: [...moveSequence, ...combatSequence, ...moveSequence, ...combatSequence],
        score: 400,
        isDefeated: false
    };
};

export const generateCabalHighpriest = (): Monster => {
    return {
        id: 17,
        instanceId: uuidv4(),
        name: "cabal highpriest",
        description: `Grand mage, and loyal to the powers that control the citadel. Empowers its allies with a dark magic.
        Causes the inputs of the next monster to be reversed.`,
        defeatSequence: randomiseArrayOrder([
            GameInput.INPUT_ATTACK, 
            getRandomNonCombatInput(),
            getRandomNonCombatInput(),
            getRandomNonCombatInput(),
            getRandomNonCombatInput()
        ]) as GameInput[],
        score: 400,
        isDefeated: false
    };
};

export const generateMechagolem = (): Monster => {
    return {
        id: 18,
        instanceId: uuidv4(),
        name: "mechagolem",
        description: `A brute of a combat automaton, constantly adapting to its enemies.
        When defeated, the mechagolem's defeat sequence is modified by cycling the first input to the end of the sequence.`,
        defeatSequence: randomiseArrayOrder([
            GameInput.INPUT_ATTACK, 
            GameInput.INPUT_SHIELD, 
            getRandomNonCombatInput(), 
            getRandomNonCombatInput(), 
            getRandomInput()
        ]) as GameInput[],
        score: 600,
        isDefeated: false
    };
};

export const generateMegagolem = (): Monster => {

    const movementInputs: GameInput[] = [
        getRandomDirection(),
        getRandomDirection(),
        getRandomDirection(),
        getRandomDirection()
    ];

    const combatInputs: GameInput[] = randomiseArrayOrder(
        [GameInput.INPUT_ATTACK, getRandomCombatInput(), getRandomCombatInput()]
    ) as GameInput[];

    return {
        id: 19,
        instanceId: uuidv4(),
        name: "megagolem",
        description: "A titanic creation, animated by unfathomable arcane forces. Not to be confused with its mechanical counterpart.",
        defeatSequence: [...movementInputs, ...combatInputs],
        score: 600,
        isDefeated: false
    };
};

export const generateBoss = (miniboss: Monster): Monster => {
    const bossName = BOSS_NAMES.get(miniboss.name);
    const extraInputs = randomiseArrayOrder([
        GameInput.INPUT_ATTACK,
        GameInput.INPUT_ATTACK,
        GameInput.INPUT_SHIELD,
        GameInput.INPUT_LEFT,
        GameInput.INPUT_RIGHT,
        GameInput.INPUT_UP,
        getRandomInput()
    ]) as GameInput[];

    return {
        id: 20,
        instanceId: uuidv4(),
        name: bossName!,
        description: "Atop the citadel sits this tyrannical ruler. Defeat it to end its reign of terror once and for all!",
        defeatSequence: [...miniboss.defeatSequence, ...extraInputs],
        score: 1000,
        isDefeated: false
    };
};