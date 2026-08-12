import axiosInstance from './axiosInstance';

export const createTrack = (data) => axiosInstance.post('/track', data);

export const getMyTracks = () => axiosInstance.get('/track/owner/mine');

export const getTrackById = (id) => axiosInstance.get(`/track/${id}`);

export const updateTrack = (id, data) => axiosInstance.put(`/track/${id}`, data);

export const deleteTrack = (id) => axiosInstance.delete(`/track/${id}`);

export const generateSlots = (trackId, data) =>
  axiosInstance.post(`/track/${trackId}/slots/generate`, data);

export const addCustomSlot = (trackId, data) =>
  axiosInstance.post(`/track/${trackId}/slots/custom`, data);

export const getSlotsByDate = (trackId, date) =>
  axiosInstance.get(`/track/${trackId}/slots`, { params: { date } });