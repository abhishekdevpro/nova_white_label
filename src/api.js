import axios from 'axios';
import { logout } from './store/actions/AuthActions';
import { store } from './store/store'; // Import your Redux store

const api = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1', // Base URL for the API
});

// Add request interceptor to attach token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jobSeekerLoginToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;