import {usePuterStore} from "~/lib/puter";
import {useUserProfile} from "~/lib/user";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Scanalyze | Auth' },
    { name: 'description', content: 'Sign in to your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const { getProfile } = useUserProfile();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) {
            // Initialize profile if it doesn't exist
            getProfile().then(() => {
                navigate(next);
            });
        }
    }, [auth.isAuthenticated, next])

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <section className="card">
                    <div className="flex flex-col items-center gap-6 text-center mb-8">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome</h1>
                            <h2 className="text-base text-gray-600">Sign in to continue</h2>
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button" disabled>
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Signing in...
                                </span>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        Sign Out
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        Sign In
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth
