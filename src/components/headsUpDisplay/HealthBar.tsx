import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import { useMemo } from "react";
import classNames from "classnames";

// Render the player health bar based on current health
const renderHearts = (health: number, maxHealth: number) => {
    const healthIndicator: Array<JSX.Element> = [];

    for (let i = 0; i < maxHealth; i++) {
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
    maxHealth: number;
}

export default function HealthBar({ colour, currentHealth, maxHealth }: Readonly<HealthBarProps>) {
    const healthIndicator: Array<JSX.Element> = useMemo(() => renderHearts(currentHealth, maxHealth), [currentHealth, maxHealth]);

    return (
        <span className={classNames(colour, "m-2 absolute right-0 flex")}>
            {healthIndicator}
        </span> 
    );
};