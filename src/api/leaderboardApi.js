import axiosInstance from './axiosInstance';

export const addLapTime = (eventId, data) =>
  axiosInstance.post(`/leaderboard/${eventId}/lap`, data);

export const getLeaderboard = (eventId) => axiosInstance.get(`/leaderboard/${eventId}`);