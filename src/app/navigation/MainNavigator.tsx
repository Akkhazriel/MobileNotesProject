// Главная навигация
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesScreen from '../screens/NotesScreen';
import CalendarScreen from '../screens/CalendarScreen';
import MailScreen from '../screens/MailScreen';

export type MainTabParamList = {
    Notes: undefined;
    Calendar: undefined;
    Mail: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            screenOptions={
                {
                    headerShown: false,
                    tabBarActiveTintColor: '#2563eb',
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: { paddingBottom: 4, height: 60 },
                }
            }
        >
            <Tab.Screen name="Notes" component={NotesScreen}></Tab.Screen>
            <Tab.Screen name="Calendar" component={CalendarScreen}></Tab.Screen>
            <Tab.Screen name="Mail" component={MailScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}