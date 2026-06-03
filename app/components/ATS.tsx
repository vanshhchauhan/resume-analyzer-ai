interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Determine colors based on score
  const bgColor = score > 69
    ? 'bg-badge-green'
    : score > 49
      ? 'bg-badge-yellow'
      : 'bg-badge-red';

  const textColor = score > 69
    ? 'text-badge-green-text'
    : score > 49
      ? 'text-badge-yellow-text'
      : 'text-badge-red-text';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">ATS Score</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-6xl font-black text-white">{score}</span>
            <span className="text-xl text-gray-400">/100</span>
          </div>
        </div>
        <div className={`w-20 h-20 rounded-2xl ${bgColor} flex items-center justify-center shadow-lg border-2 border-white/10`}>
          <span className={`text-3xl font-black ${textColor}`}>{score}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-3">{subtitle}</h3>
        <p className="text-base text-gray-400 mb-8 leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:bg-gray-800/60 transition-all duration-300">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                suggestion.type === "good" ? "bg-green-500/20" : "bg-yellow-500/20"
              }`}>
                {suggestion.type === "good" ? (
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-base text-gray-200 flex-1 leading-relaxed">
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ATS
