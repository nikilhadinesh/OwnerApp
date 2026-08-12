import axiosInstance from './axiosInstance';

export const registerOwner = (data) => axiosInstance.post('/owner/register', data);

export const loginOwner = (firebaseUid) => axiosInstance.post('/owner/login', { firebaseUid });

export const getOwnerProfile = () => axiosInstance.get('/owner/profile');

export const uploadKyc = (data) => axiosInstance.put('/owner/kyc', data);

export const completeOnboarding = () => axiosInstance.put('/owner/complete-onboarding');