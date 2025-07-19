import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';
import type { UserDataVault } from '../../../shared/types/user-data-vault';

const STORAGE_KEY = 'user_data_vault_encrypted';
const ENCRYPTION_SECRET = 'STATIC_ENCRYPTION_KEY'; // TODO: заменить на device-specific key или онлайн-токен при миграции

// Полная замена содержимого хранилища
export async function saveVault(data:UserDataVault): Promise<void> {
    const json = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(json, ENCRYPTION_SECRET).toString();
    await SecureStore.setItemAsync(STORAGE_KEY, encrypted);
}

// Загрузка всего хранилища
export async function loadVault(): Promise<UserDataVault | null> {
    const encrypted = await SecureStore.getItemAsync(STORAGE_KEY);
    if (!encrypted) return null;

    try {
        const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_SECRET)
            .toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    } catch {
        return null;
    }
}

// Частичное обновление (патч)
export async function patchVault<K extends keyof UserDataVault>(
    key: K,
    value: UserDataVault[K],
): Promise<void> {
    const existing = (await loadVault()) ||  {} as UserDataVault;
    const updated = {...existing, [key]: value};
    await saveVault(updated);
}

// Очистка
export async function clearVault(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
}