import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Scanalyze helped me land my dream job! The ATS insights were a game-changer.",
      author: "Jane Doe",
      role: "Software Engineer",
      initials: "JD",
    },
    {
      quote: "The grammar checks and formatting suggestions made my resume look incredibly professional.",
      author: "Alex Smith",
      role: "Marketing Manager",
      initials: "AS",
    },
    {
      quote: "Highly recommend Scanalyze! It's like having a personal career coach for your resume.",
      author: "Emily White",
      role: "Product Designer",
      initials: "EM",
    },
    {
      quote: "The keyword analysis feature helped me optimize my resume for multiple job applications.",
      author: "Michael Chen",
      role: "Data Scientist",
      initials: "MC",
    },
    {
      quote: "I saw a 40% increase in interview callbacks after using Scanalyze's suggestions.",
      author: "Sarah Johnson",
      role: "UX Designer",
      initials: "SJ",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Job Seekers Worldwide
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Hear what our users have to say about Scanalyze.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="card p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-6 italic font-medium leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold text-sm shadow-sm">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-base">{testimonial.author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#0261fa] w-10 shadow-sm"
                    : "bg-gray-300 dark:bg-gray-600 w-2.5"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* User Ratings & Company Logos */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-300">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">4.9/5</span>
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 animate-scale-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-sm">(Based on 1,200+ reviews)</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-8">
            Join thousands of successful job seekers.
          </p>
          {/* Placeholder Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {["Google", "Microsoft", "Amazon", "Netflix", "Apple"].map((company, idx) => (
              <div
                key={idx}
                className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 hover:scale-110 hover:opacity-100 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

