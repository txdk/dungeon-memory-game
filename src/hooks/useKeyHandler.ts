import { useCallback, useEffect } from "react";

/**
 * Custom hook to listen for specified key inputs to invoke a function
 * provided a specified condition is satisifed
 */
export const useKeyHandler = (handlerFunction: () => void, keyCodes: string[], activeCondition?: boolean) => {

    // Add keyboard input to proceed
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            if ((activeCondition ?? true) && (keyCodes.some((key) => key === e.code))) {
                handlerFunction();
            }
        }, [activeCondition, keyCodes, handlerFunction]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
};