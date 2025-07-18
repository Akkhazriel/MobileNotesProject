import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../shared/store/auth.store';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const { isRegistered, setRegistered } = useAuthStore();

    const handleContinue = () => {
        navigation.navigate('Main' as never);
    };

    const handleRegister = () => {
        setRegistered(true);
        navigation.navigate('Register' as never);
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl mb-4 font-bold">Добро пожаловать</Text>

            {isRegistered === true && (
                <Pressable onPress={handleContinue} className="bg-gray-600 px-4 py-2 rounded mb-2">
                    <Text className="text-white font-semibold">Продолжить</Text>
                </Pressable>
            )}

            {isRegistered === false && (
                <Pressable onPress={handleRegister} className="bg-blue-600 px-4 py-2 rounded">
                    <Text className="text-white font-semibold">Зарегистрироваться</Text>
                </Pressable>
            )}
        </View>
    )
}

export default WelcomeScreen;