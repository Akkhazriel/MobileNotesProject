import { create } from 'zustand';
import { UserProfile, Gender } from '../types/user-profile';

interface RegistrationState {
    profile: Partial<UserProfile>; // частично заполняемый профиль
    currentStep: number;

    setField: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;

    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;

    reset: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
    profile: {},
    currentStep: 0,

    setField: (key, value) =>
        set((state) => ({
            profile: {
                ...state.profile,
                [key]: value,
            },
        })),

    nextStep: () =>
        set((state) => ({
            currentStep: state.currentStep + 1,
        })),

    prevStep: () =>
        set((state) => ({
            currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0,
        })),

    setStep: (step) =>
        set(() => ({
            currentStep: step,
        })),

    reset: () =>
        set(() => ({
            profile: {},
            currentStep: 0,
        })),
}));