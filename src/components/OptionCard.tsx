import { useMediaQuery } from "react-responsive";
import { GameInput } from "../constants/GameConstants";
import { Monster } from "../core/monsters/Monsters";
import Button from "./generic/Button";
import InputIcon from "./generic/InputIcon";
import { v4 as uuidv4} from 'uuid';
import { GiHearts } from "react-icons/gi";
import { Rewards } from "../core/Stages";
import { useContext } from "react";
import GameContext from "../contexts/GameContext";

interface OptionCardProps {
    monsterList: Monster[];
    rewards: Rewards;
}

export default function OptionCard({ monsterList, rewards }: Readonly<OptionCardProps>) {

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
        <div className="border rounded-2xl w-[30%] h-[300px] md:h-[250px] bg-slate-900">
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
            <Button 
                className="text-xs absolute py-1 top-[88%] md:top-[85%] ml-[-50px]"
                handleClick={() => startNewStage({monsterList: monsterList, rewards: rewards})}
            >
                SELECT
            </Button>
        </div>
    );
}