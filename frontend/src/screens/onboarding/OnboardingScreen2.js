import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen2() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'study', label: 'Study' },
    { id: 'practice', label: 'Practice' },
    { id: 'diagnosis', label: 'Diagnosis' },
    { id: 'other', label: 'Other' },
  ];

  const handleContinue = () => {
    if (selectedOption) {
      navigation.navigate('Onboarding3');
    }
  };

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Why did you download MedLens?</Text>
          <Text style={styles.subtitle}>
            Help us personalize your experience
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selectedOption === option.id && styles.selectedOption
              ]}
              onPress={() => setSelectedOption(option.id)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option.id && styles.selectedOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.button, !selectedOption && styles.disabledButton]}
            disabled={!selectedOption}
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
  optionsContainer: {
    marginVertical: 40,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(46, 212, 217, 0.2)',
    borderColor: '#2ED4D9',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedOptionText: {
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
