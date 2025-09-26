import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const imageUri = route?.params?.imageUri;
  const croppedText = route?.params?.croppedText;
  const queryId = route?.params?.queryId;
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateAIResponse();
  }, []);

  const generateAIResponse = async () => {
    // Simulate AI processing time
    setTimeout(() => {
      const mockResponses = [
        {
          analysis: "Based on the medical image analysis, this appears to be a normal chest X-ray with clear lung fields and no signs of acute pathology. The heart size is within normal limits and the mediastinal structures are unremarkable.",
          confidence: "High (95%)",
          recommendations: [
            "Continue routine monitoring",
            "Follow up as scheduled",
            "No immediate intervention required"
          ],
          keyFindings: [
            "Clear lung fields bilaterally",
            "Normal cardiac silhouette",
            "No pleural effusion",
            "No acute bony abnormalities"
          ]
        },
        {
          analysis: "The image shows signs consistent with pneumonia in the right lower lobe. There is increased opacity and consolidation visible in the affected area, along with air bronchograms.",
          confidence: "High (92%)",
          recommendations: [
            "Consider antibiotic therapy",
            "Monitor oxygen saturation",
            "Follow up in 48-72 hours",
            "Consider chest CT if symptoms worsen"
          ],
          keyFindings: [
            "Right lower lobe consolidation",
            "Air bronchograms present",
            "Increased opacity in affected area",
            "No pleural effusion"
          ]
        },
        {
          analysis: "This appears to be a normal ECG tracing with regular rhythm and normal intervals. The QRS complex, PR interval, and QT interval are all within normal limits.",
          confidence: "High (98%)",
          recommendations: [
            "Continue current monitoring",
            "No immediate cardiac concerns",
            "Follow routine follow-up schedule"
          ],
          keyFindings: [
            "Regular sinus rhythm",
            "Normal QRS duration",
            "Normal PR interval",
            "No ST-T wave abnormalities"
          ]
        }
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setAiResponse(randomResponse);
      setIsLoading(false);
      
      // Decrement user tokens (native only)
      if (Platform.OS !== 'web') {
        decrementTokens();
      }
    }, 2000);
  };

  const decrementTokens = async () => {
    try {
      if (auth.currentUser) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          tokens: increment(-1)
        });
      }
    } catch (error) {
      console.error('Error updating tokens:', error);
    }
  };

  const handleNewQuery = () => {
    navigation.navigate('Home');
  };

  const handleViewHistory = () => {
    navigation.navigate('History');
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#5A3E85', '#1E1E1E']}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <MaterialIcons name="psychology" size={64} color="#2ED4D9" />
          <Text style={styles.loadingText}>AI is analyzing your image...</Text>
          <Text style={styles.loadingSubText}>This may take a few moments</Text>
        </View>
      </LinearGradient>
    );
  }

  if (!imageUri) {
    return (
      <LinearGradient colors={['#5A3E85', '#1E1E1E']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <MaterialIcons name="psychology" size={64} color="#2ED4D9" />
          <Text style={styles.loadingText}>This screen expects an image from native capture.</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis Result</Text>
        <TouchableOpacity onPress={handleViewHistory} style={styles.headerButton}>
          <MaterialIcons name="history" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.cropText}>Analyzing: {croppedText}</Text>
        </View>

        <View style={styles.analysisCard}>
          <Text style={styles.cardTitle}>AI Analysis</Text>
          <Text style={styles.analysisText}>
            {aiResponse.analysis}
          </Text>
          <View style={styles.confidenceContainer}>
            <MaterialIcons name="verified" size={16} color="#2ED4D9" />
            <Text style={styles.confidenceText}>Confidence: {aiResponse.confidence}</Text>
          </View>
        </View>

        <View style={styles.findingsCard}>
          <Text style={styles.cardTitle}>Key Findings</Text>
          {aiResponse.keyFindings.map((finding, index) => (
            <View key={index} style={styles.findingItem}>
              <MaterialIcons name="check-circle" size={16} color="#2ED4D9" />
              <Text style={styles.findingText}>{finding}</Text>
            </View>
          ))}
        </View>

        <View style={styles.recommendationsCard}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          {aiResponse.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <MaterialIcons name="arrow-forward" size={16} color="#2ED4D9" />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleNewQuery}
            style={styles.newQueryButton}
          >
            <Text style={styles.buttonText}>New Query</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingSubText: {
    color: '#2ED4D9',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2ED4D9',
  },
  cropText: {
    color: '#2ED4D9',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  analysisCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  findingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recommendationsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    color: '#2ED4D9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  analysisText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    color: '#2ED4D9',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  findingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  findingText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  newQueryButton: {
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
