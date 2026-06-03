import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = score / 100;
    
    const getStrokeColor = () => {
        if (score > 69) return "#22c55e";
        if (score > 49) return "#eab308";
        return "#ef4444";
    };

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-20">
                {/* Glowing blue accent ring */}
                <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl -z-10"></div>
                
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    {/* Background arc */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />

                    {/* Blue accent ring */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        className="transition-all duration-500"
                        opacity="0.3"
                    />

                    {/* Foreground arc */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke={getStrokeColor()}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        className="transition-all duration-500"
                        style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-black text-white">{score}</div>
                    <div className="text-sm text-gray-400 font-medium">/100</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;
