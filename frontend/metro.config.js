const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Keep asset support and ensure fonts are resolved
config.resolver.assetExts = [...config.resolver.assetExts, 'ttf'];

module.exports = config;