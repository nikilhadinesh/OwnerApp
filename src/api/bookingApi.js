import axiosInstance from './axiosInstance';

export const getOwnerBookings = () => axiosInstance.get('/booking/owner');

export const cancelBooking = (id) => axiosInstance.put(`/booking/${id}/cancel`);