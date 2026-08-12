import axiosInstance from './axiosInstance';

export const createEvent = (data) => axiosInstance.post('/event', data);

export const getOwnerEvents = () => axiosInstance.get('/event/owner/mine');

export const getEventById = (id) => axiosInstance.get(`/event/${id}`);

export const publishLeaderboard = (id) => axiosInstance.put(`/event/${id}/publish-leaderboard`);