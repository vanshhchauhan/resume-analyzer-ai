import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import HowItWorks from "~/components/HowItWorks";
import Features from "~/components/Features";
import Demo from "~/components/Demo";
import Testimonials from "~/components/Testimonials";
import Pricing from "~/components/Pricing";
import FAQ from "~/components/FAQ";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Scanalyze" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return <main>
    <Navbar />
    <Hero />
    <HowItWorks />
    <Features />
    <Demo />
    <Testimonials />
    <Pricing />
    <FAQ />

    {/* Resume Dashboard Section */}
    <section className="main-section">
      <div className="page-heading">
        <h1>Resume Dashboard</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2 className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">Upload your first resume to get AI-powered feedback and ATS scores.</h2>
        ): (
          <h2 className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">Review your resumes and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading resumes...</p>
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No resumes yet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Get started by uploading your first resume</p>
            </div>
            <Link to="/upload" className="primary-button w-fit px-8">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}
