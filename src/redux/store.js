import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import trackReducer from './slices/trackSlice';
import bookingReducer from './slices/bookingSlice';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    track: trackReducer,
    booking: bookingReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;