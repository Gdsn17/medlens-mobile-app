#!/bin/bash

echo "🚀 Setting up MedLens App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Create environment files
echo "⚙️ Creating environment files..."
if [ ! -f backend/.env ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env - Please update with your Firebase credentials"
fi

# Create Firebase service account file placeholder
if [ ! -f backend/config/firebase-service-account.json ]; then
    echo "⚠️  Please add your Firebase service account key to backend/config/firebase-service-account.json"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up Firebase project at https://console.firebase.google.com"
echo "2. Update src/config/firebaseConfig.js with your Firebase config"
echo "3. Add your Firebase service account key to backend/config/firebase-service-account.json"
echo "4. Update backend/.env with your Firebase and Stripe credentials"
echo "5. Run 'expo start' to start the development server"
echo "6. Run 'cd backend && npm run dev' to start the backend server"
echo ""
echo "For detailed setup instructions, see README.md"
