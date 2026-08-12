import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import HomeStack from './HomeStack';
import EventListScreen from '../screens/Events/EventListScreen';
import BookingListScreen from '../screens/Bookings/BookingListScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Events: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Record<keyof MainTabParamList, string> = {
  Home: 'home',
  Bookings: 'calendar',
  Events: 'flag',
  Profile: 'person',
};

const MainTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.tabBarBackground, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Icon name={iconMap[route.name as keyof MainTabParamList]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Bookings" component={BookingListScreen} />
      <Tab.Screen name="Events" component={EventListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;