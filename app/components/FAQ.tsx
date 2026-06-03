import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "./Accordion";

const FAQ = () => {
  const faqs = [
    {
      id: "faq-1",
      question: "What is Scanalyze?",
      answer: "Scanalyze is an AI-powered resume analyzer that provides instant feedback on your resume's ATS compatibility, keyword optimization, grammar, and formatting. It helps you improve your resume to increase your chances of landing interviews.",
    },
    {
      id: "faq-2",
      question: "How accurate is the AI feedback?",
      answer: "Our AI models are trained on thousands of successful resumes and job descriptions to provide highly accurate and relevant feedback. While AI is powerful, we always recommend a final human review.",
    },
    {
      id: "faq-3",
      question: "Is my resume data secure?",
      answer: "Yes, your privacy and data security are our top priorities. All uploaded resumes are encrypted and automatically deleted from our servers after 30 minutes of analysis. We do not share your data with third parties.",
    },
    {
      id: "faq-4",
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a Free tier that allows you to analyze one resume per month with basic ATS scoring and limited keyword analysis. This is a great way to try out Scanalyze before committing to a paid plan.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Find answers to the most common questions about Scanalyze.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id} id={faq.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <AccordionHeader
                  itemId={faq.id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                </AccordionHeader>
                <AccordionContent itemId={faq.id} className="bg-white dark:bg-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

