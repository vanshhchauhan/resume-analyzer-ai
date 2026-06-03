import { Link } from "react-router";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      description: "Perfect for quick checks.",
      price: "$0",
      period: "/month",
      features: [
        { text: "1 Resume Analysis/month", included: true },
        { text: "Basic ATS Score", included: true },
        { text: "Limited Keyword Analysis", included: true },
        { text: "No Grammar & Formatting", included: false },
        { text: "No Rewrite Assistant", included: false },
      ],
      cta: "Get Started Free",
      ctaLink: "/upload",
      popular: false,
    },
    {
      name: "Pro",
      description: "For serious job seekers.",
      price: "$9",
      period: "/month",
      features: [
        { text: "Unlimited Resume Analysis", included: true },
        { text: "Advanced ATS Score & Breakdown", included: true },
        { text: "Full Keyword Match Analysis", included: true },
        { text: "Grammar & Formatting Insights", included: true },
        { text: "Resume Rewrite Assistant", included: true },
      ],
      cta: "Choose Pro",
      ctaLink: "/upload",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for teams.",
      price: "Custom",
      period: "",
      features: [
        { text: "All Pro Features", included: true },
        { text: "Team Management", included: true },
        { text: "API access", included: true },
        { text: "Dedicated support", included: true },
      ],
      cta: "Contact Sales",
      ctaLink: "#contact",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Choose the plan that's right for you and start optimizing your resume today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 ${
                plan.popular
                  ? "bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] dark:from-gray-700 dark:to-gray-800 border-blue-200 dark:border-blue-700 shadow-lg ring-2 ring-blue-200 dark:ring-blue-700"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg"
              } animate-fade-in-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#0261fa] text-white text-xs font-bold px-3 py-1 rounded-bl-lg animate-scale-in animation-delay-300">
                  Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
              <p className={`mb-6 ${plan.popular ? "text-gray-700 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"}`}>
                {plan.description}
              </p>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {plan.price}
                {plan.period && (
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 text-sm flex-1 mb-8">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2 animate-fade-in-up ${
                      plan.popular
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-gray-700 dark:text-gray-300"
                    } ${!feature.included ? "opacity-50" : ""}`}
                    style={{ animationDelay: `${400 + idx * 50}ms` }}
                  >
                    {feature.included ? (
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? "text-green-600" : "text-green-500"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
                {plan.ctaLink.startsWith("/") ? (
                  <Link
                    to={plan.ctaLink}
                    className={`${
                      plan.popular ? "primary-button" : "secondary-button"
                    } w-full text-center justify-center`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <a
                    href={plan.ctaLink}
                    className={`${
                      plan.popular ? "primary-button" : "secondary-button"
                    } w-full text-center justify-center`}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

