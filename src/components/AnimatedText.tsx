import classNames from "classnames";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
    id: string;
    text: string;
    delay: number; // Delay between subsequent letters in milliseconds
    className?: string;
}

export default function AnimatedText({ id, text, delay, className }: Readonly<AnimatedTextProps>) {
    const [cachedId, setCachedId] = useState<string>("");
    const [currentText, setCurrentText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Play animation
    useEffect(() => {
        if (id !== cachedId) {
            setCachedId(id);
            setCurrentText("");
            setCurrentIndex(0);
        }

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [id, cachedId, currentIndex, delay, text]);

    return (
        <span className={classNames(className, "font-customFont text-green-500")}>
            {currentText}
        </span>
    );
}