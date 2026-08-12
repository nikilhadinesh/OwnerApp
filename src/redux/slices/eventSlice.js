import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myEvents: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyEvents: (state, action) => {
      state.myEvents = action.payload;
      state.loading = false;
    },
    addEvent: (state, action) => {
      state.myEvents.unshift(action.payload);
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setEventError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setEventsLoading, setMyEvents, addEvent, setSelectedEvent, setEventError } =
  eventSlice.actions;
export default eventSlice.reducer;