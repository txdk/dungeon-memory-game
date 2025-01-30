import { APP_COLOURS, ICON_SIZE } from "@/constants/AppConstants";
import Button from "@/components/generic/Button";
import { Item } from "@/types/Item";
import classNames from "classnames";

interface ItemCardProps {
    item: Item;
    playerGold: number; 
    handleBuy: (item: Item) => void;
};

export default function ItemCard({ item, playerGold, handleBuy }: Readonly<ItemCardProps>) {

    const canAfford: boolean = playerGold >= item.baseCost;
    const colour: APP_COLOURS = canAfford? APP_COLOURS.PRIMARY: APP_COLOURS.DISABLED;

    return (
        <div className="flex flex-row lg:flex-col space-x-2.5 lg:space-x-0 lg:space-y-1.5 place-items-center p-1">
            <div className={classNames(colour, "border rounded-2xl bg-slate-900 p-3")}>
                <item.displayIcon size={ICON_SIZE} />
            </div>
            <Button 
                className="text-xs p-[5px]"
                handleClick={() => handleBuy(item)}
                disabled={!canAfford}
            >
                BUY
            </Button>
            <p className={classNames(colour, "text-xs lg:text-sm lg:self-start")}>{item.name}</p>
            <p className={classNames(colour, "text-[9px] lg:text-xs")}>{item.baseCost} gold</p>
            <p className={classNames(colour, "text-[7px] lg:text-[9px]")}>{item.description}</p>
        </div>
    );
};