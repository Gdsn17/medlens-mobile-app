import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Platform } from 'react-native';
let Camera;
try {
  // Avoid importing on web to prevent runtime errors
  if (Platform.OS !== 'web') {
    Camera = require('expo-camera').Camera;
  }
} catch (e) {
  Camera = null;
}
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    getCameraPermissions();
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef && !isCapturing) {
      setIsCapturing(true);
      try {
        const photo = await cameraRef.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        navigation.navigate('Preview', { imageUri: photo.uri });
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture. Please try again.');
        console.error('Error taking picture:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (Platform.OS === 'web') {
    return (
      <LinearGradient colors={['#5A3E85', '#1E1E1E']} style={styles.container}>
        <View style={styles.webContainer}>
          <View style={styles.scanArea}>
            <MaterialCommunityIcons name="camera" size={80} color="#2ED4D9" />
            <Text style={styles.scanText}>Camera not available on web</Text>
            <Text style={styles.scanSubtext}>Use mobile app for full camera functionality</Text>
          </View>
          <View style={styles.webControls}>
            <TouchableOpacity style={styles.webButton}>
              <MaterialCommunityIcons name="image" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.webButton}>
              <MaterialCommunityIcons name="keyboard" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (hasPermission === null) {
    return (
      <LinearGradient colors={['#5A3E85', '#1E1E1E']} style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.text}>Requesting camera permission...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (hasPermission === false) {
    return (
      <LinearGradient colors={['#5A3E85', '#1E1E1E']} style={styles.container}>
        <View style={styles.centerContainer}>
          <MaterialIcons name="camera-alt" size={64} color="#2ED4D9" />
          <Text style={styles.text}>Camera access denied</Text>
          <Text style={styles.subText}>
            Please enable camera access in your device settings to use this feature.
          </Text>
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={setCameraRef}
      >
        {/* Scan Area Overlay */}
        <View style={styles.scanOverlay}>
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
            style={[styles.shutterButton, isCapturing && styles.capturingButton]}
            onPress={takePicture}
            disabled={isCapturing}
          >
            <MaterialIcons 
              name={isCapturing ? "hourglass-empty" : "camera-alt"} 
              size={32} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="keyboard" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanArea: {
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.8,
    height: width * 0.6,
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
  capturingButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  webButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#2ED4D9',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ED4D9',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
