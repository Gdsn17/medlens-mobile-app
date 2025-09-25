import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBf7liFNt1vkp5rsv4BBc0xPiJwrB-uBfs",
  authDomain: "medlens-mobile.firebaseapp.com",
  projectId: "medlens-mobile",
  storageBucket: "medlens-mobile.firebasestorage.app",
  messagingSenderId: "855066034375",
  appId: "1:855066034375:web:847bad0b0f49c36b67fee2",
  measurementId: "G-04NHCJ9054"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export the app instance
export default app;
