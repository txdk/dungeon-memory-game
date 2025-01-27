import Button from "./Button";
import { ReactNode } from "react";
import classNames from "classnames";

interface OptionCardProps {
    children?: ReactNode;
    className?: string;
    handleSelect: () => void;
};

export default function OptionCard({ children, className, handleSelect }: Readonly<OptionCardProps>) {

    return (
        <div className={classNames(className, "border rounded-2xl w-[30%] h-[300px] md:h-[250px] bg-slate-900")}>
            { children }
            <Button 
                className="text-xs absolute py-1 top-[88%] md:top-[85%] ml-[-50px]"
                handleClick={handleSelect}
            >
                SELECT
            </Button>
        </div>
    );
};