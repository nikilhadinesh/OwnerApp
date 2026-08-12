import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find((b) => b._id === id);
      if (booking) booking.status = status;
    },
    setBookingError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setBookingsLoading, setBookings, updateBookingStatus, setBookingError } =
  bookingSlice.actions;
export default bookingSlice.reducer;