import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tokens, setTokens] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserTokens();
  }, []);

  const loadUserTokens = async () => {
    try {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setTokens(userDoc.data().tokens || 5);
        }
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakePicture = () => {
    if (tokens <= 0) {
      navigation.navigate('Upgrade');
    } else {
      navigation.navigate('Camera');
    }
  };

  const handleHistory = () => {
    navigation.navigate('History');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  if (isLoading) {
    return (
      <LinearGradient colors={['#5A3E85', '#1E1E1E']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
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
        <TouchableOpacity onPress={handleHistory} style={styles.headerButton}>
          <MaterialIcons name="history" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.tokensContainer}>
          <MaterialIcons name="local-fire-department" size={20} color="#2ED4D9" />
          <Text style={styles.tokensText}>{tokens} queries left</Text>
        </View>
        
        <TouchableOpacity onPress={handleSettings} style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Image 
            source={require('../../../assets/MedLens_Logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Welcome to MedLens</Text>
          <Text style={styles.subtitleText}>
            Upload a medical image and get AI-powered insights
          </Text>
        </View>

        <View style={styles.mainButtonContainer}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleTakePicture}
          >
            <MaterialIcons name="camera-alt" size={48} color="#FFFFFF" />
            <Text style={styles.mainButtonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <Card style={styles.featureCard}>
            <Card.Content>
              <Title style={styles.featureTitle}>AI Analysis</Title>
              <Paragraph style={styles.featureText}>
                Get instant AI-powered medical insights from your images
              </Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content>
              <Title style={styles.featureTitle}>Study Mode</Title>
              <Paragraph style={styles.featureText}>
                Perfect for medical students and healthcare professionals
              </Paragraph>
            </Card.Content>
          </Card>
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
  tokensContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tokensText: {
    color: '#2ED4D9',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  welcomeSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#2ED4D9',
    textAlign: 'center',
    lineHeight: 22,
  },
  mainButtonContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  mainButton: {
    backgroundColor: '#2ED4D9',
    borderRadius: 80,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
    borderRadius: 12,
  },
  featureTitle: {
    color: '#2ED4D9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
