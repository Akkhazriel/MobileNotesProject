import {  createNativeStackNavigator  } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
    )
}