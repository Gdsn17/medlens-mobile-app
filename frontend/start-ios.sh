#!/bin/bash

# Set environment variables to completely disable file watching
export EXPO_NO_DOTENV=1
export METRO_WATCHER_TYPE=none
export EXPO_NO_WATCHMAN=1
export NODE_OPTIONS="--max-old-space-size=4096"

# Increase file limit
ulimit -n 65536

# Start Expo with iOS simulator
npx expo start --ios