import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StepLayoutProps {
    title: string; // Заголовок
    step: number; // Текущий шаг
    totalSteps: number; // Всего шагов
    children: React.ReactNode; // Контент шага
    onNext: () => void;
    onBack: () => void;
    nextDisabled?: boolean;
}

export function StepLayout({
    title,
    step,
    totalSteps,
    children,
    onNext,
    onBack,
    nextDisabled = false,
}:  StepLayoutProps) {
    return (
        <SafeAreaView className="flex-1 bg-white px-6 py-4">
            {/* Заголовок */}
            <Text className="text-2xl font-semibold mb-6">{title}</Text>

            {/* Контент */}
            <View className='flex-1'>{children}</View>

            {/* Пагинация */}
            <View className='flex-row justify-center mb-4'>
                {Array.from({length: totalSteps}).map((_, i) => (
                    <View 
                        key={i}
                        className={`w-2 h-2 rounded-full mx-1 ${
                            i === step ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </View>

            {/* Кнопки управления */}
            <View className="flex-row justify-between mt-2">
                <Pressable onPress={onBack} className="px-4 py-3 rounded bg-gray-200">
                    <Text className="text-gray-800 font-medium">Назад</Text>
                </Pressable>

                <Pressable 
                    onPress={onNext}
                    disabled={nextDisabled}
                    className={`px-4 py-3 rounded ${
                        nextDisabled ? 'bg-blue-300' : 'bg-blue-600'
                    }`}
                >
                    <Text className="text-white font-medium">Далее</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}