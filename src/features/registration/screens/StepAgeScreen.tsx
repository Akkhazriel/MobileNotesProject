import React, {useMemo} from 'react';
import { View } from 'react-native';
import { StepLayout } from '../components/StepLayout';
import { useRegistrationStore } from '../store/registration.store';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';

export function StepAgeScreen() {
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

    // Получаем текущий возраст из даты рождения
    const selectedAge = useMemo(() => {
        if (!profile.birthDate) return undefined;
        const birthYear = dayjs(profile.birthDate).year();
        return dayjs().year() - birthYear;
    }, [profile.birthDate]);

    const handleSelect = (age: number) => {
        const birthYear = dayjs().year() - age;
        const birthDate = dayjs(`${birthYear}-01-01`).format('YYYY-MM-DD');
        setField('birthDate', birthDate);
    };

    return (
        <StepLayout
            title="Сколько тебе лет?"
            step={2}
            totalSteps={6}
            onBack={prevStep}
            onNext={nextStep}
            nextDisabled={!profile.birthDate}
        >
            <View className="border rounded-md overflow-hidden">
                <Picker
                    selectedValue={selectedAge}
                    onValueChange={(value) => handleSelect(value)}
                >
                    {Array.from({length: 89}, (_, i) => 12 + i).map((age) => (
                        <Picker.Item key={age} label={`${age}`} value={age} />
                    ))}
                </Picker>
            </View>
        </StepLayout>
    )
}