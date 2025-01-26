import { useCallback, useEffect } from "react";

/**
 * Custom hook to listen for "enter" and "spacebar" key inputs to invoke a function
 * provided a specified condition is satisifed
 */
export const useKeyHandler = (handlerFunction: () => void, activeCondition?: boolean) => {

    // Add keyboard input to proceed
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            if ((activeCondition ?? true) && (e.code === "Space" || e.code === "Enter")) {
                handlerFunction();
            }
        }, [activeCondition, handlerFunction]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
};