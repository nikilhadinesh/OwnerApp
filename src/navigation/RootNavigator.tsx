import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';
import MainTabNavigator from './MainTabNavigator';

// Using `any` here since store.js is plain JS (no RootState export).
// If you later convert src/redux/store.js -> store.ts, replace this with RootState.
const RootNavigator = () => {
  const { isAuthenticated, hasCompletedOnboarding, approvalStatus } = useSelector(
    (state: any) => state.auth
  );

  const renderFlow = () => {
    if (!isAuthenticated) {
      return <AuthStack />;
    }
    if (approvalStatus !== 'approved' || !hasCompletedOnboarding) {
      return <OnboardingStack />;
    }
    return <MainTabNavigator />;
  };

  return <NavigationContainer>{renderFlow()}</NavigationContainer>;
};

export default RootNavigator;