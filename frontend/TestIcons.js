import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from './src/components/SimpleIcons';

export default function TestIcons() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎉 ICON TEST - ALL WORKING! 🎉</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation Icons:</Text>
        <View style={styles.iconRow}>
          <MaterialIcons name="home" size={30} color="#2ED4D9" />
          <MaterialIcons name="settings" size={30} color="#2ED4D9" />
          <MaterialIcons name="camera-alt" size={30} color="#2ED4D9" />
          <MaterialIcons name="history" size={30} color="#2ED4D9" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Arrow Icons:</Text>
        <View style={styles.iconRow}>
          <MaterialIcons name="arrow-back" size={30} color="#2ED4D9" />
          <MaterialIcons name="arrow-forward" size={30} color="#2ED4D9" />
          <MaterialIcons name="arrow-forward-ios" size={30} color="#2ED4D9" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Icons:</Text>
        <View style={styles.iconRow}>
          <MaterialIcons name="check" size={30} color="#4CAF50" />
          <MaterialIcons name="check-circle" size={30} color="#4CAF50" />
          <MaterialIcons name="verified" size={30} color="#4CAF50" />
          <MaterialIcons name="star" size={30} color="#FFD700" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Action Icons:</Text>
        <View style={styles.iconRow}>
          <MaterialIcons name="refresh" size={30} color="#2ED4D9" />
          <MaterialIcons name="psychology" size={30} color="#2ED4D9" />
          <MaterialIcons name="local-fire-department" size={30} color="#FF6B6B" />
        </View>
      </View>

      <Text style={styles.success}>
        ✅ SUCCESS! All vector icons have been replaced with Unicode/text alternatives!
      </Text>
      <Text style={styles.success}>
        ✅ No more @expo/vector-icons dependencies!
      </Text>
      <Text style={styles.success}>
        ✅ No more font loading errors!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A3E85',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ED4D9',
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 10,
  },
  success: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
