import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={handleHistory}>
          <MaterialCommunityIcons name="clipboard-text" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.pillBadge}>
          <Ionicons name="flame" size={16} color="#FFFFFF" />
          <Text style={styles.pillText}>{tokens} queries left</Text>
        </View>
        
        <TouchableOpacity style={styles.headerIcon} onPress={handleSettings}>
          <Ionicons name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Camera Preview Area */}
      <View style={styles.cameraPreview}>
        <View style={styles.scanArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.scanText}>Take a picture of a question</Text>
          <Text style={styles.scanSubtext}>Crop the question</Text>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton}>
          <MaterialCommunityIcons name="image" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.shutterButton}
          onPress={handleTakePicture}
        >
          <MaterialIcons name="camera-alt" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <MaterialCommunityIcons name="keyboard" size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
  headerIcon: {
    padding: 8,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 212, 217, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2ED4D9',
  },
  pillText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanArea: {
    alignItems: 'center',
  },
  scanFrame: {
    width: 300,
    height: 200,
    position: 'relative',
    marginBottom: 30,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#2ED4D9',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  scanSubtext: {
    color: '#2ED4D9',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  controlButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  shutterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#2ED4D9',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
