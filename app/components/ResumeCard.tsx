import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card group">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {companyName && <h3 className="text-lg font-bold text-gray-900 dark:text-white break-words">{companyName}</h3>}
                    {jobTitle && <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 break-words">{jobTitle}</p>}
                    {!companyName && !jobTitle && <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resume</h3>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm">
                    <img
                        src={resumeUrl}
                        alt="resume"
                        className="w-full h-[320px] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
