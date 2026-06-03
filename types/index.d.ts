interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
    createdAt?: number;
    updatedAt?: number;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
}

interface UserProfile {
    uuid: string;
    username: string;
    email?: string;
    fullName?: string;
    bio?: string;
    location?: string;
    website?: string;
    createdAt: number;
    updatedAt: number;
    preferences: UserPreferences;
}

interface UserPreferences {
    theme: "light" | "dark" | "system";
    notifications: {
        email: boolean;
        analysisComplete: boolean;
        weeklyReport: boolean;
    };
    defaultJobTitle?: string;
    defaultCompany?: string;
}

interface ActivityLog {
    id: string;
    type: "resume_uploaded" | "resume_analyzed" | "profile_updated" | "settings_updated" | "account_deleted";
    description: string;
    timestamp: number;
    metadata?: Record<string, any>;
}
