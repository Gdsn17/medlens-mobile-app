import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebaseConfig';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://your-production-api.com/api';

class ApiService {
  async getAuthToken() {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  async makeRequest(endpoint, options = {}) {
    const token = await this.getAuthToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Query endpoints
  async submitQuery(imageUri, croppedText, category = 'Other') {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'query_image.jpg',
    });
    formData.append('croppedText', croppedText);
    formData.append('category', category);

    const token = await this.getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit query');
    }

    return await response.json();
  }

  async getQueryHistory(userId, page = 1, limit = 20, category = 'All') {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category !== 'All' && { category }),
    });

    return this.makeRequest(`/query/history/${userId}?${params}`);
  }

  async getQuery(queryId) {
    return this.makeRequest(`/query/${queryId}`);
  }

  // User endpoints
  async getUserProfile() {
    return this.makeRequest('/user/profile');
  }

  async updateUserProfile(profileData) {
    return this.makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async initializeUser(userData) {
    return this.makeRequest('/user/initialize', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserStats() {
    return this.makeRequest('/user/stats');
  }

  async earnTokens(activity, amount = 1) {
    return this.makeRequest('/user/earn-tokens', {
      method: 'POST',
      body: JSON.stringify({ activity, amount }),
    });
  }

  // Upgrade endpoints
  async createSubscription(planId, paymentMethodId) {
    return this.makeRequest('/upgrade/create-subscription', {
      method: 'POST',
      body: JSON.stringify({ planId, paymentMethodId }),
    });
  }

  async confirmSubscription(subscriptionId) {
    return this.makeRequest('/upgrade/confirm-subscription', {
      method: 'POST',
      body: JSON.stringify({ subscriptionId }),
    });
  }

  async getSubscriptionStatus() {
    return this.makeRequest('/upgrade/subscription-status');
  }

  async cancelSubscription() {
    return this.makeRequest('/upgrade/cancel-subscription', {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }
}

export default new ApiService();
