const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: (
        <svg className="w-8 h-8 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Upload Resume",
      description: "Simply drag and drop your PDF resume or browse to upload it securely.",
    },
    {
      number: 2,
      icon: (
        <svg className="w-8 h-8 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Analyzes Your Resume",
      description: "Our advanced AI evaluates your resume for ATS compatibility, keywords, grammar, and formatting.",
    },
    {
      number: 3,
      icon: (
        <svg className="w-8 h-8 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Get a Detailed Improvement Report",
      description: "Receive a detailed analysis report with scores, actionable insights, and improvement suggestions.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Scanalyze Works
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Get comprehensive resume feedback in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="how-it-works-card group animate-fade-in-up h-full flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="step-icon mb-6">
                  <div className="w-14 h-14 bg-[#0261fa]/10 dark:bg-[#0261fa]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0261fa]/15 transition-all duration-300 group-hover:rotate-3">
                    <div className="w-7 h-7">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#0261fa] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-scale-in" style={{ animationDelay: `${index * 150 + 300}ms` }}>
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

