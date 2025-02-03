import { GameInput } from "@/constants/GameConstants";
import InputIcon from "@/components/generic/InputIcon";
import { Monster } from "@/types/Monster";
import { v4 as uuidv4} from 'uuid';
import { APP_COLOURS } from "@/constants/AppConstants";

export const renderDefeatSequence = (monster: Monster) => {

    if (monster.name === "shapeshifter") {
        return <p>???</p>;
    };

    return monster.defeatSequence.map((input: GameInput) => {
        return (<InputIcon key={`icon-${uuidv4()}`} input={input} />)
    });
};

export const renderFlavourText = (text: string) => {
    const textParts = text.split("Note:", 2);
    const flavourText = textParts[0];
    const mechanicsText = textParts.length === 2? textParts[1]: "";

    return (
        <>
            <p>{flavourText}</p>
            <p className={`${APP_COLOURS.IMPORTANT} mt-1`}>{mechanicsText}</p>
        </>
    );
};