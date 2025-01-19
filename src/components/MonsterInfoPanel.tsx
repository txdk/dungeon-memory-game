import { useContext } from "react";
import { Monster } from "../core/Monsters";
import Button from "./Button";
import InputIcon from "./InputIcon";
import GameContext from "../contexts/GameContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import { GameInput } from "../constants/GameConstants";
import { v4 as uuidv4} from 'uuid';

interface MonsterInfoPanelProps {
    monster: Monster;
}

export default function MonsterInfoPanel({ monster }: Readonly<MonsterInfoPanelProps>) {

    const { closeInfoPanel } = useContext(GameContext);

    return (
        <div className="font-customFont text-green-500 text-center m-5 pt-5">
            <p>
                New monster discovered: {monster.name}
            </p>
            <p className="mt-5">
                {monster.description}
            </p>
            <span className="flex justify-left mt-5">
                To defeat: {monster.defeatSequence.map((input: GameInput) => {
                    return <InputIcon key={`icon-${uuidv4()}`} input={input} />
                })}
            </span>
            <Button className="flex mt-3 relative p-1.5 left-[40%] items-center" handleClick={closeInfoPanel}>
                <>
                    <span className="text-sm">Proceed</span>
                    <RxDoubleArrowRight className="ml-2" />
                </>
            </Button>
        </div>
    );
}