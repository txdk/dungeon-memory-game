import { getRandomArrayElement } from "@/utils/randomUtils";
import { Monster } from "@/types/Monster";
import { v4 as uuidv4} from 'uuid';
import { Stage } from "@/types/Stage"; 
import { generateTier1Monsters, generateTier2Monsters } from "@/core/monsters/CaveMonsters";
import { generateBigMonster, generateNecromancer, generateStage2BasicMonsters } from "@/core/monsters/CatacombsMonsters";
import { generateMiniboss, generateMinotaur, generateShapeshifter, generateStage3BasicMonsters } from "@/core/monsters/UndercityMonsters";
import { generateBoss, generateCabalHighpriest, generateDemonicEnforcer, generateMechagolem, generateMegagolem } from "@/core/monsters/CitadelMonsters";

// Find monster by name
export const findMonsterByName = (name: string, monsterList: Monster[]) => {
    return monsterList.find((monster: Monster) => monster.name === name)!;
};

// Determine whether monster article is "a" or "an"
export const getMonsterArticle = (name: string) => {
    const startsWithVowel: boolean = ['a', 'e', 'i', 'o', 'u'].includes(name[0]);
    return startsWithVowel? "an" : "a";
};

// Return a random monster
export const getRandomMonster = (level: number, monsterList: Array<Monster>) => {
    const availableMonsters: Array<Monster> = monsterList.slice(0, level);
    const randomMonster: Monster = getRandomArrayElement(availableMonsters);
    return {
        ...randomMonster,
        instanceId: uuidv4()
    };
};

// Return a random monster from the current stage
export const getRandomMonsterFromStage = (level: number, stage: Stage) => {
    const availableMonsters: Monster[] = stage.monsterList.slice(0, level);
    const randomMonster: Monster = getRandomArrayElement(availableMonsters);
    return {
        ...randomMonster,
        instanceId: uuidv4()
    };
};

// Generate unique monster inputs
export const generateUniqueMonsterInputs = (monster: Monster, previousMonster: Monster): Monster => {
    
    let newMonster: Monster;
    switch (monster.name) {
        case "shapeshifter":
            newMonster = {
                ...monster,
                defeatSequence: previousMonster.defeatSequence
            };
            break;
        
        case "mechagolem":
            newMonster = {
                ...monster,
                defeatSequence: [
                    ...monster.defeatSequence.slice(1),
                    monster.defeatSequence[0]
                ]
            };
            break;

        default:
            newMonster = {...monster};
    };

    return newMonster;
};

// Apply temporary monster input modifiers
export const handleModifyInputs = (monster: Monster, previousMonster: Monster): Monster => {
    // Check if inputs should be reversed
    const shouldReverseInputs: boolean = previousMonster.name === "cabal highpriest";
    if (shouldReverseInputs) {
        return {
            ...monster,
            defeatSequence: [...monster.defeatSequence].reverse()
        };
    };

    return monster;
};

// Permanently modify a monster in the monster list
export const modifyMonsterList = (monster: Monster, monsterList: Monster[]) => {
    return (
        monsterList.map(listMonster => listMonster.name === monster.name? monster: listMonster)
    );
};

// Handle updating of the monster list for dynamic enemies
export const handleUpdateMonsterList = (monster: Monster, monsterList: Monster[]) => {
    if (monster.name === "mechagolem") {
        return modifyMonsterList(monster, monsterList);
    };

    return monsterList;
};

// Generate monster list
export const generateMonsterList = (): Monster[] => {
    const tier1Monsters: Monster[] = generateTier1Monsters();
    const tier2Monsters: Monster[] = generateTier2Monsters();
    const miniboss: Monster = generateMiniboss();

    return [
        ...tier1Monsters,
        ...tier2Monsters,
        ...generateStage2BasicMonsters(tier1Monsters),
        generateBigMonster(tier2Monsters),
        generateNecromancer(tier1Monsters),
        ...generateStage3BasicMonsters(),
        generateShapeshifter(),
        generateMinotaur(),
        miniboss,
        generateDemonicEnforcer(),
        generateCabalHighpriest(),
        generateMechagolem(),
        generateMegagolem(),
        generateBoss(miniboss)
    ];
};
