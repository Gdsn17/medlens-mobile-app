import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebaseConfig';
import FontLoader from './src/components/FontLoader';

// Import screens
import SplashScreenComponent from './src/screens/SplashScreen';
import OnboardingStack from './src/navigation/OnboardingStack';
import MainAppStack from './src/navigation/MainAppStack';

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <FontLoader>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#5A3E85" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <Stack.Screen name="MainApp" component={MainAppStack} />
            ) : (
              <Stack.Screen name="Onboarding" component={OnboardingStack} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </FontLoader>
  );
}
