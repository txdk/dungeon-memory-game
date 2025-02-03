import { useContext, useEffect, useMemo } from "react";
import GameContext from "@/contexts/GameContext";
import InputIcon from "@/components/generic/InputIcon";
import { PlayerInput } from "@/reducers/GameState";
import classNames from "classnames";
import useSound from "use-sound";
import { CLICK_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";

// Render the player control inputs
const renderInputs = (playerInputs: Array<PlayerInput>) => {
    const playerInputArray: Array<JSX.Element> = [];

    for (let i = 0; i < playerInputs.length; i++) {
        const iconColour: string = playerInputs[i].isCorrect? "text-green-500": "text-red-700"; 

        playerInputArray.push(
            <InputIcon
                className={iconColour}
                input={playerInputs[i].input} 
                key={`input-${i}`}
            />
        )
    };

    return playerInputArray;
};

interface PlayerInputDisplayProps {
    className?: string;
}

export default function PlayerInputDisplay({ className }: Readonly<PlayerInputDisplayProps>) {
    const { state } = useContext(GameContext);
    const [play] = useSound(CLICK_SOUND, {volume: SFX_VOLUME});
    const playerInputs: PlayerInput[] = state.playerInputs;
    const playerInputArray: JSX.Element[] = useMemo(() => renderInputs(playerInputs), [playerInputs]);

    // Play sound when player makes a correct input
    useEffect(() => {
        if (playerInputs?.length > 0 && playerInputs.at(-1)?.isCorrect) {
            play();
        };
    }, [play, playerInputs]);

    return (
        <div className={classNames(className, "flex font-customFont text-green-500 mt-10 p-5 md:p-10")}>
            INPUTS: {playerInputArray}
        </div>
    );
};