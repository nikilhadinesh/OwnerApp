import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  owner: null,
  token: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  approvalStatus: 'pending', // pending | under_review | approved | rejected
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      const { owner, token } = action.payload;
      state.owner = owner;
      state.token = token;
      state.isAuthenticated = true;
      state.hasCompletedOnboarding = owner?.hasCompletedOnboarding || false;
      state.approvalStatus = owner?.approvalStatus || 'pending';
      state.loading = false;
      state.error = null;
    },
    updateOwner: (state, action) => {
      state.owner = { ...state.owner, ...action.payload };
      state.approvalStatus = action.payload.approvalStatus || state.approvalStatus;
      state.hasCompletedOnboarding =
        action.payload.hasCompletedOnboarding ?? state.hasCompletedOnboarding;
    },
    logout: (state) => {
      state.owner = null;
      state.token = null;
      state.isAuthenticated = false;
      state.hasCompletedOnboarding = false;
      state.approvalStatus = 'pending';
    },
  },
});

export const { setLoading, setError, loginSuccess, updateOwner, logout } = authSlice.actions;
export default authSlice.reducer;