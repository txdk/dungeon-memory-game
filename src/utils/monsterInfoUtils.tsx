import { GameInput } from "@/constants/GameConstants";
import InputIcon from "@/components/generic/InputIcon";
import { Monster } from "@/types/Monster";
import { v4 as uuidv4} from 'uuid';

export const renderDefeatSequence = (monster: Monster) => {

    if (monster.name === "shapeshifter") {
        return <p>???</p>;
    };

    return monster.defeatSequence.map((input: GameInput) => {
        return (<InputIcon key={`icon-${uuidv4()}`} input={input} />)
    });
};