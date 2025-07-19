import React from 'react';
import { StepLayout } from '../components/StepLayout';
import { FormInput } from '../../../shared/ui/FormInput';
import { useRegistrationStore } from '../store/registration.store';
import { hashPassword } from '../lib/crypto';

export function StepAuthScreen() {
    const {
        profile,
        setField,
        nextStep,
        prevStep,
    } = useRegistrationStore((s) => ({
        profile: s.profile,
        setField: s.setField,
        nextStep: s.nextStep,
        prevStep: s.prevStep,
    }));

    const username = profile.username || '';
    const passwordHash = profile.passwordHash || '';
    const passwordTemp = React.useRef<string>(''); // ввод без сохранения

    const isValid = username.trim() !== '' && passwordTemp.current.length >= 6;

    const handlePasswordChange = async (plain: string) => {
        passwordTemp.current = plain;
        const hash = await hashPassword(plain);
        setField('passwordHash', hash);
    };

    return (
        <StepLayout
            title="Придумай логин и пароль"
            step={4}
            totalSteps={6}
            onBack={prevStep}
            onNext={nextStep}
            nextDisabled={!isValid}
        >
            <FormInput 
                label="Username"
                value={username}
                onChangeText={(v) => setField('username', v)}
            />
            <FormInput 
                label="Пароль"
                value={passwordTemp.current}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />
        </StepLayout>
    );
}