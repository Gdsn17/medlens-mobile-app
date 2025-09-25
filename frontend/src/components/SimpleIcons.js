import React from 'react';
import { Text, StyleSheet } from 'react-native';

// COMPLETE VECTOR ICON ELIMINATION - USING ONLY EMOJI/TEXT ICONS

// Basic Icons
export const HomeIcon = (props) => <Text style={[styles.icon, props.style]}>🏠</Text>;
export const UserIcon = (props) => <Text style={[styles.icon, props.style]}>👤</Text>;
export const MenuIcon = (props) => <Text style={[styles.icon, props.style]}>☰</Text>;
export const SearchIcon = (props) => <Text style={[styles.icon, props.style]}>🔍</Text>;
export const CheckIcon = (props) => <Text style={[styles.icon, { color: 'green' }, props.style]}>✓</Text>;
export const CloseIcon = (props) => <Text style={[styles.icon, props.style]}>×</Text>;
export const BackIcon = (props) => <Text style={[styles.icon, props.style]}>←</Text>;
export const ForwardIcon = (props) => <Text style={[styles.icon, props.style]}>→</Text>;
export const RightIcon = (props) => <Text style={[styles.icon, props.style]}>›</Text>;
export const StarIcon = (props) => <Text style={[styles.icon, props.style]}>⭐</Text>;
export const HeartIcon = (props) => <Text style={[styles.icon, props.style]}>❤️</Text>;
export const PlusIcon = (props) => <Text style={[styles.icon, props.style]}>+</Text>;
export const MinusIcon = (props) => <Text style={[styles.icon, props.style]}>−</Text>;
export const SettingsIcon = (props) => <Text style={[styles.icon, props.style]}>⚙️</Text>;
export const CameraIcon = (props) => <Text style={[styles.icon, props.style]}>📷</Text>;
export const HistoryIcon = (props) => <Text style={[styles.icon, props.style]}>📋</Text>;
export const MailIcon = (props) => <Text style={[styles.icon, props.style]}>📧</Text>;
export const PhoneIcon = (props) => <Text style={[styles.icon, props.style]}>📱</Text>;
export const NotificationIcon = (props) => <Text style={[styles.icon, props.style]}>🔔</Text>;
export const InfoIcon = (props) => <Text style={[styles.icon, props.style]}>ℹ️</Text>;
export const WarningIcon = (props) => <Text style={[styles.icon, props.style]}>⚠️</Text>;
export const ErrorIcon = (props) => <Text style={[styles.icon, props.style]}>❌</Text>;
export const SuccessIcon = (props) => <Text style={[styles.icon, props.style]}>✅</Text>;
export const RefreshIcon = (props) => <Text style={[styles.icon, props.style]}>↻</Text>;
export const InboxIcon = (props) => <Text style={[styles.icon, props.style]}>📥</Text>;
export const FireIcon = (props) => <Text style={[styles.icon, props.style]}>🔥</Text>;
export const PsychologyIcon = (props) => <Text style={[styles.icon, props.style]}>🧠</Text>;
export const MoreIcon = (props) => <Text style={[styles.icon, props.style]}>⋮</Text>;

// Universal Icon Component - Replaces ALL vector icons
export const MaterialIcons = ({ name, size = 24, color = '#FFFFFF', ...props }) => {
  const iconMap = {
    'home': '🏠',
    'settings': '⚙️',
    'camera-alt': '📷',
    'history': '📋',
    'arrow-back': '←',
    'arrow-forward': '→',
    'arrow-forward-ios': '›',
    'check': '✓',
    'check-circle': '✓',
    'verified': '✓',
    'star': '⭐',
    'psychology': '🧠',
    'refresh': '↻',
    'inbox': '📥',
    'local-fire-department': '🔥',
    'menu': '☰',
    'more-vert': '⋮',
    'close': '×',
    'add': '+',
    'remove': '−',
    'info': 'ℹ️',
    'warning': '⚠️',
    'error': '❌',
    'success': '✅',
  };

  const emoji = iconMap[name] || '?';
  return <Text style={[styles.icon, { fontSize: size, color }, props.style]}>{emoji}</Text>;
};

// AntDesign replacement
export const AntDesign = ({ name, size = 24, color = '#FFFFFF', ...props }) => {
  const iconMap = {
    'home': '🏠',
    'user': '👤',
    'setting': '⚙️',
    'back': '←',
    'right': '→',
    'left': '←',
    'heart': '❤️',
    'star': '⭐',
    'search': '🔍',
    'close': '×',
    'check': '✓',
    'plus': '+',
    'minus': '−',
    'mail': '📧',
    'phone': '📱',
    'camera': '📷',
    'menu': '☰',
  };

  const emoji = iconMap[name] || '?';
  return <Text style={[styles.icon, { fontSize: size, color }, props.style]}>{emoji}</Text>;
};

// Feather replacement
export const Feather = ({ name, size = 24, color = '#FFFFFF', ...props }) => {
  const iconMap = {
    'menu': '☰',
    'search': '🔍',
    'x': '×',
    'check': '✓',
    'home': '🏠',
    'user': '👤',
    'settings': '⚙️',
    'camera': '📷',
    'heart': '❤️',
    'star': '⭐',
    'plus': '+',
    'minus': '−',
    'arrow-left': '←',
    'arrow-right': '→',
    'mail': '📧',
    'phone': '📱',
  };

  const emoji = iconMap[name] || '?';
  return <Text style={[styles.icon, { fontSize: size, color }, props.style]}>{emoji}</Text>;
};

// Ionicons replacement
export const Ionicons = ({ name, size = 24, color = '#FFFFFF', ...props }) => {
  const iconMap = {
    'mail': '📧',
    'call': '📱',
    'notifications': '🔔',
    'home': '🏠',
    'person': '👤',
    'settings': '⚙️',
    'camera': '📷',
    'heart': '❤️',
    'star': '⭐',
    'search': '🔍',
    'close': '×',
    'checkmark': '✓',
    'add': '+',
    'remove': '−',
    'menu': '☰',
    'arrow-back': '←',
    'arrow-forward': '→',
  };

  const emoji = iconMap[name] || '?';
  return <Text style={[styles.icon, { fontSize: size, color }, props.style]}>{emoji}</Text>;
};

// MaterialCommunityIcons replacement
export const MaterialCommunityIcons = ({ name, size = 24, color = '#FFFFFF', ...props }) => {
  const iconMap = {
    'account': '👤',
    'camera': '📷',
    'settings': '⚙️',
    'heart': '❤️',
    'star': '⭐',
    'home': '🏠',
    'menu': '☰',
    'search': '🔍',
    'close': '×',
    'check': '✓',
    'plus': '+',
    'minus': '−',
    'arrow-left': '←',
    'arrow-right': '→',
    'mail': '📧',
    'phone': '📱',
  };

  const emoji = iconMap[name] || '?';
  return <Text style={[styles.icon, { fontSize: size, color }, props.style]}>{emoji}</Text>;
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});