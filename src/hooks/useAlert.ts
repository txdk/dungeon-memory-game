import { useEffect, useState } from "react"
import { ALERT_FLASH_DURATION, APP_COLOURS } from "../constants/AppConstants"
import { MAX_HEALTH } from "../constants/GameConstants";

/**
 * Custom hook to temporarily set colours to an alert tone and freeze inputs when damage is taken
 */
export const useAlert = (health: number) => {
    const [cachedHealth, setCachedHealth] = useState(MAX_HEALTH);
    const [isFrozen, setIsFrozen] = useState(false);
    const [colour, setColour] = useState(APP_COLOURS.PRIMARY);

    useEffect(() => {
        if (health < cachedHealth && health > 0) {
            setIsFrozen(true);
            setColour(APP_COLOURS.ALERT);
                
            setTimeout(() => {
                setIsFrozen(false);
                setColour(APP_COLOURS.PRIMARY);
            }, ALERT_FLASH_DURATION);
        };

        setCachedHealth(health);
        
    }, [health, cachedHealth, colour, setColour]);

    return {isFrozen, colour};
}