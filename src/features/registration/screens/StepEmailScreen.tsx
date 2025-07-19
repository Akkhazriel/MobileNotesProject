import React from 'react';
import {View, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StepLayout } from '../components/StepLayout';
import { FormInput } from '../../../shared/ui/FormInput';
import { useRegistrationStore } from '../store/registration.store';

const EMAIL_DOMAINS = [
    'gmail.com',
    'yandex.ru',
    'mail.ru',
    'outlook.com',
    'icloud.com',
];

export function StepEmailScreen() {
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

    const emailAccount = profile.emailAccounts?.[0];
    const emailName = emailAccount?.name || '';
    const emailDomain = emailAccount?.domain || '';

    const isValid = emailName.trim() !== '' && emailDomain.trim() !== '';

    const handleChange = (key: 'name' | 'domain', value: string) => {
        const current = profile.emailAccounts?.[0] || {name: '', domain: ''};
        const update = { ...current, [key]: value};
        setField('emailAccounts', [update]);
    };

    return (
        <StepLayout
            title="Укажи адрес электронной почты"
            step={3}
            totalSteps={6}
            onBack={prevStep}
            onNext={nextStep}
            nextDisabled={!isValid}
        >
            <FormInput 
                label="Имя почты"
                value={emailName}
                onChangeText={(v) => handleChange('name', v.toLowerCase())}
            />

            <View className="mt-4">
                <Text className='text-sm text-gray-500 mb-1'>Домен</Text>
                <View className="border rounded overflow-hidden">
                    <Picker
                        selectedValue={emailDomain}
                        onValueChange={(v) => handleChange('domain', v)}
                    >
                        <Picker.Item label="Выбери домен" value="" />
                        {EMAIL_DOMAINS.map((d) => (
                            <Picker.Item key={d} label={d} value={d} />
                        ))}
                    </Picker>
                </View>
            </View>
        </StepLayout>
    )
}