import { UserProfile } from "../../features/registration/types/user-profile";

export interface UserDataVault {
    profile: UserProfile;
    preference?: Record<string, any>;
    assistantContext?: Record<string, any>;
    history?: Array<{type: string; payload: any; timestamp: string}>;
    lastSyncedAt?: string;
}