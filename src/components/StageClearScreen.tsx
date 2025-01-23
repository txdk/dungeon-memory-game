import { Stage } from "../core/Stages";
import AnimatedText from "./generic/AnimatedText";
import SlotCounter from "react-slot-counter";

interface StageClearScreenProps {
    stage: Stage;
}

export default function StageClearScreen({ stage }: Readonly<StageClearScreenProps>) {
    return (
        <div className="font-customFont text-green-500 text-center mt-[100px]">
            <div className="text-3xl md:text-4xl">
                <AnimatedText
                    id={stage.id}
                    text={"Stage clear!"}
                    delay={75}
                />
            </div>
            <p className="text-sm md:text-base mt-3 md:mt-5">
                You conquered {stage.name.toLowerCase()} and gained{" "}
                <SlotCounter value={stage.scoreReward} />
                {" "}score!
            </p>
        </div>
    );
}