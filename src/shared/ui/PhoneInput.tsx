import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

interface PhoneInputProps {
    label: string; 
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
}

export function PhoneInput({
    label,
    value,
    onChangeText,
    error,
}:PhoneInputProps) {
    const [focused, setFocused] = useState(false);
    const floatLabel = focused || value.length >0;

    return (
        <View className="relative pb-2">
            {/* Плавающий label */}
            <Text 
                className={`absolute left-0 transition-all ${
                    floatLabel
                        ? '-top-3 text-xs text-blue-600'
                        : 'top-2 text-base text-gray-500'
                }`}
            >
                {label}
            </Text>

            {/* Маскированное поле */}
            <MaskedTextInput
                mask='+7 (999) 999-99-99'
                keyboardType='phone-pad'
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="border-b border-gray-400 text-black pb-1 pt-5"
            />

            {/* Ошибка валидации */}
            {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
        </View>
    )
}