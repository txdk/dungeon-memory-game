import classNames from "classnames";
import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    className?: string;
    handleClick(event: React.MouseEvent<HTMLElement>): void;
}

export default function Button( { children, className, handleClick }: Readonly<ButtonProps>) {
    return (
        <button 
            type="button" 
            className={classNames(className, "text-green-500 hover:text-white font-customFont p-4 bg-neutral-700 hover:bg-yellow-600 rounded-3xl active:translate-y-1")}
            onClick={handleClick}
            >
                {children}
        </button>
    )
}