import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Navbar from "~/components/Navbar";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'Scanalyze | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
            <Navbar />
            
            {/* Back button bar */}
            <div className="sticky top-16 z-40 backdrop-blur-xl bg-gray-900/60 border-b border-gray-800/30">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center h-12">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                {/* Page Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Resume Analysis</h1>
                    <p className="text-lg text-gray-400">Comprehensive feedback and insights for your resume</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Resume Preview */}
                    <div className="lg:col-span-1 lg:sticky lg:top-20 lg:h-[calc(100vh-8rem)]">
                        {imageUrl && resumeUrl && (
                            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">Resume Preview</h3>
                                    <a 
                                        href={resumeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                                    >
                                        <span>Open PDF</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/50">
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <img
                                            src={imageUrl}
                                            className="w-full h-auto object-contain"
                                            title="resume"
                                            alt="Resume preview"
                                        />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Analysis Results */}
                    <div className="lg:col-span-2">
                        {feedback ? (
                            <div className="flex flex-col gap-6 md:gap-8">
                                <Summary feedback={feedback} />
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                <Details feedback={feedback} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                <p className="mt-4 text-sm text-gray-400">Loading feedback...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Resume
