import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import CameraScreen from '../screens/main/CameraScreen';
import PreviewScreen from '../screens/main/PreviewScreen';
import ResultScreen from '../screens/main/ResultScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import UpgradeScreen from '../screens/main/UpgradeScreen';

const Stack = createStackNavigator();

export default function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Upgrade" component={UpgradeScreen} />
    </Stack.Navigator>
  );
}
