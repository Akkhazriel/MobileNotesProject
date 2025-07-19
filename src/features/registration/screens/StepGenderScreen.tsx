import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StepLayout } from '../components/StepLayout';
import { useRegistrationStore } from '../store/registration.store';
import { Gender } from '../types/user-profile';

import GenderOption from '../components/GenderOption';

export function StepGenderScreen() {
    const {
        profile,
        setField,
        nextStep,
        prevStep,
    } = useRegistrationStore( (s) => ({
        profile: s.profile,
        setField: s.setField,
        nextStep: s.nextStep,
        prevStep: s.prevStep,
    }));

    const selected = profile.gender;

    const handleSelect = (gender: Gender) => {
        setField('gender', gender);
    };

    return (
        <StepLayout 
            title="Твой пол?"
            step={1}
            totalSteps={6}
            onBack={prevStep}
            onNext={nextStep}
            nextDisabled={!selected}
        >   
            <View className="flex-row justify-around mt-6">
                <GenderOption
                    label="Мужской"
                    icon="♂"
                    selected={selected === Gender.Male}
                    onPress={() => handleSelect(Gender.Male)}
                />
                <GenderOption
                    label="Женский"
                    icon="♀"
                    selected={selected === Gender.Female}
                    onPress={() => handleSelect(Gender.Female)}
                />
            </View>
        </StepLayout>
    )
}
