import { GiBroadsword, GiShield } from "react-icons/gi";
import Button from "./Button";
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaLongArrowAltUp } from "react-icons/fa";
import { ICON_SIZE, MOBILE_ICON_SIZE } from "../constants/AppConstants";
import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import { GameInput } from "../constants/GameConstants"; 
import { useMediaQuery } from "react-responsive";

export default function Controls() {

    const { registerInput } = useContext(GameContext);

    // Determine which icon size to use
    const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
    const iconSize = isTabletOrMobile? MOBILE_ICON_SIZE: ICON_SIZE;

    return (
        <div className="flex place-content-center pt-20 md:pt-16 space-x-[40px] md:space-x-[200px] mb-3">
            <div className="space-x-1 md:space-x-2">
                {/* Left arrow button */}
                <Button handleClick={() => registerInput(GameInput.INPUT_LEFT)}>
                    <FaLongArrowAltLeft size={iconSize} />
                </Button>

                {/* Up arrow button */}
                <Button 
                    className="translate-y-[-20px] active:translate-y-[-16px]" 
                    handleClick={() => {registerInput(GameInput.INPUT_UP)}}
                >
                    <FaLongArrowAltUp size={iconSize} />
                </Button>

                {/* Right arrow button */}
                <Button handleClick={() => registerInput(GameInput.INPUT_RIGHT)}>
                    <FaLongArrowAltRight size={iconSize} />
                </Button>
            </div>

            <div className="space-x-2 md:space-x-5">
                {/* Attack button */}
                <Button handleClick={() => {registerInput(GameInput.INPUT_ATTACK)}}>
                    <GiBroadsword size={iconSize}/>
                </Button>

                {/* Shield button */}
                <Button handleClick={() => {registerInput(GameInput.INPUT_SHIELD)}}>
                    <GiShield size={iconSize}/>
                </Button>
            </div>    
        </div>
    );
}