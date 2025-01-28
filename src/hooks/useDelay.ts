import { useEffect, useState } from "react";
import { STAGE_TRANSITION_DELAY } from "@/constants/AppConstants";

/**
 * Custom hook to set a boolean to true after an initial delay.
 * Resets if a new id is provided
 * @param id 
 */
export const useDelay = (id: string) => {
    const [cachedId, setCachedId] = useState<string>("");
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        // Reset if id is updated
        if (id !== cachedId) {
            setState(false);
            setCachedId(id);
        }

        // Delay transition of state to true
        const timeout = setTimeout(() => {
            setState(true);
        }, STAGE_TRANSITION_DELAY);

        return () => clearTimeout(timeout);
    }, [id, cachedId]);

    return state;
};