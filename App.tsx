import './global.css';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from './src/shared/store/auth.store';
import { getIsRegistered } from './src/shared/lib/storage';
import { GlobalErrorBoundary } from './src/shared/error/GlobalErrorBoundary';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    console.error('Unhandled JS Error:', error);
  });

  const setRegistered = useAuthStore((s) => s.setRegistered);

  useEffect(() => {
    getIsRegistered().then(setRegistered);
  }, []);

  return (
    <GlobalErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GlobalErrorBoundary>
  );
}
