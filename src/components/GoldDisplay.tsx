import classNames from "classnames";
import SlotCounter from "react-slot-counter";

interface GoldDisplayProps {
    textColour: string;
    gold: number;
}

export default function GoldDisplay({ textColour, gold }: Readonly<GoldDisplayProps>) {
    return (
        <p className={classNames(textColour, "font-customFont text-left m-2")}>
            GOLD:{" "}
            <SlotCounter value={gold} />
        </p>
    )
}