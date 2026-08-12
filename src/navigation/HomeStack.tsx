import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Home/DashboardScreen';
import TrackListScreen from '../screens/Track/TrackListScreen';
import AddEditTrackScreen from '../screens/Track/AddEditTrackScreen';
import TrackDetailScreen from '../screens/Track/TrackDetailScreen';
import SlotCalendarScreen from '../screens/Slots/SlotCalendarScreen';
import BookingListScreen from '../screens/Bookings/BookingListScreen';
import BookingDetailScreen from '../screens/Bookings/BookingDetailScreen';
import EventListScreen from '../screens/Events/EventListScreen';
import CreateEventScreen from '../screens/Events/CreateEventScreen';
import EventDetailScreen from '../screens/Events/EventDetailScreen';
import LapTimeUploadScreen from '../screens/Leaderboard/LapTimeUploadScreen';
import NotificationScreen from '../screens/Notifications/NotificationScreen';

export type HomeStackParamList = {
  Dashboard: undefined;
  TrackList: undefined;
  AddEditTrack: { trackId?: string } | undefined;
  TrackDetail: { trackId: string };
  SlotCalendar: { trackId: string };
  BookingList: undefined;
  BookingDetail: { bookingId: string };
  EventList: undefined;
  CreateEvent: { trackId?: string } | undefined;
  EventDetail: { eventId: string };
  LapTimeUpload: { eventId: string };
  Notifications: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="AddEditTrack" component={AddEditTrackScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
      <Stack.Screen name="SlotCalendar" component={SlotCalendarScreen} />
      <Stack.Screen name="BookingList" component={BookingListScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
      <Stack.Screen name="EventList" component={EventListScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="LapTimeUpload" component={LapTimeUploadScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;