import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export default function OnboardingScreen4() {
  const navigation = useNavigation();
  const [selectedJourney, setSelectedJourney] = useState(null);

  const journeyOptions = [
    { id: 'premed', label: 'Pre-med student' },
    { id: 'medstudent', label: 'Medical student' },
    { id: 'resident', label: 'Resident' },
    { id: 'attending', label: 'Attending physician' },
    { id: 'nurse', label: 'Nurse' },
    { id: 'other', label: 'Other healthcare professional' },
  ];

  const handleStartLearning = async () => {
    if (selectedJourney) {
      try {
        if (Platform.OS === 'web') {
          // On web, navigate directly to MainApp since native auth flow is disabled
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
          return;
        }
        // Native: For now, skip Firebase and proceed to app to avoid runtime blockers
        navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        // If you want auth, replace the above line with:
        // await signInAnonymously(auth);
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Where are you in your study journey?</Text>
          <Text style={styles.subtitle}>
            This helps us tailor content to your level
          </Text>
        </View>

        <View style={styles.journeyContainer}>
          {journeyOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.journeyOption,
                selectedJourney === option.id && styles.selectedJourney
              ]}
              onPress={() => setSelectedJourney(option.id)}
            >
              <Text style={[
                styles.journeyText,
                selectedJourney === option.id && styles.selectedJourneyText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleStartLearning}
            style={[styles.button, !selectedJourney && styles.disabledButton]}
            disabled={!selectedJourney}
          >
            <Text style={styles.buttonText}>Start Learning</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#2ED4D9',
    textAlign: 'center',
    lineHeight: 22,
  },
  journeyContainer: {
    marginVertical: 20,
  },
  journeyOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 18,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedJourney: {
    backgroundColor: 'rgba(46, 212, 217, 0.2)',
    borderColor: '#2ED4D9',
  },
  journeyText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedJourneyText: {
    color: '#2ED4D9',
    fontWeight: 'bold',
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
  disabledButton: {
    backgroundColor: 'rgba(46, 212, 217, 0.3)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
