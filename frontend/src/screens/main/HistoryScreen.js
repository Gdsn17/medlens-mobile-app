import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '../../components/SimpleIcons';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Radiology', 'Cardiology', 'Dermatology', 'Pathology', 'Other'];

  useEffect(() => {
    if (Platform.OS === 'web') {
      setQueries(getMockQueries());
      setIsLoading(false);
      return;
    }
    loadQueries();
  }, []);

  const loadQueries = async () => {
    try {
      if (auth.currentUser) {
        const q = query(
          collection(db, 'queries'),
          where('uid', '==', auth.currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const queriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQueries(queriesData);
      }
    } catch (error) {
      console.error('Error loading queries:', error);
      // For demo purposes, show mock data
      setQueries(getMockQueries());
    } finally {
      setIsLoading(false);
    }
  };

  const getMockQueries = () => [
    {
      id: '1',
      image_url: 'https://via.placeholder.com/100x100/2ED4D9/FFFFFF?text=X-Ray',
      cropped_text: 'Chest X-ray analysis',
      ai_response: 'Normal chest X-ray with clear lung fields...',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      category: 'Radiology'
    },
    {
      id: '2',
      image_url: 'https://via.placeholder.com/100x100/5A3E85/FFFFFF?text=ECG',
      cropped_text: 'ECG rhythm analysis',
      ai_response: 'Regular sinus rhythm with normal intervals...',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      category: 'Cardiology'
    },
    {
      id: '3',
      image_url: 'https://via.placeholder.com/100x100/2ED4D9/FFFFFF?text=Skin',
      cropped_text: 'Skin lesion examination',
      ai_response: 'Benign appearing lesion with regular borders...',
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      category: 'Dermatology'
    }
  ];

  const filteredQueries = selectedCategory === 'All' 
    ? queries 
    : queries.filter(query => query.category === selectedCategory);

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const renderQueryItem = ({ item }) => (
    <View style={styles.queryCard}>
      <View style={styles.queryHeader}>
        <Image source={{ uri: item.image_url }} style={styles.queryImage} />
        <View style={styles.queryInfo}>
          <Text style={styles.queryTitle}>{item.cropped_text}</Text>
          <Text style={styles.queryDate}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.queryCategory}>{item.category}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#2ED4D9" />
        </TouchableOpacity>
      </View>
      <Text style={styles.queryPreview} numberOfLines={2}>
        {item.ai_response}
      </Text>
    </View>
  );

  const renderCategoryFilter = () => (
    <View style={styles.categoryContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === item && styles.selectedCategoryText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  if (isLoading) {
    return (
      <LinearGradient colors={['#5A3E85', '#1E1E1E']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <MaterialIcons name="history" size={64} color="#2ED4D9" />
          <Text style={styles.loadingText}>Loading your history...</Text>
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Query History</Text>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {renderCategoryFilter()}
        
        {filteredQueries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="inbox" size={64} color="#2ED4D9" />
            <Text style={styles.emptyText}>No queries found</Text>
            <Text style={styles.emptySubText}>
              {selectedCategory === 'All' 
                ? 'Start by taking your first picture!'
                : `No queries in ${selectedCategory} category`
              }
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredQueries}
            renderItem={renderQueryItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.queriesList}
          />
        )}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#2ED4D9',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  queriesList: {
    paddingBottom: 20,
  },
  queryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  queryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  queryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  queryInfo: {
    flex: 1,
  },
  queryTitle: {
    color: '#2ED4D9',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  queryDate: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
  queryCategory: {
    color: '#2ED4D9',
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    padding: 8,
  },
  queryPreview: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    color: '#2ED4D9',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 16,
  },
});
