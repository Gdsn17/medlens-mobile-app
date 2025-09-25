import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent() {
  useEffect(() => {
    // Hide splash screen after a delay
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('../../assets/MedLens_Logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>AI-Powered Medical Learning</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    color: '#2ED4D9',
    textAlign: 'center',
  },
});
