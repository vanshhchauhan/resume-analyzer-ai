import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useUserProfile } from "~/lib/user";

const ProfileDropdown = () => {
    const { auth } = usePuterStore();
    const { getProfile } = useUserProfile();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (auth.isAuthenticated) {
            getProfile().then(setProfile);
        }
    }, [auth.isAuthenticated]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (!auth.isAuthenticated || !auth.user) {
        return (
            <Link to="/auth" className="primary-button w-fit text-sm px-4 py-2">
                Sign In
            </Link>
        );
    }

    const handleSignOut = async () => {
        await auth.signOut();
        navigate("/");
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800/50 transition-colors"
                aria-label="User menu"
            >
                <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-full flex items-center justify-center shadow-sm ring-2 ring-gray-700">
                        <span className="text-xs font-semibold text-white">
                            {(profile?.fullName || auth.user.username).charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
                <span className="text-sm font-medium text-gray-200 hidden md:block max-w-[120px] truncate">
                    {profile?.fullName || auth.user.username}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#161B22] backdrop-blur-md border border-gray-700/80 rounded-xl shadow-xl py-2 z-50">
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                        </div>
                    </Link>
                    <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </div>
                    </Link>
                    <Link
                        to="/activity"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Activity
                        </div>
                    </Link>
                    <div className="border-t border-gray-700 my-2"></div>
                    <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800/50 hover:text-red-300 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

