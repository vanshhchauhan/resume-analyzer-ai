const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 35;
    const stroke = 5;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);
    
    const getStrokeColor = () => {
        if (score > 69) return "#22c55e";
        if (score > 49) return "#eab308";
        return "#ef4444";
    };

    return (
        <div className="relative w-20 h-20">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    fill="transparent"
                    className="dark:stroke-gray-700"
                />
                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke={getStrokeColor()}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
            </svg>

            {/* Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-base text-gray-900 dark:text-white">{score}</span>
            </div>
        </div>
    );
};

export default ScoreCircle;
