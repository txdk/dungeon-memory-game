import { useContext, useMemo } from "react";
import GameContext from "../contexts/GameContext";
import InputIcon from "./InputIcon";
import { PlayerInput } from "../reducers/GameReducer";

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
    }

    return playerInputArray;
}

export default function PlayerInputDisplay() {
    const { state } = useContext(GameContext);
    const playerInputs: Array<PlayerInput> = state.playerInputs;
    const playerInputArray: Array<JSX.Element> = useMemo(() => renderInputs(playerInputs), [playerInputs]);

    return (
        <div className="flex font-customFont text-green-500 mt-10 p-10">
            INPUTS: {playerInputArray}
        </div>
    );
}