# MedLens - AI-Powered Medical Learning App

A complete mobile MVP app for medical learning with AI-powered image analysis, built with React Native, Node.js, and Firebase.

## 🚀 Features

### Frontend (React Native + Expo)
- **Onboarding Flow**: 4-screen guided setup
- **Camera Integration**: Take pictures of medical images
- **AI Analysis**: Mock AI responses for medical image analysis
- **Token System**: 5 free queries, upgrade to Pro for unlimited
- **History**: View past queries with categorization
- **Settings**: Comprehensive settings with community links
- **MedLens Pro**: Subscription upgrade screen

### Backend (Node.js + Express + Firebase)
- **Firebase Authentication**: Anonymous, email, and Google sign-in
- **Firebase Firestore**: User data and query storage
- **Firebase Storage**: Image upload and management
- **Token Management**: Track and manage user query limits
- **Stripe Integration**: Subscription payments (mock)
- **RESTful API**: Complete API for all app functionality

### Brand Design
- **Primary Purple**: #5A3E85
- **Accent Cyan**: #2ED4D9
- **Clean UI**: Modern, medical-focused design
- **Responsive**: Works on all screen sizes

## 📱 Screenshots

The app includes:
- Splash screen with MedLens branding
- 4-step onboarding process
- Home screen with camera access
- Camera interface with image capture
- Preview screen with crop selection
- AI analysis results screen
- Query history with categories
- Settings with community links
- MedLens Pro upgrade screen

## 🛠️ Tech Stack

### Frontend
- React Native with Expo
- React Navigation
- React Native Paper
- NativeWind (Tailwind CSS)
- Expo Camera
- Firebase SDK
- AsyncStorage

### Backend
- Node.js with Express
- Firebase Admin SDK
- Firebase Firestore
- Firebase Storage
- Stripe (for payments)
- Multer (file uploads)
- Sharp (image processing)

### DevOps
- Firebase Hosting
- Firebase Functions
- Firestore Security Rules
- GitHub Actions (CI/CD)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- Firebase project
- iOS Simulator (for testing)

### 1. Clone and Install
```bash
git clone <repository-url>
cd MENLENS-APP
npm install
cd backend
npm install
```

### 2. Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
4. Update `src/config/firebaseConfig.js` with your Firebase config
5. Update `backend/config/firebase-service-account.json` with your service account key

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your Firebase and Stripe credentials
npm run dev
```

### 4. Frontend Setup
```bash
# In the root directory
expo start
# Press 'i' for iOS simulator
```

### 5. Run on iOS Simulator
```bash
expo start --ios
```

## 📁 Project Structure

```
MENLENS-APP/
├── src/
│   ├── screens/
│   │   ├── onboarding/     # 4 onboarding screens
│   │   └── main/          # Main app screens
│   ├── navigation/        # Navigation stacks
│   ├── services/          # API and auth services
│   └── config/           # Firebase configuration
├── backend/
│   ├── routes/           # API routes
│   ├── config/           # Backend configuration
│   └── server.js         # Express server
├── assets/               # App assets
├── firebase.json         # Firebase configuration
├── firestore.rules       # Firestore security rules
└── storage.rules         # Storage security rules
```

## 🔧 Configuration

### Firebase Configuration
Update `src/config/firebaseConfig.js`:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "medlens-app.firebaseapp.com",
  projectId: "medlens-app",
  storageBucket: "medlens-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Backend Environment
Create `backend/.env`:
```env
FIREBASE_PROJECT_ID=medlens-app
FIREBASE_STORAGE_BUCKET=medlens-app.appspot.com
STRIPE_SECRET_KEY=sk_test_...
PORT=3000
```

## 📱 App Flow

### Onboarding
1. **Splash Screen**: MedLens logo and branding
2. **Screen 1**: App introduction with preview cards
3. **Screen 2**: "Why did you download MedLens?" (Study, Practice, Diagnosis, Other)
4. **Screen 3**: "What is your goal?" (Multiple selection)
5. **Screen 4**: "Where are you in your study journey?" (Pre-med, Med student, etc.)

### Main App
1. **Home Screen**: Camera access, token display, feature cards
2. **Camera Screen**: Take pictures with instructions
3. **Preview Screen**: Crop selection for analysis
4. **Result Screen**: AI analysis with findings and recommendations
5. **History Screen**: Past queries with category filtering
6. **Settings Screen**: App settings, community links, account management
7. **Upgrade Screen**: MedLens Pro subscription plans

## 🔐 Security

- Firebase Authentication for user management
- Firestore security rules for data protection
- Storage rules for file access control
- API rate limiting and validation
- Token-based query limits

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
firebase deploy --only functions
```

### Frontend Deployment
```bash
expo build:ios
# Upload to App Store Connect
```

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
npm test
```

## 📄 API Documentation

### Authentication
- `POST /api/user/initialize` - Initialize new user
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Queries
- `POST /api/query` - Submit medical query
- `GET /api/query/history/:userId` - Get query history
- `GET /api/query/:queryId` - Get specific query

### Upgrades
- `POST /api/upgrade/create-subscription` - Create Stripe subscription
- `POST /api/upgrade/confirm-subscription` - Confirm subscription
- `GET /api/upgrade/subscription-status` - Get subscription status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@medlens.com or join our Discord community.

## 🔮 Future Enhancements

- Real OpenAI GPT-4o-mini integration
- Advanced image processing
- Real-time collaboration
- Offline mode
- Multi-language support
- Advanced analytics dashboard
- Integration with medical databases

---

**MedLens** - AI-Powered Medical Learning Platform
Built with ❤️ for medical students and healthcare professionals
