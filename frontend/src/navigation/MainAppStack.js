import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '../components/SimpleIcons';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import CameraScreen from '../screens/main/CameraScreen';
import PreviewScreen from '../screens/main/PreviewScreen';
import ResultScreen from '../screens/main/ResultScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import UpgradeScreen from '../screens/main/UpgradeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2ED4D9',
        tabBarInactiveTintColor: '#5A3E85',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#5A3E85',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Upgrade" component={UpgradeScreen} />
    </Stack.Navigator>
  );
}
