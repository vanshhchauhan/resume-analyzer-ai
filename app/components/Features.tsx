const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-7 h-7 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "ATS Score Breakdown",
      description: "Get detailed ATS compatibility scores with category-wise breakdowns to understand your resume's performance.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      title: "Keyword Match Analysis",
      description: "Identify missing keywords and see how well your resume matches job descriptions for better optimization.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Formatting & Grammar Insights",
      description: "Receive professional feedback on formatting consistency, grammar errors, and style improvements.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Actionable Suggestions",
      description: "Get specific, actionable recommendations tailored to your resume to maximize your job application success.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Resume Rewrite Assistant",
      description: "Leverage AI to rewrite and rephrase sections of your resume for clarity, impact, and keyword density.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0261fa] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.553 23.553 0 0112 15c-1.685 0-3.31-.276-4.853-.745m9.623-2.415a1.125 1.125 0 00-.823-.435h-6.597a1.125 1.125 0 00-.823.435m9.623-2.415c.32-.21.597-.478.823-.795m-9.623 2.415c-.32-.21-.597-.478-.823-.795M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Job Role Matching",
      description: "See how well your resume matches specific job roles and receive targeted optimization recommendations.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Core Features
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Comprehensive analysis tools to help you create the perfect resume
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card animate-fade-in-up h-full"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="feature-icon mb-5 transition-transform duration-300 hover:rotate-3">
                  <div className="w-14 h-14 bg-[#0261fa]/10 dark:bg-[#0261fa]/20 rounded-xl flex items-center justify-center shadow-sm">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

