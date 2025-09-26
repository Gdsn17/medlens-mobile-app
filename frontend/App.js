import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import OnboardingStack from './src/navigation/OnboardingStack';
import MainAppStack from './src/navigation/MainAppStack';

enableScreens(true);

const Root = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#5A3E85" />
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name="Onboarding" component={OnboardingStack} />
        <Root.Screen name="MainApp" component={MainAppStack} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
