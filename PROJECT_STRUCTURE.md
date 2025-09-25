# MedLens App - Project Structure

## 📁 Complete File Structure

```
MENLENS-APP/
├── 📱 Frontend (React Native + Expo)
│   ├── App.js                          # Main app component with navigation
│   ├── package.json                    # Frontend dependencies
│   ├── app.json                        # Expo configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── babel.config.js                 # Babel configuration
│   └── src/
│       ├── config/
│       │   └── firebaseConfig.js       # Firebase client configuration
│       ├── navigation/
│       │   ├── OnboardingStack.js      # Onboarding navigation
│       │   └── MainAppStack.js         # Main app navigation
│       ├── screens/
│       │   ├── SplashScreen.js         # App splash screen
│       │   ├── onboarding/
│       │   │   ├── OnboardingScreen1.js # "Take picture/query search"
│       │   │   ├── OnboardingScreen2.js # "Why did you download MedLens?"
│       │   │   ├── OnboardingScreen3.js # "What is your goal?"
│       │   │   └── OnboardingScreen4.js # "Where are you in your study journey?"
│       │   └── main/
│       │       ├── HomeScreen.js       # Main home screen
│       │       ├── CameraScreen.js     # Camera interface
│       │       ├── PreviewScreen.js    # Image preview with crop selection
│       │       ├── ResultScreen.js     # AI analysis results
│       │       ├── HistoryScreen.js    # Query history
│       │       ├── SettingsScreen.js   # App settings
│       │       └── UpgradeScreen.js    # MedLens Pro upgrade
│       └── services/
│           ├── api.js                  # API service layer
│           └── auth.js                 # Authentication service
│
├── 🔧 Backend (Node.js + Express + Firebase)
│   ├── package.json                    # Backend dependencies
│   ├── server.js                       # Express server setup
│   ├── env.example                     # Environment variables template
│   └── routes/
│       ├── query.js                    # Query endpoints
│       ├── user.js                     # User management endpoints
│       └── upgrade.js                  # Subscription endpoints
│   └── config/
│       └── firebase-service-account.json # Firebase admin credentials
│
├── 🔥 Firebase Configuration
│   ├── firebase.json                   # Firebase project configuration
│   ├── firestore.rules                 # Firestore security rules
│   ├── storage.rules                   # Storage security rules
│   └── firestore.indexes.json          # Firestore indexes
│
├── 🚀 DevOps & Deployment
│   ├── .github/
│   │   └── workflows/
│   │       └── deploy.yml              # CI/CD pipeline
│   └── setup.sh                        # Setup script
│
└── 📚 Documentation
    ├── README.md                       # Main documentation
    └── PROJECT_STRUCTURE.md            # This file
```

## 🎨 Design System

### Brand Colors
- **Primary Purple**: #5A3E85
- **Accent Cyan**: #2ED4D9
- **White**: #FFFFFF
- **Dark Gray**: #1E1E1E

### UI Components
- **Buttons**: Rounded, filled with #2ED4D9, white text
- **Backgrounds**: Purple gradient (#5A3E85 → #1E1E1E)
- **Cards**: Semi-transparent with rounded corners
- **Typography**: Clean, medical-focused fonts

## 🔄 App Flow

### 1. Onboarding Flow
```
Splash → Onboarding1 → Onboarding2 → Onboarding3 → Onboarding4 → Main App
```

### 2. Main App Flow
```
Home → Camera → Preview → Result → History/Settings
```

### 3. Navigation Structure
```
App
├── Onboarding Stack
│   ├── Onboarding1
│   ├── Onboarding2
│   ├── Onboarding3
│   └── Onboarding4
└── Main App Stack
    ├── Main Tabs
    │   ├── Home
    │   ├── History
    │   └── Settings
    ├── Camera
    ├── Preview
    ├── Result
    └── Upgrade
```

## 🗄️ Database Schema

### Firestore Collections

#### `users` Collection
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  studyLevel: string,
  goals: string[],
  tokens: number,
  isPro: boolean,
  stripeCustomerId?: string,
  subscriptionId?: string,
  preferences: {
    notifications: boolean,
    darkMode: boolean,
    language: string
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `queries` Collection
```javascript
{
  uid: string,
  image_url: string,
  cropped_text: string,
  ai_response: {
    analysis: string,
    confidence: string,
    recommendations: string[],
    keyFindings: string[]
  },
  category: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🔌 API Endpoints

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

## 🛠️ Development Commands

### Frontend
```bash
npm start              # Start Expo development server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
expo build:ios        # Build for iOS
```

### Backend
```bash
cd backend
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests
```

### Firebase
```bash
firebase deploy      # Deploy to Firebase
firebase serve       # Serve locally
```

## 🔐 Security Features

- Firebase Authentication
- Firestore security rules
- Storage access control
- API rate limiting
- Token-based query limits
- Input validation with Joi

## 📱 Platform Support

- **iOS**: Full support with Xcode integration
- **Android**: Full support with Android Studio
- **Web**: Limited support (camera not available)

## 🚀 Deployment

1. **Backend**: Firebase Functions
2. **Frontend**: Expo build service
3. **Database**: Firebase Firestore
4. **Storage**: Firebase Storage
5. **Hosting**: Firebase Hosting

## 📊 Monitoring

- Firebase Analytics
- Crashlytics integration
- Performance monitoring
- Custom event tracking

---

This structure provides a complete, production-ready mobile app with all the requested features and more!
