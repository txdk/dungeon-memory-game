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

interface StageOptionCardProps {
    monsterList: Monster[];
    rewards: Rewards;
};

export default function StageOptionCard({ monsterList, rewards }: Readonly<StageOptionCardProps>) {

    const { startNewStage } = useContext(GameContext);

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

    // Display score rewards
    const renderScore = () => {
        return (
            rewards.score &&
            <p className="flex">SCORE +{rewards.score}</p>
        );
    };

    // Display all rewards
    const renderRewards = () => {
        return (
            <ul className="ml-1">
                {
                    (rewards.health === 0 && rewards.score === 0)?
                    <p>NONE</p>:
                    <>
                        <ul>{renderHealth()}</ul>
                        <ul>{renderScore()}</ul>
                    </>
                }
            </ul>
        );
    };

    return (
        <OptionCard handleSelect={() => startNewStage({monsterList: monsterList, rewards: rewards})}>
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