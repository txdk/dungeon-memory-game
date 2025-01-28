import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import { MAX_HEALTH } from "@/constants/GameConstants";
import { useMemo } from "react";
import classNames from "classnames";

// Render the player health bar based on current health
const renderHearts = (health: number) => {
    const healthIndicator: Array<JSX.Element> = [];

    for (let i = 0; i < MAX_HEALTH; i++) {
        if (i < health) {
            healthIndicator.push(<GiHearts key={`heart-${i}`} />);
        }
        else {
            healthIndicator.push(<GiBrokenHeart className="text-white" key={`broken-heart-${i}`} />);
        }
    };

    return healthIndicator;
};

interface HealthBarProps {
    colour: string;
    currentHealth: number;
}

export default function HealthBar({ colour, currentHealth }: Readonly<HealthBarProps>) {
    const healthIndicator: Array<JSX.Element> = useMemo(() => renderHearts(currentHealth), [currentHealth]);

    return (
        <span className={classNames(colour, "m-2 absolute right-0 flex")}>
            {healthIndicator}
        </span> 
    );
};