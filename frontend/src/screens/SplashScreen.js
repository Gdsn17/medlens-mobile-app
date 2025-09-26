import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/MedLens_Logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.title}>Welcome to MedLens</Text>
        <Text style={styles.subtitle}>
          Take a picture or query search to get AI-powered medical insights
        </Text>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="brain" size={32} color="#2ED4D9" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>AI Analysis</Text>
              <Text style={styles.featureText}>
                Get instant AI-powered medical insights from your images
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="book-open-variant" size={32} color="#2ED4D9" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Study Mode</Text>
              <Text style={styles.featureText}>
                Perfect for medical students and healthcare professionals
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#2ED4D9',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    color: '#2ED4D9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#2ED4D9',
    paddingHorizontal: 80,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
