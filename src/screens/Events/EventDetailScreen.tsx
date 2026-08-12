import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import AppText from '../../components/AppText';

const EventDetailScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppText variant="h2">EventDetailScreen</AppText>
      <AppText variant="body" color="secondary">TODO: build this screen</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
});

export default EventDetailScreen;