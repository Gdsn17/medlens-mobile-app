import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen3() {
  const navigation = useNavigation();
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    { id: 'learn', label: 'Learn medical concepts' },
    { id: 'practice', label: 'Practice diagnosis' },
    { id: 'study', label: 'Study for exams' },
    { id: 'research', label: 'Research cases' },
    { id: 'teaching', label: 'Teaching others' },
    { id: 'clinical', label: 'Clinical practice' },
  ];

  const toggleGoal = (goalId) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      navigation.navigate('Onboarding4');
    }
  };

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What is your goal using MedLens?</Text>
          <Text style={styles.subtitle}>
            Select all that apply
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalOption,
                selectedGoals.includes(goal.id) && styles.selectedGoal
              ]}
              onPress={() => toggleGoal(goal.id)}
            >
              <Text style={[
                styles.goalText,
                selectedGoals.includes(goal.id) && styles.selectedGoalText
              ]}>
                {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleContinue}
          style={[styles.button, selectedGoals.length === 0 && styles.disabledButton]}
          labelStyle={styles.buttonText}
          disabled={selectedGoals.length === 0}
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
  goalsContainer: {
    marginVertical: 20,
  },
  goalOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGoal: {
    backgroundColor: 'rgba(46, 212, 217, 0.2)',
    borderColor: '#2ED4D9',
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedGoalText: {
    color: '#2ED4D9',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2ED4D9',
    borderRadius: 25,
    paddingVertical: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(46, 212, 217, 0.3)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
