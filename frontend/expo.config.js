import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'MedLens',
  slug: 'medlens-app',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  icon: './assets/MedLens_Logo.png',
  splash: {
    image: './assets/MedLens.png',
    resizeMode: 'contain',
    backgroundColor: '#5A3E85'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  platforms: ['ios', 'android', 'web'],
  
  // Platform-specific configurations
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.medlens.app',
    icon: './assets/MedLens_Logo.png',
    // Enable Hermes for iOS
    jsEngine: 'hermes'
  },
  
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/MedLens_Logo.png',
      backgroundColor: '#5A3E85'
    },
    package: 'com.medlens.app',
    // Enable Hermes for Android
    jsEngine: 'hermes'
  },
  
  web: {
    favicon: './assets/MedLens_Logo.png',
    // Disable Hermes for Web - Hermes is not supported on web platform
    // and causes "Cannot read properties of undefined (reading 'S')" errors
    // Web uses JavaScriptCore (JSC) by default which is more compatible
    jsEngine: 'jsc'
  },
  
  plugins: [
    'expo-camera',
    'expo-image-picker'
  ],
  
  // Future-proof environment-based configuration
  ...(process.env.EXPO_OS === 'web' && {
    web: {
      ...config.web,
      // Ensure JSC is used on web regardless of other settings
      jsEngine: 'jsc'
    }
  }),
  
  // Development configuration
  developmentClient: {
    silentLaunch: true
  },
  
  // Metro configuration for better web compatibility
  metro: {
    // Disable Hermes for web builds
    ...(process.env.EXPO_OS === 'web' && {
      resolver: {
        platforms: ['web', 'native']
      }
    })
  }
});

/*
CACHE CLEARING AND RESTART INSTRUCTIONS:
=========================================

After making changes to this config file, run these commands:

1. Clear all caches:
   npx expo r -c
   
2. Clear Metro cache specifically:
   npx expo start --clear
   
3. For web development:
   npx expo start --web --clear
   
4. If you still see Hermes errors on web:
   - Delete node_modules/.cache
   - Delete .expo folder
   - Run: npm install
   - Restart: npx expo start --web

WHY HERMES IS DISABLED ON WEB:
==============================
- Hermes JavaScript engine is designed for mobile platforms (iOS/Android)
- Web browsers use their own JavaScript engines (V8, SpiderMonkey, etc.)
- Hermes on web causes compatibility issues and runtime errors
- JavaScriptCore (JSC) is the recommended engine for Expo web builds
- This configuration ensures optimal performance on each platform
*/
