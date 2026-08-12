import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

// IMPORTANT:
// - Android Emulator: use http://10.0.2.2:5000
// - Physical Android device: use your PC's local IP, e.g. http://192.168.1.5:5000
//   (Run 'ipconfig' on Windows to find it, PC and phone must be on same WiFi)
// - iOS Simulator: http://localhost:5000 works fine
export const BASE_URL = 'http://10.153.201.246:8081/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid token globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;