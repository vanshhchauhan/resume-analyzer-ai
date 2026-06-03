import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useUserProfile } from "~/lib/user";
import Navbar from "~/components/Navbar";

export const meta = () => [
    { title: "Scanalyze | Profile" },
    { name: "description", content: "View and edit your profile" },
];

const Profile = () => {
    const { auth, isLoading } = usePuterStore();
    const { getProfile, updateProfile, logActivity } = useUserProfile();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/profile");
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profile) return;

        setSaving(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const updates: Partial<UserProfile> = {
            fullName: formData.get("fullName") as string || undefined,
            email: formData.get("email") as string || undefined,
            bio: formData.get("bio") as string || undefined,
            location: formData.get("location") as string || undefined,
            website: formData.get("website") as string || undefined,
        };

        const success = await updateProfile(updates);
        if (success) {
            const updatedProfile = await getProfile();
            setProfile(updatedProfile);
            setSuccess(true);
            await logActivity({
                type: "profile_updated",
                description: "Profile information updated",
            });
            setTimeout(() => setSuccess(false), 3000);
        } else {
            setError("Failed to update profile. Please try again.");
        }
        setSaving(false);
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
                        <h1 className="text-4xl font-semibold text-gray-900 mb-2">Profile</h1>
                        <p className="text-gray-600">Manage your account information and preferences</p>
                    </div>

                    {error && (
                        <div className="card bg-red-50 border-red-200 mb-6">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="card bg-green-50 border-green-200 mb-6">
                            <p className="text-sm text-green-800">Profile updated successfully!</p>
                        </div>
                    )}

                    <div className="card mb-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-semibold text-white">
                                    {profile.fullName?.charAt(0) || profile.username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">{profile.fullName || profile.username}</h2>
                                <p className="text-sm text-gray-500">@{profile.username}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-div">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={profile.username}
                                    disabled
                                    className="bg-gray-50 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                            </div>

                            <div className="form-div">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    defaultValue={profile.fullName || ""}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={profile.email || ""}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={4}
                                    defaultValue={profile.bio || ""}
                                    placeholder="Tell us about yourself"
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    defaultValue={profile.location || ""}
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="website">Website</label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    defaultValue={profile.website || ""}
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                <button
                                    type="submit"
                                    className="primary-button w-fit"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/settings")}
                                    className="secondary-button w-fit"
                                >
                                    Settings
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Account Created</span>
                                <span className="text-gray-900">
                                    {new Date(profile.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Last Updated</span>
                                <span className="text-gray-900">
                                    {new Date(profile.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">User ID</span>
                                <span className="text-gray-900 font-mono text-xs">{profile.uuid}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;

