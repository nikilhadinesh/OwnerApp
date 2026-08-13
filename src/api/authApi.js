import axiosInstance from './axiosInstance';

// ---- Phone OTP flow ----
export const registerOwner = (data) => axiosInstance.post('/owner/register', data);

export const loginOwner = (firebaseUid) => axiosInstance.post('/owner/login', { firebaseUid });

// ---- Email / password flow ----
export const registerOwnerEmail = (data) => axiosInstance.post('/owner/register-email', data);

export const loginOwnerEmail = (email, password) =>
  axiosInstance.post('/owner/login-email', { email, password });

export const getOwnerProfile = () => axiosInstance.get('/owner/profile');

export const uploadKyc = (data) => axiosInstance.put('/owner/kyc', data);

export const completeOnboarding = () => axiosInstance.put('/owner/complete-onboarding');