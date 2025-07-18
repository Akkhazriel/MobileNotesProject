// Zustand store для isRegistered
import { create } from 'zustand';

type AuthState = {
    isRegistered: boolean | null; // null - loading
    setRegistered: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isRegistered: null,
    setRegistered: (value) => set({isRegistered: value}),
}))