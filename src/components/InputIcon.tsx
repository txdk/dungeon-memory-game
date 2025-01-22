import { FaLongArrowAltLeft, FaLongArrowAltRight, FaLongArrowAltUp } from "react-icons/fa";
import { GameInput } from "../constants/GameConstants";
import { INPUT_ICON_SIZE, MOBILE_INPUT_ICON_SIZE } from "../constants/AppConstants";
import { GiBroadsword, GiShield } from "react-icons/gi";
import { useMediaQuery } from "react-responsive";

interface InputIconProps {
    className?: string;
    input: GameInput;
}

export default function InputIcon({ className, input }: Readonly<InputIconProps>) {

    // Determine which icon size to use
    const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
    const iconSize = isTabletOrMobile? MOBILE_INPUT_ICON_SIZE: INPUT_ICON_SIZE;

    switch (input) {
        case GameInput.INPUT_LEFT:
            return (<FaLongArrowAltLeft className={className} size={iconSize} />);
        
        case GameInput.INPUT_UP:
            return (<FaLongArrowAltUp className={className} size={iconSize} />);

        case GameInput.INPUT_RIGHT:
            return (<FaLongArrowAltRight className={className} size={iconSize} />);

        case GameInput.INPUT_ATTACK:
            return (<GiBroadsword className={className} size={iconSize} />);

        case GameInput.INPUT_SHIELD:
            return (<GiShield className={className} size={iconSize} />);

        default:
            return <></>;
    }

}