import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useUserProfile } from "~/lib/user";
import Navbar from "~/components/Navbar";

export const meta = () => [
    { title: "Scanalyze | Activity" },
    { name: "description", content: "View your activity history" },
];

const Activity = () => {
    const { auth, isLoading } = usePuterStore();
    const { getActivityLogs } = useUserProfile();
    const navigate = useNavigate();
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/activity");
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    useEffect(() => {
        const loadActivities = async () => {
            if (!auth.isAuthenticated) return;
            setLoading(true);
            const logs = await getActivityLogs();
            setActivities(logs);
            setLoading(false);
        };
        loadActivities();
    }, [auth.isAuthenticated]);

    const getActivityIcon = (type: ActivityLog["type"]) => {
        switch (type) {
            case "resume_uploaded":
                return (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                );
            case "resume_analyzed":
                return (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "profile_updated":
                return (
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case "settings_updated":
                return (
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        return "Just now";
    };

    if (loading) {
        return (
            <main>
                <Navbar />
                <section className="main-section">
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <section className="main-section">
                <div className="max-w-4xl w-full">
                    <div className="mb-8">
                        <h1 className="text-4xl font-semibold text-gray-900 mb-2">Activity History</h1>
                        <p className="text-gray-600">View your recent activity and actions</p>
                    </div>

                    {activities.length === 0 ? (
                        <div className="card">
                            <div className="text-center py-12">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-600">No activity yet</p>
                                <p className="text-sm text-gray-500 mt-2">Your activity will appear here as you use the app</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="card">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                                            <p className="text-xs text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                                            {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                                                <div className="mt-2 text-xs text-gray-600">
                                                    {activity.metadata.resumeId && (
                                                        <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                                                            Resume ID: {activity.metadata.resumeId.substring(0, 8)}...
                                                        </span>
                                                    )}
                                                    {activity.metadata.score && (
                                                        <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                                                            Score: {activity.metadata.score}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Activity;

