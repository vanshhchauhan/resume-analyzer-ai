import {type FormEvent, useState, useEffect} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useUserProfile} from "~/lib/user";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const { getProfile, logActivity } = useUserProfile();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (auth.isAuthenticated) {
                const userProfile = await getProfile();
                setProfile(userProfile);
            }
        };
        loadProfile();
    }, [auth.isAuthenticated]);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        try {
            setIsProcessing(true);
            setStatusText('Uploading the file...');
            
            const uploadedFile = await fs.upload([file]);
            if(!uploadedFile) {
                setIsProcessing(false);
                setStatusText('Error: Failed to upload file');
                return;
            }

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if(!imageFile || !imageFile.file) {
                setIsProcessing(false);
                setStatusText('Error: Failed to convert PDF to image');
                return;
            }

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if(!uploadedImage) {
                setIsProcessing(false);
                setStatusText('Error: Failed to upload image');
                return;
            }

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const now = Date.now();
            const data: Resume = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: {
                    overallScore: 0,
                    ATS: { score: 0, tips: [] },
                    toneAndStyle: { score: 0, tips: [] },
                    content: { score: 0, tips: [] },
                    structure: { score: 0, tips: [] },
                    skills: { score: 0, tips: [] },
                },
                createdAt: now,
                updatedAt: now,
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            
            await logActivity({
                type: "resume_uploaded",
                description: `Resume uploaded for ${jobTitle} at ${companyName}`,
                metadata: { resumeId: uuid, companyName, jobTitle },
            });

            setStatusText('Analyzing resume with AI...');

            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            );
            
            if (!feedback || !feedback.message) {
                console.error('AI feedback error:', { feedback });
                setIsProcessing(false);
                setStatusText('Error: Failed to analyze resume. The AI service did not respond. Please try again.');
                return;
            }

            console.log('AI feedback received:', { 
                hasMessage: !!feedback.message, 
                contentType: typeof feedback.message.content,
                isArray: Array.isArray(feedback.message.content)
            });

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : Array.isArray(feedback.message.content) && feedback.message.content[0]?.text
                    ? feedback.message.content[0].text
                    : null;

            if (!feedbackText) {
                console.error('Invalid feedback structure:', feedback.message);
                setIsProcessing(false);
                setStatusText('Error: Invalid response from AI. The response format was unexpected. Please try again.');
                return;
            }

            try {
                // Clean the feedback text - remove markdown code blocks if present
                let cleanedText = feedbackText.trim();
                if (cleanedText.startsWith('```json')) {
                    cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
                } else if (cleanedText.startsWith('```')) {
                    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
                }
                
                data.feedback = JSON.parse(cleanedText);
                console.log('Successfully parsed feedback:', data.feedback);
            } catch (parseError) {
                console.error('Failed to parse feedback:', parseError);
                console.error('Feedback text (first 500 chars):', feedbackText.substring(0, 500));
                setIsProcessing(false);
                setStatusText(`Error: Failed to parse analysis results. ${parseError instanceof Error ? parseError.message : 'Invalid JSON format'}. Please try again.`);
                return;
            }

            data.updatedAt = Date.now();
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            
            await logActivity({
                type: "resume_analyzed",
                description: `Resume analyzed for ${jobTitle} at ${companyName}`,
                metadata: { resumeId: uuid, score: data.feedback.overallScore },
            });
            
            setStatusText('Analysis complete, redirecting...');
            setTimeout(() => {
                navigate(`/resume/${uuid}`);
            }, 500);
        } catch (error) {
            console.error('Error during analysis:', error);
            setIsProcessing(false);
            setStatusText(`Error: ${error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'}`);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main>
            <Navbar />

            <section className="main-section">
                <div className="page-heading max-w-2xl">
                    <h1 className="text-gray-900 dark:text-white">Upload Resume</h1>
                    {isProcessing ? (
                        <div className="mt-8">
                            <div className="flex flex-col items-center justify-center py-12 gap-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center max-w-md">{statusText}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-lg text-gray-600 dark:text-gray-300">Get AI-powered feedback and ATS scores for your resume</h2>
                            <form id="upload-form" onSubmit={handleSubmit} className="mt-8">
                                <div className="form-div">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input 
                                        type="text" 
                                        name="company-name" 
                                        placeholder="e.g., Google" 
                                        id="company-name" 
                                        defaultValue={profile?.preferences.defaultCompany || ""}
                                        required
                                    />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input 
                                        type="text" 
                                        name="job-title" 
                                        placeholder="e.g., Senior Software Engineer" 
                                        id="job-title" 
                                        defaultValue={profile?.preferences.defaultJobTitle || ""}
                                        required
                                    />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea 
                                        rows={6} 
                                        name="job-description" 
                                        placeholder="Paste the job description here..." 
                                        id="job-description"
                                        required
                                    />
                                </div>

                                <div className="form-div">
                                    <label htmlFor="uploader">Resume (PDF)</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                <button className="primary-button mt-2" type="submit" disabled={!file}>
                                    Analyze Resume
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
