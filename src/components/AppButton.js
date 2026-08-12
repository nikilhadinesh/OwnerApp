import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import AppText from './AppText';

// variant: 'primary' | 'outline' | 'text'
const AppButton = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style }) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (variant === 'primary') return colors.primary;
    return 'transparent';
  };

  const getBorderStyle = () => {
    if (variant === 'outline') return { borderWidth: 1.5, borderColor: colors.primary };
    return {};
  };

  const getTextColor = () => {
    if (variant === 'primary') return colors.onAccent;
    return colors.primary;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor(), opacity: disabled ? 0.5 : 1 },
        getBorderStyle(),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <AppText variant="button" color={getTextColor()}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppButton;