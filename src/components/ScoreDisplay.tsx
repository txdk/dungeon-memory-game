interface ScoreDisplayProps {
    score: number;
}

export default function ScoreDisplay({ score }: Readonly<ScoreDisplayProps>) {
    return (
        <p className="font-customFont text-green-500 text-left m-2">SCORE: {score}</p>
    )
}