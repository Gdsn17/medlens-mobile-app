import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

export default function UpgradeScreen() {
  const navigation = useNavigation();

  const handleUpgrade = () => {
    // Mock upgrade process
    Alert.alert(
      'Upgrade to MedLens Pro',
      'This would normally redirect to Stripe payment. For demo purposes, this is a placeholder.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue Demo', onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const features = [
    {
      icon: 'all-inclusive',
      title: 'Unlimited Queries',
      description: 'Ask as many questions as you need'
    },
    {
      icon: 'speed',
      title: 'Priority Processing',
      description: 'Get faster AI responses'
    },
    {
      icon: 'analytics',
      title: 'Advanced Analytics',
      description: 'Detailed insights and progress tracking'
    },
    {
      icon: 'support',
      title: 'Premium Support',
      description: '24/7 customer support'
    },
    {
      icon: 'cloud-sync',
      title: 'Cloud Sync',
      description: 'Access your data across all devices'
    },
    {
      icon: 'security',
      title: 'Enhanced Security',
      description: 'Advanced data protection'
    }
  ];

  const plans = [
    {
      name: 'Monthly',
      price: '$9.99',
      period: '/month',
      popular: false
    },
    {
      name: 'Yearly',
      price: '$99.99',
      period: '/year',
      popular: true,
      savings: 'Save 17%'
    }
  ];

  return (
    <LinearGradient
      colors={['#5A3E85', '#1E1E1E']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MedLens Pro</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <MaterialIcons name="star" size={64} color="#2ED4D9" />
          <Text style={styles.heroTitle}>Upgrade to MedLens Pro</Text>
          <Text style={styles.heroSubtitle}>
            Unlock unlimited AI-powered medical insights and advanced features
          </Text>
        </View>

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Pro Features</Title>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons name={feature.icon} size={24} color="#2ED4D9" />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.plansCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Choose Your Plan</Title>
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.planOption,
                  plan.popular && styles.popularPlan
                ]}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  {plan.savings && (
                    <Text style={styles.savingsText}>{plan.savings}</Text>
                  )}
                </View>
                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleUpgrade}
            style={styles.upgradeButton}
            labelStyle={styles.upgradeButtonText}
          >
            Start Free Trial
          </Button>
          <Text style={styles.trialText}>
            7-day free trial, then $9.99/month
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cancel anytime. No commitment required.
          </Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#2ED4D9',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    borderRadius: 12,
  },
  plansCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 30,
    borderRadius: 12,
  },
  cardTitle: {
    color: '#2ED4D9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureContent: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  planOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  popularPlan: {
    borderColor: '#2ED4D9',
    backgroundColor: 'rgba(46, 212, 217, 0.1)',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#2ED4D9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savingsText: {
    color: '#2ED4D9',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    color: '#2ED4D9',
    fontSize: 24,
    fontWeight: 'bold',
  },
  planPeriod: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 4,
    opacity: 0.7,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: '#2ED4D9',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trialText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    color: '#2ED4D9',
    fontSize: 12,
    textAlign: 'center',
  },
});
