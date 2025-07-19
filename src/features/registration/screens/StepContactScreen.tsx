import React from 'react';
import { StepLayout } from '../components/StepLayout';
import { FormInput } from '../../../shared/ui/FormInput';
import { PhoneInput } from '../../../shared/ui/PhoneInput';
import { useRegistrationStore } from '../store/registration.store';

import { patchVault } from '../lib/userDataVault';
import { useNavigation } from '@react-navigation/native';
import type { UserProfile } from '../types/user-profile';

export function StepContactScreen() {
    const {
        profile,
        setField,
        prevStep,
    } = useRegistrationStore((s) => ({
        profile: s.profile,
        setField: s.setField,
        prevStep: s.prevStep,
    }));

    const navigation = useNavigation();

    const phone = profile.phone || '';
    const country = profile.country || '';
    const city = profile.city || ''; 

    const isValid =
        phone.replace(/\D/g, '').length === 11 && country.trim() !== '' && city.trim() !== '';

    const handleSubmit = async () => {
        if (!profile.username || !profile.passwordHash) return;

        try {
            await patchVault('profile', profile as UserProfile);
            // далее: переход к главному экрану
            navigation.navigate('Main' as never);
        } catch (e) {
            console.error('Ошибка сохранения профиля в банк данных: ', e);
        }
    };

    return (
        <StepLayout
            title="Контактная информация"
            step={5}
            totalSteps={6}
            onBack={prevStep}
            onNext={handleSubmit}
            nextDisabled={!isValid}
        >
            <PhoneInput 
                label="Телефон"
                value={phone}
                onChangeText={(v) => setField('phone', v)}
            />
            <FormInput 
                label="Страна"
                value={country}
                onChangeText={(v) => setField('country', v)}
            />
            <FormInput 
                label="Город"
                value={city}
                onChangeText={(v) => setField('city', v)}
            />
        </StepLayout>
    )
}