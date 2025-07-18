import React, { useState, useEffect } from 'react';
import { StepLayout } from '../components/StepLayout';
import { FormInput } from '../../../shared/ui/FormInput';
import { useRegistrationStore } from '../store/registration.store';
import { useNavigation } from '@react-navigation/native';

export function StepNameScreen() {
    const navigation = useNavigation();

    const { firstName, lastName, middleName, setProfileField, goToNextStep, reset } =
        useRegistrationStore((s) => ({
            firstName: s.profile.firstName,
            lastName: s.profile.lastName,
            middleName: s.profile.middleName,
            setProfileField: s.setField,
            goToNextStep: s.nextStep,
            reset: s.reset,
        }));

    const isValid =
        (firstName || '').trim() !== '' &&
        (lastName || '').trim() !== '';


    const handleBack = () => {
        reset(); // Сбрасываем профиль и шаг
        navigation.goBack(); // Возвращаемся на Welcome
    };

    const handleNext = () => {
        goToNextStep();
    };

    return (
        <StepLayout
            title="Введи своё имя"
            step={0}
            totalSteps={6}
            onBack={handleBack}
            onNext={handleNext}
            nextDisabled={!isValid}
        >
            <FormInput
                label="Имя"
                value={firstName || ''}
                onChangeText={(v) => setProfileField('firstName', v)}
            />
            <FormInput
                label="Фамилия"
                value={lastName || ''}
                onChangeText={(v) => setProfileField('lastName', v)}
            />
            <FormInput
                label="Отчество (необязательно)"
                value={middleName || ''}
                onChangeText={(v) => setProfileField('middleName', v)}
            />
        </StepLayout>
    );
}