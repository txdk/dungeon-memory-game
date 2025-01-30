import { APP_COLOURS } from "@/constants/AppConstants";
import classNames from "classnames";
import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    className?: string;
    handleClick(event: React.MouseEvent<HTMLElement>): void;
    disabled?: boolean;
}

export default function Button( { children, className, disabled, handleClick }: Readonly<ButtonProps>) {
    return (
        <button 
            type="button" 
            className={classNames(
                className, 
                `${APP_COLOURS.PRIMARY}
                hover:text-white 
                font-customFont 
                p-4 
                bg-neutral-700 
                hover:bg-yellow-600 
                rounded-3xl 
                active:translate-y-1 
                disabled:opacity-50
                disabled:text-gray-300
                disabled:hover:bg-neutral-700
                disabled:hover:text-gray-300
                disabled:active:translate-y-0`
            )}
            onClick={handleClick}
            disabled={disabled ?? false}
            >
                {children}
        </button>
    )
}