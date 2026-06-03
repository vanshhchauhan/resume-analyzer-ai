import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#f0f7ff] via-white to-[#f8fbff] py-16 md:py-24 overflow-hidden dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Abstract AI Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0261fa]/5 rounded-full blur-3xl dark:bg-blue-400/5 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl dark:bg-[#0261fa]/5 animate-float-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0261fa]/3 to-blue-300/3 rounded-full blur-3xl dark:from-blue-500/5 dark:to-blue-700/5 animate-rotate-slow"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* AI Badge */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0261fa]/10 text-[#0261fa] text-xs font-semibold uppercase tracking-wide dark:bg-blue-400/10 dark:text-blue-300 transition-transform duration-200 hover:scale-105 active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered Analysis
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight animate-fade-in-up animation-delay-100 drop-shadow-sm">
            AI-Powered Resume Analysis in{" "}
            <span className="text-[#0261fa] dark:text-blue-400 drop-shadow-sm">Seconds</span>
          </h1>
          
          {/* Subheading with Benefits */}
          <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Get instant ATS scoring, keyword insights, formatting checks, and actionable suggestions to improve your resume.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-300">
            <Link
              to="/upload"
              className="primary-button inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl w-full sm:w-auto transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span>Start Analyzing</span>
            </Link>
            <a
              href="#demo"
              className="secondary-button inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 w-full sm:w-auto transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            >
              View Sample Report
            </a>
          </div>

          {/* Dashboard Mockup */}
          <div className="mt-12 max-w-5xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="relative bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden animate-float">
              <div className="bg-gray-50 dark:bg-gray-800 px-5 py-3.5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-semibold">
                    Resume Analysis Dashboard
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Score Card */}
                  <div className="bg-gradient-to-br from-[#0261fa] to-[#0149d6] rounded-xl p-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold opacity-95">ATS Score</span>
                      <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-4xl font-bold mb-2">85/100</div>
                    <div className="text-sm font-medium opacity-95">Excellent match</div>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:translate-x-1 shadow-sm hover:shadow-md animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                      <div className="w-11 h-11 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Keyword Analysis</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">12/15 keywords found</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:translate-x-1 shadow-sm hover:shadow-md animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                      <div className="w-11 h-11 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Grammar Check</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">3 minor issues found</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:translate-x-1 shadow-sm hover:shadow-md animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                      <div className="w-11 h-11 bg-purple-100 dark:bg-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Formatting</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Professional layout</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

