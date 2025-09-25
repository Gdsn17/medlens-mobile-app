import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
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

        <View style={styles.previewContainer}>
          <View style={styles.mockCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/200x150/2ED4D9/FFFFFF?text=Medical+Image' }}
              style={styles.mockImage}
            />
            <Text style={styles.mockText}>Upload medical image</Text>
          </View>
          
          <View style={styles.mockCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/200x150/5A3E85/FFFFFF?text=AI+Analysis' }}
              style={styles.mockImage}
            />
            <Text style={styles.mockText}>Get AI insights</Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Continue
        </Button>
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
    width: 80,
    height: 80,
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
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  mockCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: width * 0.35,
  },
  mockImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  mockText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2ED4D9',
    borderRadius: 25,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
