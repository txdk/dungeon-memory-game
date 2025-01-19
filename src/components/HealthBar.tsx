import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import { MAX_HEALTH } from "../constants/GameConstants";
import { useContext, useMemo } from "react";
import GameContext from "../contexts/GameContext";

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
    }

    return healthIndicator;
}

export default function HealthBar() {
    const { state } = useContext(GameContext);
    const currentHealth: number = state.currentHealth;

    const healthIndicator: Array<JSX.Element> = useMemo(() => renderHearts(currentHealth), [currentHealth]);

    return (
        <span className="text-green-500 m-2 absolute right-0 flex">
            {healthIndicator}
        </span> 
    )
}