import * as SecureStore from 'expo-secure-store';
import type { UserProfile } from '../types/user-profile';

const PROFILE_KEY = 'userProfile';

export async function saveProfile(profile: UserProfile): Promise<void> {
    const json = JSON.stringify(profile);
    await SecureStore.setItemAsync(PROFILE_KEY, json);
}

export async function loadProfile(): Promise<UserProfile | null> {
    const json = await SecureStore.getItemAsync(PROFILE_KEY);
    if (!json) return null;
    try {
        const raw = JSON.parse(json);

        return {
            firstName: raw.firstName?.trim() ?? '',
            lastName: raw.lastName?.trim() ?? '',
            middleName: raw.middleName?.trim() || undefined,
            emailAccounts: Array.isArray(raw.emailAccounts)
                ? raw.emailAccounts.map((e: any) => ({
                    name: e.name?.toLowerCase()?.trim() ?? '',
                    domain: e.domain?.trim() ?? '',
                }))
                : [],
            username: raw.username?.toLowerCase()?.trim() ?? '',
            passwordHash: raw.passwordHash ?? '',
            phone: raw.phone?.trim() ?? '',
            country: raw.country?.trim() ?? '',
            city: raw.city?.trim() ?? '',
        };
    } catch {
        return null;
    }
}

export async function clearProfile(): Promise<void> {
    await SecureStore.deleteItemAsync(PROFILE_KEY);
}