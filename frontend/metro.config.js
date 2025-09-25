const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Keep asset support
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];

module.exports = config;