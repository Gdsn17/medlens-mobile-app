import { 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import ApiService from './api';

class AuthService {
  // Sign in anonymously (for demo purposes)
  async signInAnonymously() {
    try {
      const result = await signInAnonymously(auth);
      await this.initializeUserIfNeeded(result.user);
      return result.user;
    } catch (error) {
      console.error('Anonymous sign in error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  async signInWithEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await this.initializeUserIfNeeded(result.user);
      return result.user;
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  }

  // Create account with email and password
  async createAccountWithEmail(email, password, displayName) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await result.user.updateProfile({ displayName });
      
      await this.initializeUserIfNeeded(result.user, { displayName });
      return result.user;
    } catch (error) {
      console.error('Account creation error:', error);
      throw error;
    }
  }

  // Sign in with Google (requires additional setup)
  async signInWithGoogle(googleCredential) {
    try {
      const credential = GoogleAuthProvider.credential(googleCredential);
      const result = await signInWithCredential(auth, credential);
      await this.initializeUserIfNeeded(result.user);
      return result.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Initialize user data if needed
  async initializeUserIfNeeded(user, additionalData = {}) {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        const userData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || additionalData.displayName || '',
          tokens: 5, // Start with 5 free tokens
          isPro: false,
          studyLevel: additionalData.studyLevel || 'other',
          goals: additionalData.goals || [],
          preferences: {
            notifications: true,
            darkMode: false,
            language: 'en'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await setDoc(doc(db, 'users', user.uid), userData);
        console.log('User initialized with default data');
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!auth.currentUser;
  }

  // Get user profile from Firestore
  async getUserProfile() {
    try {
      const user = this.getCurrentUser();
      if (!user) {
        throw new Error('No authenticated user');
      }

      return await ApiService.getUserProfile();
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(profileData) {
    try {
      return await ApiService.updateUserProfile(profileData);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Get user tokens
  async getUserTokens() {
    try {
      const profile = await this.getUserProfile();
      return profile.profile.tokens;
    } catch (error) {
      console.error('Error getting user tokens:', error);
      return 0;
    }
  }

  // Check if user is Pro
  async isProUser() {
    try {
      const profile = await this.getUserProfile();
      return profile.profile.isPro;
    } catch (error) {
      console.error('Error checking Pro status:', error);
      return false;
    }
  }
}

export default new AuthService();
