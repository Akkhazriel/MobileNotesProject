// Глобальная утилита для отлова ошибок
import React from 'react';
import {View, Text} from 'react-native';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error) {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('Global error caught: ', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View className="flex-1 justify-center items-center bg-white">
                    <Text className="text-red-600 font-bold text-xl">
                        Что-то пошло не так
                    </Text>
                    <Text className='text-gray-500 text-sm mt-2'>
                        {this.state.error?.message}
                    </Text>
                </View>
            );
        }

        return this.props.children;
    }
}