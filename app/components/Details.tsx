import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
      <div
          className={cn(
              "score-badge",
              score > 69
                  ? "bg-badge-green text-badge-green-text"
                  : score > 39
                      ? "bg-badge-yellow text-badge-yellow-text"
                      : "bg-badge-red text-badge-red-text"
          )}
      >
        {score}/100
      </div>
  );
};

const CategoryHeader = ({
                          title,
                          categoryScore,
                        }: {
  title: string;
  categoryScore: number;
}) => {
  return (
      <div className="flex flex-row gap-3 items-center justify-between w-full">
        <p className="text-lg font-bold text-white">{title}</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-white">{categoryScore}</span>
          <span className="text-sm text-gray-400">/100</span>
          <ScoreBadge score={categoryScore} />
        </div>
      </div>
  );
};

const CategoryContent = ({
                           tips,
                         }: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
            <div
                key={index}
                className={cn(
                    "flex flex-col gap-3 rounded-xl p-5 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
                    tip.type === "good"
                        ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/15"
                        : "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/15"
                )}
            >
              <div className="flex flex-row gap-4 items-start">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  tip.type === "good" ? "bg-green-500/20" : "bg-yellow-500/20"
                }`}>
                  {tip.type === "good" ? (
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-base font-semibold mb-2 ${
                    tip.type === "good" ? "text-green-300" : "text-yellow-300"
                  }`}>
                    {tip.tip}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {tip.explanation}
                  </p>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full">
        <Accordion className="border border-gray-700/50 rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-xl">
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style" className="bg-gray-800/50 hover:bg-gray-800/70 border-b border-gray-700/50">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style" className="bg-gray-800/30">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content" className="bg-gray-800/50 hover:bg-gray-800/70 border-b border-gray-700/50">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content" className="bg-gray-800/30">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure" className="bg-gray-800/50 hover:bg-gray-800/70 border-b border-gray-700/50">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure" className="bg-gray-800/30">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills" className="bg-gray-800/50 hover:bg-gray-800/70">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills" className="bg-gray-800/30">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;
