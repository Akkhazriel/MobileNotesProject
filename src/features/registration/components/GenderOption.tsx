import { View, Text, Pressable } from 'react-native';

interface GenderOptionProps {
    label: string;
    icon: string;
    selected: boolean;
    onPress: () => void;
}

function GenderOption({label, icon, selected, onPress}: GenderOptionProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`items-center justify-center mx-2 ${selected ? 'opacity-100' : 'opacity-50'}`}
        >
            <View
                className={`w-20 h-20 rounded-full border-2 items-center justify-center mb-2 ${
                    selected ? 'border-blue-600 bg-blue-100' : 'border-gray-400'
                }`}
            >
                <Text className="text-2xl">{icon}</Text>
            </View>
            <Text className="text-sm font-medium">{label}</Text>
        </Pressable>
    )
}

export default GenderOption;