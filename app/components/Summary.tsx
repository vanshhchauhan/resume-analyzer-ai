import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    return (
        <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/60 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-default">
            <div className="flex flex-row items-center justify-between">
                <p className="text-base font-semibold text-gray-200">{title}</p>
                <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">{score}</span>
                        <span className="text-sm text-gray-400">/100</span>
                    </div>
                    <ScoreBadge score={score} />
                </div>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-10 shadow-2xl">
            {/* Overall Score Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 pb-10 border-b border-gray-700/50">
                <div className="relative">
                    <ScoreGauge score={feedback.overallScore} />
                    {/* Glowing ring effect */}
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10"></div>
                </div>

                <div className="flex flex-col gap-2 text-center md:text-left flex-1">
                    <h2 className="text-3xl md:text-4xl font-black text-white">Overall Score</h2>
                    <p className="text-base text-gray-400">
                        Calculated based on comprehensive analysis across all categories below.
                    </p>
                </div>
            </div>

            {/* Category Cards */}
            <div className="space-y-4">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
