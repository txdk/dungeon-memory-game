import Button from "@/components/generic/Button";
import { ICON_SIZE, MOBILE_ICON_SIZE } from "@/constants/AppConstants";
import { GameInput } from "@/constants/GameConstants";
import GameContext from "@/contexts/GameContext";
import { useAlert } from "@/hooks/useAlert";
import classNames from "classnames";
import { useCallback, useContext, useEffect } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaLongArrowAltUp } from "react-icons/fa";
import { GiBroadsword, GiShield } from "react-icons/gi";
import { useMediaQuery } from "react-responsive";

export default function Controls() {

    const { state, registerInput } = useContext(GameContext);
    const { isFrozen, colour } = useAlert(state.currentHealth);

    // Handle keyboard inputs
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            if (isFrozen) return;

            switch (e.code) {
                case "ArrowLeft":
                    registerInput(GameInput.INPUT_LEFT);
                    break;
                case "ArrowUp":
                    registerInput(GameInput.INPUT_UP);
                    break;
                case "ArrowRight":
                    registerInput(GameInput.INPUT_RIGHT);
                    break;
                case "KeyA":
                    registerInput(GameInput.INPUT_ATTACK);
                    break;
                case "KeyD":
                    registerInput(GameInput.INPUT_SHIELD);
                    break;
            };
        }, [isFrozen, registerInput]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    // Handle button press
    const handleButtonPress = (input: GameInput) => {
        if (!isFrozen) {
            registerInput(input);
        };
    };

    // Determine which icon size to use
    const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
    const iconSize = isTabletOrMobile? MOBILE_ICON_SIZE: ICON_SIZE;

    return (
        <div className="flex place-content-center pt-20 md:pt-16 space-x-[40px] md:space-x-[200px] mb-3">
            <div className="space-x-1 md:space-x-2">
                {/* Left arrow button */}
                <Button 
                    className={colour}
                    handleClick={() => {handleButtonPress(GameInput.INPUT_LEFT)}}
                >
                    <FaLongArrowAltLeft size={iconSize} />
                </Button>

                {/* Up arrow button */}
                <Button 
                    className={classNames(colour, "translate-y-[-20px] active:translate-y-[-16px]")} 
                    handleClick={() => {handleButtonPress(GameInput.INPUT_UP)}}
                >
                    <FaLongArrowAltUp size={iconSize} />
                </Button>

                {/* Right arrow button */}
                <Button 
                    className={colour}
                    handleClick={() => handleButtonPress(GameInput.INPUT_RIGHT)}
                >
                    <FaLongArrowAltRight size={iconSize} />
                </Button>
            </div>

            <div className="space-x-2 md:space-x-5">
                {/* Attack button */}
                <Button 
                    className={colour}
                    handleClick={() => {handleButtonPress(GameInput.INPUT_ATTACK)}}
                >
                    <GiBroadsword size={iconSize}/>
                </Button>

                {/* Shield button */}
                <Button 
                    className={colour}
                    handleClick={() => {handleButtonPress(GameInput.INPUT_SHIELD)}}
                >
                    <GiShield size={iconSize}/>
                </Button>
            </div>    
        </div>
    );
}