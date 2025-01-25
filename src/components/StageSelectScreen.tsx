import { v4 as uuidv4} from 'uuid';
import AnimatedText from './generic/AnimatedText';
import OptionCard from './OptionCard';
import { useContext } from 'react';
import GameContext from '../contexts/GameContext';

export default function StageSelectScreen() {

    const { state } = useContext(GameContext);
    const pathOptions = state.currentStage!.generatePathOptions();

    return (
        <div className="font-customFont text-green-500 text-center">
            <div className="text-lg md:text-xl">
                <AnimatedText
                    id={uuidv4()}
                    text={"Choose your path..."}
                    delay={75}
                />
            </div>
            <div className='flex justify-center mt-3 space-x-3 md:space-x-5'>
                {
                    pathOptions.map((option) => {
                        return <OptionCard key={uuidv4()} monsterList={option.monsterList} rewards={option.rewards} />
                    })
                }
            </div>
        </div>
    );
}