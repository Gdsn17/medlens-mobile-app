import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, List, Divider } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error('Error signing out:', error);
            }
          }
        }
      ]
    );
  };

  const handleMedLensSection = (section) => {
    switch (section) {
      case 'faq':
        Alert.alert('FAQ', 'Frequently Asked Questions will be available soon!');
        break;
      case 'earn':
        Alert.alert('Earn Free Questions', 'Complete tasks to earn free questions!');
        break;
      case 'howto':
        Alert.alert('How to Use', 'Take a picture and get AI-powered medical insights!');
        break;
      case 'privacy':
        Alert.alert('Privacy Policy', 'Privacy policy will be available soon!');
        break;
    }
  };

  const handleCommunitySection = (section) => {
    switch (section) {
      case 'rate':
        Alert.alert('Rate MedLens', 'Thank you for your support! Rating feature coming soon.');
        break;
      case 'discord':
        Alert.alert('Discord', 'Join our Discord community! Link coming soon.');
        break;
      case 'instagram':
        Linking.openURL('https://instagram.com/medlens');
        break;
      case 'tiktok':
        Linking.openURL('https://tiktok.com/@medlens');
        break;
    }
  };

  const handleAboutSection = (section) => {
    switch (section) {
      case 'contact':
        Alert.alert('Contact Us', 'Email: support@medlens.com\nPhone: +1 (555) 123-4567');
        break;
      case 'feedback':
        Alert.alert('Give Feedback', 'We appreciate your feedback! Please email us at feedback@medlens.com');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  const renderSectionItem = (icon, title, onPress, showArrow = true) => (
    <TouchableOpacity style={styles.sectionItem} onPress={onPress}>
      <View style={styles.sectionItemLeft}>
        <MaterialIcons name={icon} size={24} color="#2ED4D9" />
        <Text style={styles.sectionItemText}>{title}</Text>
      </View>
      {showArrow && (
        <MaterialIcons name="arrow-forward-ios" size={16} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image 
            source={require('../../../assets/MedLens_Logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>MedLens</Title>
            {renderSectionItem('help-outline', 'FAQ', () => handleMedLensSection('faq'))}
            <Divider style={styles.divider} />
            {renderSectionItem('gift', 'Earn free questions', () => handleMedLensSection('earn'))}
            <Divider style={styles.divider} />
            {renderSectionItem('help', 'How to use it', () => handleMedLensSection('howto'))}
            <Divider style={styles.divider} />
            {renderSectionItem('privacy-tip', 'Privacy Policy', () => handleMedLensSection('privacy'))}
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Community</Title>
            {renderSectionItem('star', 'Rate MedLens in App Store', () => handleCommunitySection('rate'))}
            <Divider style={styles.divider} />
            {renderSectionItem('chat', 'Join MedLens Discord', () => handleCommunitySection('discord'))}
            <Divider style={styles.divider} />
            {renderSectionItem('camera-alt', 'Follow MedLens on Instagram', () => handleCommunitySection('instagram'))}
            <Divider style={styles.divider} />
            {renderSectionItem('music-note', 'Follow MedLens on TikTok', () => handleCommunitySection('tiktok'))}
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>About</Title>
            {renderSectionItem('email', 'Contact Us', () => handleAboutSection('contact'))}
            <Divider style={styles.divider} />
            {renderSectionItem('feedback', 'Give Feedback', () => handleAboutSection('feedback'))}
            <Divider style={styles.divider} />
            {renderSectionItem('logout', 'Logout', () => handleAboutSection('logout'))}
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>MedLens v1.0.0</Text>
          <Text style={styles.footerSubText}>AI-Powered Medical Learning</Text>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
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
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    color: '#2ED4D9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerSubText: {
    color: '#2ED4D9',
    fontSize: 12,
    marginTop: 4,
  },
});
