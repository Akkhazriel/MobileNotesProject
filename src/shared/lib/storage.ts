// Оберка над SecureStore
import * as SecureStore from 'expo-secure-store';

export const getIsRegistered = async (): Promise<boolean> => {
    const value = await SecureStore.getItemAsync('isRegistered');
    return value === 'true';
};

export const setIsRegistered = async (value: boolean): Promise<void> => {
    await SecureStore.setItemAsync('isRegistered', value.toString());
};