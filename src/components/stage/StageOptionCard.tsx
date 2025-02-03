import { useMediaQuery } from "react-responsive";
import { GameInput } from "@/constants/GameConstants";
import { Monster } from "@/types/Monster";
import InputIcon from "@/components/generic/InputIcon";
import { v4 as uuidv4} from 'uuid';
import { GiHearts } from "react-icons/gi";
import { Rewards } from "@/types/Stage";
import { useContext } from "react";
import GameContext from "@/contexts/GameContext";
import OptionCard from "@/components/generic/OptionCard";
import useSound from "use-sound";
import { COIN_SOUND, SFX_VOLUME } from "@/constants/AudioConstants";

interface StageOptionCardProps {
    monsterList: Monster[];
    rewards: Rewards;
};

export default function StageOptionCard({ monsterList, rewards }: Readonly<StageOptionCardProps>) {

    const { startNewStage } = useContext(GameContext);
    const [play] = useSound(COIN_SOUND, {volume: SFX_VOLUME});
    const handleStartStage = () => {
        play();
        startNewStage({monsterList: monsterList, rewards: rewards});
    };

    const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
    const iconSize = isTabletOrMobile? 12: 17;

    // Display health rewards
    const renderHealth = () => {
        return (
            rewards.health &&
            <div className="flex">
                <p className="mr-1">{`Restore ${rewards.health} `}</p>
                <GiHearts size={iconSize} />
            </div>
        );
    };

    // Display gold rewards
    const renderGold = () => {
        return (
            rewards.gold &&
            <p className="flex">+{rewards.gold} GOLD</p>
        );
    };

    // Display hint rewards
    const renderHints = () => {
        return (
          rewards.hints &&
          <p className="flex">+{rewards.hints} hint{rewards.hints > 1 && "s"}</p>  
        );
    };

    // Display all rewards
    const renderRewards = () => {
        return (
            <ul className="ml-1">
                {
                    (rewards.gold === undefined && rewards.health === undefined && rewards.hints === undefined)?
                    <p>NONE</p>:
                    <>
                        <ul>{renderHealth()}</ul>
                        <ul>{renderGold()}</ul>
                        <ul>{renderHints()}</ul>
                    </>
                }
            </ul>
        );
    };

    return (
        <OptionCard handleSelect={handleStartStage}>
            <p className="text-xs md:text-base py-2">Monsters ahead:</p>
            <ul className="ml-1 md:ml-2">
                {
                    monsterList.map((monster: Monster) => {
                        return (
                            <li key={monster.id} className="md:flex mb-1 text-[8px] md:text-xs">
                                {monster.name}:{" "}
                                <span className="flex">
                                    {monster.defeatSequence.map((input: GameInput) => {
                                        return <InputIcon key={uuidv4()} input={input} size={iconSize} />;
                                    })}
                                </span>
                            </li>
                        );
                    })
                }
            </ul>
            <p className="text-xs md:text-base py-2">Rewards:</p>
            <div className="flex text-[8px] md:text-xs ml-1">
                {renderRewards()}
            </div>
        </OptionCard>
    );
};