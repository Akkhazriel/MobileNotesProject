import React, { useState } from 'react';
import { View, TextInput, Text, Animated } from 'react-native';

interface FormInputProps  {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    error?: string;
}

export function FormInput({
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    error,
}: FormInputProps ) {
    const [focused, setFocused] = useState(false); 
    const floatLabel = focused || value.length > 0; // условие для анимации
    return (
        <View className="relative pb-2">
            {/* Плавающий label: позициниоруется вверх при фокусе или наличии текста */}
            <Text
                className={`absolute left-0 transition-all ${
                    floatLabel
                        ? '-top-3 text-xs text-blue-600'
                        : 'top-2 text-base text-gray-500'
                }`}
            >
                {label}
            </Text>

            {/* Основное поле с нижней границей */}
            <TextInput
                className="border-b border-gray-400 text-black pb-1 pt-5"
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />

            {/* Отображение ошибки валидации */}
            {error && <Text className='text-red-500 text-xs mt-1'>{error}</Text>}
        </View>
    )
}