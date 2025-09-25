import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
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
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.3)']}
          style={styles.overlay}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.headerButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Take Picture</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>
                Position the medical image within the frame
              </Text>
            </View>

            <View style={styles.captureContainer}>
              <TouchableOpacity
                style={[styles.captureButton, isCapturing && styles.capturingButton]}
                onPress={takePicture}
                disabled={isCapturing}
              >
                <MaterialIcons 
                  name={isCapturing ? "hourglass-empty" : "camera-alt"} 
                  size={32} 
                  color="#FFFFFF" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
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
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instructionsText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  captureContainer: {
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#2ED4D9',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  capturingButton: {
    backgroundColor: 'rgba(46, 212, 217, 0.7)',
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
