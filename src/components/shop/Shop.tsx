import AnimatedText from "@/components/generic/AnimatedText";
import { v4 as uuidv4} from 'uuid';
import ItemCard from "@/components/shop/ItemCard";
import { HEALING_POTION } from "@/core/items/HealingPotion";
import { Item } from "@/types/Item";
import { useContext } from "react";
import GameContext from "@/contexts/GameContext";
import { GameStatus } from "@/reducers/GameState";
import Button from "@/components/generic/Button";
import { RxDoubleArrowRight } from "react-icons/rx";
import { ITEM_COST_MULTIPLIERS } from "@/constants/GameConstants";
import { LILLIES_OF_LIFE } from "@/core/items/LilliesOfLife";
import { MAGIC_SCROLL } from "@/core/items/MagicScroll";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import useSound from "use-sound";
import { COIN_SOUND, SELECT_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";

export default function Shop() {

    const { state, buyItem, setGameStatus } = useContext(GameContext);
    const [playCoin] = useSound(COIN_SOUND, {volume: SFX_VOLUME});
    const itemList: Item[] = [MAGIC_SCROLL, HEALING_POTION, LILLIES_OF_LIFE];

    const costMultiplier = ITEM_COST_MULTIPLIERS.get(state.currentStage!.number)!;
    const adjustItemCost = (item: Item): Item => {
        return {
            ...item,
            baseCost: item.baseCost * costMultiplier
        };
    };

    const handleBuy = (item: Item) => {
        if (state.gold >= item.baseCost) {
            buyItem(item);
            playCoin();
        };
    };

    const [playProceed] = useSound(SELECT_SOUND, {volume: SFX_VOLUME});
    const handleProceed = () => {
        playProceed();
        setGameStatus(GameStatus.STAGE_SELECT);
    };

    useKeyHandler(handleProceed, ["Space", "Enter"]);

    return (
        <div className="font-customFont text-green-500 text-center">
            <div className="text-lg lg:text-2xl mb-1.5">
                <AnimatedText
                    id={state.currentStage!.id}
                    text={"SHOP"}
                    delay={75}
                />
            </div>
            <p className="text-xs lg:text-sm lg:mb-7">It's dangerous to go alone... buy something!</p>
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-[100px] xl:space-x-[150px]">
                {
                    itemList.map((item) => {
                        return <ItemCard key={uuidv4()} item={adjustItemCost(item)} playerGold={state.gold} handleBuy={handleBuy} />
                    })
                }
            </div>
            <Button
                className="flex relative md:mt-[-16px] lg:mt-1.5 p-0.5 lg:p-1 xl:p-1.5 left-[40%] md:left-[43%] items-center fade-in" 
                handleClick={handleProceed}
            >
                <>
                    <span className="text-xs">Proceed</span>
                    <RxDoubleArrowRight className="ml-2" />
                </>
            </Button>
        </div> 
    );
};