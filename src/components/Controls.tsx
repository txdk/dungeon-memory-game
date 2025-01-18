import { GiBroadsword, GiShield } from "react-icons/gi";
import Button from "./Button";
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaLongArrowAltUp } from "react-icons/fa";
import { ICON_SIZE } from "../constants/AppConstants";
import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import { GameInput } from "../reducers/GameReducer";

export default function Controls() {

    const { registerInput } = useContext(GameContext);

    return (
        <div className="flex place-content-center pt-16 space-x-[200px] mb-3">
            <div className="space-x-2">
                {/* Left arrow button */}
                <Button handleClick={() => registerInput(GameInput.INPUT_LEFT)}>
                    <FaLongArrowAltLeft size={ICON_SIZE} />
                </Button>

                {/* Up arrow button */}
                <Button 
                    className="translate-y-[-20px] active:translate-y-[-16px]" 
                    handleClick={() => {registerInput(GameInput.INPUT_UP)}}
                >
                    <FaLongArrowAltUp size={ICON_SIZE} />
                </Button>

                {/* Right arrow button */}
                <Button handleClick={() => registerInput(GameInput.INPUT_RIGHT)}>
                    <FaLongArrowAltRight size={ICON_SIZE} />
                </Button>
            </div>

            <div className="space-x-5">
                {/* Attack button */}
                <Button handleClick={() => {registerInput(GameInput.INPUT_ATTACK)}}>
                    <GiBroadsword size={ICON_SIZE}/>
                </Button>

                {/* Shield button */}
                <Button handleClick={() => {registerInput(GameInput.INPUT_SHIELD)}}>
                    <GiShield size={ICON_SIZE}/>
                </Button>
            </div>    
        </div>
    );
}