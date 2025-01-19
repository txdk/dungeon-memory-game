import { FaLongArrowAltLeft, FaLongArrowAltRight, FaLongArrowAltUp } from "react-icons/fa";
import { GameInput } from "../constants/GameConstants";
import { INPUT_ICON_SIZE } from "../constants/AppConstants";
import { GiBroadsword, GiShield } from "react-icons/gi";

interface PlayerInputIconProps {
    className?: string;
    input: GameInput;
}

export default function PlayerInputIcon({ className, input }: Readonly<PlayerInputIconProps>) {
    switch (input) {
        case GameInput.INPUT_LEFT:
            return (<FaLongArrowAltLeft className={className} size={INPUT_ICON_SIZE} />);
        
        case GameInput.INPUT_UP:
            return (<FaLongArrowAltUp className={className} size={INPUT_ICON_SIZE} />);

        case GameInput.INPUT_RIGHT:
            return (<FaLongArrowAltRight className={className} size={INPUT_ICON_SIZE} />);

        case GameInput.INPUT_ATTACK:
            return (<GiBroadsword className={className} size={INPUT_ICON_SIZE} />);

        case GameInput.INPUT_SHIELD:
            return (<GiShield className={className} size={INPUT_ICON_SIZE} />);

        default:
            return <></>;
    }

}