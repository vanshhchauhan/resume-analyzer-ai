import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useUserProfile } from "~/lib/user";
import Navbar from "~/components/Navbar";

export const meta = () => [
    { title: "Scanalyze | Settings" },
    { name: "description", content: "Manage your account settings and preferences" },
];

const Settings = () => {
    const { auth, isLoading } = usePuterStore();
    const { getProfile, updatePreferences, exportUserData, deleteAccount, logActivity } = useUserProfile();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/settings");
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    useEffect(() => {
        const loadProfile = async () => {
            if (!auth.isAuthenticated) return;
            setLoading(true);
            const userProfile = await getProfile();
            setProfile(userProfile);
            setLoading(false);
        };
        loadProfile();
    }, [auth.isAuthenticated]);

    const handlePreferencesSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profile) return;

        setSaving(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);
        const preferences: Partial<UserPreferences> = {
            theme: (formData.get("theme") as "light" | "dark" | "system") || "system",
            notifications: {
                email: formData.get("notifications.email") === "on",
                analysisComplete: formData.get("notifications.analysisComplete") === "on",
                weeklyReport: formData.get("notifications.weeklyReport") === "on",
            },
            defaultJobTitle: formData.get("defaultJobTitle") as string || undefined,
            defaultCompany: formData.get("defaultCompany") as string || undefined,
        };

        const success = await updatePreferences(preferences);
        if (success) {
            const updatedProfile = await getProfile();
            setProfile(updatedProfile);
            setSuccess("Preferences updated successfully!");
            await logActivity({
                type: "settings_updated",
                description: "User preferences updated",
            });
            setTimeout(() => setSuccess(null), 3000);
        } else {
            setError("Failed to update preferences. Please try again.");
        }
        setSaving(false);
    };

    const handleExportData = async () => {
        setExporting(true);
        try {
            const data = await exportUserData();
            if (data) {
                const blob = new Blob([data], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `scanalyze-export-${new Date().toISOString().split("T")[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setSuccess("Data exported successfully!");
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError("Failed to export data. Please try again.");
            }
        } catch (error) {
            console.error("Error exporting data:", error);
            setError("Failed to export data. Please try again.");
        }
        setExporting(false);
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        setError(null);
        try {
            const success = await deleteAccount();
            if (success) {
                navigate("/");
            } else {
                setError("Failed to delete account. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            setError("Failed to delete account. Please try again.");
        }
        setDeleting(false);
    };

    if (loading || !profile) {
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
                <div className="max-w-3xl w-full">
                    <div className="mb-8">
                        <h1 className="text-4xl font-semibold text-gray-900 mb-2">Settings</h1>
                        <p className="text-gray-600">Manage your preferences and account settings</p>
                    </div>

                    {error && (
                        <div className="card bg-red-50 border-red-200 mb-6">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="card bg-green-50 border-green-200 mb-6">
                            <p className="text-sm text-green-800">{success}</p>
                        </div>
                    )}

                    {/* Preferences */}
                    <div className="card mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
                        <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                            <div className="form-div">
                                <label htmlFor="theme">Theme</label>
                                <select
                                    id="theme"
                                    name="theme"
                                    defaultValue={profile.preferences.theme}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
                                >
                                    <option value="system">System</option>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>

                            <div className="form-div">
                                <label className="text-sm font-medium text-gray-700 mb-3 block">Notifications</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="notifications.email"
                                            defaultChecked={profile.preferences.notifications.email}
                                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                                        />
                                        <span className="text-sm text-gray-700">Email notifications</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="notifications.analysisComplete"
                                            defaultChecked={profile.preferences.notifications.analysisComplete}
                                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                                        />
                                        <span className="text-sm text-gray-700">Analysis complete notifications</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="notifications.weeklyReport"
                                            defaultChecked={profile.preferences.notifications.weeklyReport}
                                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                                        />
                                        <span className="text-sm text-gray-700">Weekly report</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-div">
                                <label htmlFor="defaultJobTitle">Default Job Title</label>
                                <input
                                    type="text"
                                    id="defaultJobTitle"
                                    name="defaultJobTitle"
                                    defaultValue={profile.preferences.defaultJobTitle || ""}
                                    placeholder="e.g., Software Engineer"
                                />
                                <p className="text-xs text-gray-500 mt-1">This will be pre-filled when uploading resumes</p>
                            </div>

                            <div className="form-div">
                                <label htmlFor="defaultCompany">Default Company</label>
                                <input
                                    type="text"
                                    id="defaultCompany"
                                    name="defaultCompany"
                                    defaultValue={profile.preferences.defaultCompany || ""}
                                    placeholder="e.g., Google"
                                />
                                <p className="text-xs text-gray-500 mt-1">This will be pre-filled when uploading resumes</p>
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                <button
                                    type="submit"
                                    className="primary-button w-fit"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Preferences"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Data Management */}
                    <div className="card mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Export Data</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Download all your data including resumes, profile, and activity logs in JSON format.
                                </p>
                                <button
                                    onClick={handleExportData}
                                    disabled={exporting}
                                    className="secondary-button w-fit"
                                >
                                    {exporting ? "Exporting..." : "Export Data"}
                                </button>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Activity History</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    View your recent activity and actions in the app.
                                </p>
                                <Link
                                    to="/activity"
                                    className="secondary-button w-fit"
                                >
                                    View Activity
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Account Management */}
                    <div className="card mb-6 border-red-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-red-600">Danger Zone</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Delete Account</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Permanently delete your account and all associated data. This action cannot be undone.
                                </p>
                                {!showDeleteConfirm ? (
                                    <button
                                        onClick={() => setShowDeleteConfirm(true)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-sm text-red-800 mb-2">
                                                Are you sure you want to delete your account? This action cannot be undone.
                                            </p>
                                            <p className="text-sm text-red-700">
                                                All your resumes, profile data, and activity logs will be permanently deleted.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={handleDeleteAccount}
                                                disabled={deleting}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                            >
                                                {deleting ? "Deleting..." : "Yes, Delete Account"}
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="secondary-button"
                                                disabled={deleting}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Settings;

