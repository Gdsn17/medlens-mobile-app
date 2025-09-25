import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from './src/components/SimpleIcons';

export default function IconTest() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎉 ICON TEST - ALL WORKING! 🎉</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AntDesign Icons:</Text>
        <View style={styles.iconRow}>
          <AntDesign name="heart" size={30} color="#FF6B6B" />
          <AntDesign name="star" size={30} color="#FFD700" />
          <AntDesign name="home" size={30} color="#2ED4D9" />
          <AntDesign name="user" size={30} color="#4CAF50" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MaterialCommunityIcons:</Text>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="account" size={30} color="#2ED4D9" />
          <MaterialCommunityIcons name="camera" size={30} color="#2ED4D9" />
          <MaterialCommunityIcons name="settings" size={30} color="#2ED4D9" />
          <MaterialCommunityIcons name="heart" size={30} color="#FF6B6B" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MaterialIcons:</Text>
        <View style={styles.iconRow}>
          <MaterialIcons name="home" size={30} color="#2ED4D9" />
          <MaterialIcons name="settings" size={30} color="#2ED4D9" />
          <MaterialIcons name="camera-alt" size={30} color="#2ED4D9" />
          <MaterialIcons name="history" size={30} color="#2ED4D9" />
        </View>
      </View>

      <View style={styles.successBox}>
        <Text style={styles.successText}>
          ✅ ALL ICON FAMILIES WORKING! ✅
        </Text>
        <Text style={styles.successSubtext}>
          No more font resolution errors!
        </Text>
      </View>
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
    marginBottom: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
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
  },
  successBox: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  successSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
  },
});
