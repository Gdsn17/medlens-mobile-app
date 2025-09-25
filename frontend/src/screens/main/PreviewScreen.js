import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function PreviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;
  const [croppedText, setCroppedText] = useState('');

  const mockCropQuestion = "What specific part of this image would you like me to analyze?";
  const mockCropOptions = [
    "The entire image",
    "The highlighted area",
    "The text portion",
    "The anatomical structure",
    "The pathology region"
  ];

  const handleCropSelection = (option) => {
    setCroppedText(option);
  };

  const handleConfirm = () => {
    if (!croppedText) {
      Alert.alert('Selection Required', 'Please select what part of the image to analyze.');
      return;
    }
    
    // Navigate to result screen with the image and crop selection
    navigation.navigate('Result', { 
      imageUri, 
      croppedText,
      queryId: Date.now().toString() // Mock query ID
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Question</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{mockCropQuestion}</Text>
          
          <View style={styles.optionsContainer}>
            {mockCropOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  croppedText === option && styles.selectedOption
                ]}
                onPress={() => handleCropSelection(option)}
              >
                <Text style={[
                  styles.optionText,
                  croppedText === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
                {croppedText === option && (
                  <MaterialIcons name="check-circle" size={20} color="#2ED4D9" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={styles.confirmButton}
            labelStyle={styles.confirmButtonText}
            disabled={!croppedText}
          >
            Confirm Analysis
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2ED4D9',
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(46, 212, 217, 0.2)',
    borderColor: '#2ED4D9',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  selectedOptionText: {
    color: '#2ED4D9',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#2ED4D9',
    borderRadius: 25,
    paddingVertical: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
