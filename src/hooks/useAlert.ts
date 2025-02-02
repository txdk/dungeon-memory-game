import { useEffect, useState } from "react"
import { ALERT_FLASH_DURATION, APP_COLOURS } from "@/constants/AppConstants"
import { INITIAL_MAX_HEALTH } from "@/constants/GameConstants";
import useSound from "use-sound";
import { HURT_SOUND } from "@/constants/AudioConstants";

/**
 * Custom hook to temporarily set colours to an alert tone and freeze inputs when damage is taken
 */
export const useAlert = (health: number) => {
    const [cachedHealth, setCachedHealth] = useState(INITIAL_MAX_HEALTH);
    const [isFrozen, setIsFrozen] = useState(false);
    const [colour, setColour] = useState(APP_COLOURS.PRIMARY);
    const [play] = useSound(HURT_SOUND, {volume: 0.5});

    useEffect(() => {
        if (health < cachedHealth && health > 0) {
            setIsFrozen(true);
            setColour(APP_COLOURS.ALERT);
            play();
                
            setTimeout(() => {
                setIsFrozen(false);
                setColour(APP_COLOURS.PRIMARY);
            }, ALERT_FLASH_DURATION);
        };

        setCachedHealth(health);
        
    }, [health, cachedHealth, colour, setColour, play]);

    return {isFrozen, colour};
}