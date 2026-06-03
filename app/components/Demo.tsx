const Demo = () => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See the Difference: Before & After
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Transform your resume from good to great with AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Before Card */}
          <div className="card p-8 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-xl animate-slide-in-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Before Scanalyze</h3>
              <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold dark:bg-red-900/30 dark:text-red-300 animate-scale-in animation-delay-300 shadow-sm">
                Score: 45/100
              </span>
            </div>
            <img
              src="/images/resume_02.png"
              alt="Before Resume"
              className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-6 transition-opacity duration-500"
            />
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              {[
                "Generic summary, lacks impact.",
                "Missing key industry keywords.",
                "Inconsistent formatting and bullet points.",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 animate-fade-in-up"
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Card */}
          <div className="card p-8 bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] dark:from-gray-700 dark:to-gray-800 border-blue-200 dark:border-blue-700 shadow-xl animate-slide-in-right transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">After Scanalyze</h3>
              <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold dark:bg-green-900/30 dark:text-green-300 animate-scale-in animation-delay-500 shadow-sm">
                Score: 92/100
              </span>
            </div>
            <img
              src="/images/resume_01.png"
              alt="After Resume"
              className="w-full h-auto rounded-lg border border-blue-200 dark:border-blue-700 mb-6 transition-opacity duration-500"
            />
            <ul className="space-y-3 text-gray-800 dark:text-gray-200 text-sm">
              {[
                "Compelling summary with achievements.",
                "Optimized with relevant keywords.",
                "Clean, consistent, and professional layout.",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 animate-fade-in-up"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;

