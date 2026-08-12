import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myTracks: [],
  selectedTrack: null,
  loading: false,
  error: null,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTracksLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyTracks: (state, action) => {
      state.myTracks = action.payload;
      state.loading = false;
    },
    addTrack: (state, action) => {
      state.myTracks.unshift(action.payload);
    },
    updateTrackInList: (state, action) => {
      const idx = state.myTracks.findIndex((t) => t._id === action.payload._id);
      if (idx !== -1) state.myTracks[idx] = action.payload;
    },
    removeTrack: (state, action) => {
      state.myTracks = state.myTracks.filter((t) => t._id !== action.payload);
    },
    setSelectedTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    setTrackError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setTracksLoading,
  setMyTracks,
  addTrack,
  updateTrackInList,
  removeTrack,
  setSelectedTrack,
  setTrackError,
} = trackSlice.actions;
export default trackSlice.reducer;