import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen1() {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/MedLens_Logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to MedLens</Text>
          <Text style={styles.subtitle}>
            Take a picture or query search to get AI-powered medical insights
          </Text>
        </View>

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleContinue}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
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
  button: {
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
