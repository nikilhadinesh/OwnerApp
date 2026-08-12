import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KycUploadScreen from '../screens/Onboarding/KycUploadScreen';
import UnderReviewScreen from '../screens/Onboarding/UnderReviewScreen';
import ApprovedScreen from '../screens/Onboarding/ApprovedScreen';
import TrackSetupScreen from '../screens/Onboarding/TrackSetupScreen';

export type OnboardingStackParamList = {
  KycUpload: undefined;
  UnderReview: undefined;
  Approved: undefined;
  TrackSetup: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KycUpload" component={KycUploadScreen} />
      <Stack.Screen name="UnderReview" component={UnderReviewScreen} />
      <Stack.Screen name="Approved" component={ApprovedScreen} />
      <Stack.Screen name="TrackSetup" component={TrackSetupScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;