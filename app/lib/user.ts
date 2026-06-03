import { usePuterStore } from "./puter";
import { generateUUID } from "./utils";

export const useUserProfile = () => {
    const { auth, kv } = usePuterStore();

    const saveProfile = async (profile: UserProfile): Promise<boolean> => {
        try {
            profile.updatedAt = Date.now();
            await kv.set(`profile:${auth.user?.uuid}`, JSON.stringify(profile));
            return true;
        } catch (error) {
            console.error("Error saving profile:", error);
            return false;
        }
    };

    const getProfile = async (): Promise<UserProfile | null> => {
        if (!auth.user || !auth.isAuthenticated) return null;

        try {
            const profileData = await kv.get(`profile:${auth.user.uuid}`);
            if (!profileData) {
                // Create default profile
                const defaultProfile: UserProfile = {
                    uuid: auth.user.uuid,
                    username: auth.user.username,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    preferences: {
                        theme: "system",
                        notifications: {
                            email: true,
                            analysisComplete: true,
                            weeklyReport: false,
                        },
                    },
                };
                await saveProfile(defaultProfile);
                return defaultProfile;
            }
            return JSON.parse(profileData);
        } catch (error) {
            console.error("Error getting profile:", error);
            return null;
        }
    };

    const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
        const currentProfile = await getProfile();
        if (!currentProfile) return false;

        const updatedProfile: UserProfile = {
            ...currentProfile,
            ...updates,
        };
        return await saveProfile(updatedProfile);
    };

    const updatePreferences = async (preferences: Partial<UserPreferences>): Promise<boolean> => {
        const currentProfile = await getProfile();
        if (!currentProfile) return false;

        const updatedPreferences: UserPreferences = {
            ...currentProfile.preferences,
            ...preferences,
        };
        return await updateProfile({ preferences: updatedPreferences });
    };

    const logActivity = async (activity: Omit<ActivityLog, "id" | "timestamp">): Promise<void> => {
        if (!auth.user || !auth.isAuthenticated) return;

        try {
            const log: ActivityLog = {
                id: generateUUID(),
                timestamp: Date.now(),
                ...activity,
            };
            const logs = await kv.list(`activity:${auth.user.uuid}:*`, true) as KVItem[];
            const activityLogs = (logs || []).map((item) => JSON.parse(item.value) as ActivityLog);
            activityLogs.push(log);
            
            // Keep only last 100 activities
            const recentLogs = activityLogs.slice(-100);
            for (const activityLog of recentLogs) {
                await kv.set(`activity:${auth.user.uuid}:${activityLog.id}`, JSON.stringify(activityLog));
            }
        } catch (error) {
            console.error("Error logging activity:", error);
        }
    };

    const getActivityLogs = async (): Promise<ActivityLog[]> => {
        if (!auth.user || !auth.isAuthenticated) return [];

        try {
            const logs = await kv.list(`activity:${auth.user.uuid}:*`, true) as KVItem[];
            if (!logs) return [];
            return logs.map((item) => JSON.parse(item.value) as ActivityLog).sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error("Error getting activity logs:", error);
            return [];
        }
    };

    const exportUserData = async (): Promise<string> => {
        if (!auth.user || !auth.isAuthenticated) return "";

        try {
            const profile = await getProfile();
            const resumes = (await kv.list("resume:*", true)) as KVItem[];
            const activityLogs = await getActivityLogs();

            const exportData = {
                profile,
                resumes: resumes.map((item) => JSON.parse(item.value) as Resume),
                activityLogs,
                exportedAt: new Date().toISOString(),
            };

            return JSON.stringify(exportData, null, 2);
        } catch (error) {
            console.error("Error exporting data:", error);
            return "";
        }
    };

    const deleteAccount = async (): Promise<boolean> => {
        if (!auth.user || !auth.isAuthenticated) return false;

        try {
            // Delete all resumes
            const resumes = await kv.list("resume:*", true) as KVItem[];
            for (const resume of resumes) {
                await kv.delete(resume.key);
            }

            // Delete activity logs
            const logs = await kv.list(`activity:${auth.user.uuid}:*`, true) as KVItem[];
            for (const log of logs) {
                await kv.delete(log.key);
            }

            // Delete profile
            await kv.delete(`profile:${auth.user.uuid}`);

            // Sign out
            await auth.signOut();
            return true;
        } catch (error) {
            console.error("Error deleting account:", error);
            return false;
        }
    };

    return {
        getProfile,
        saveProfile,
        updateProfile,
        updatePreferences,
        logActivity,
        getActivityLogs,
        exportUserData,
        deleteAccount,
    };
};

