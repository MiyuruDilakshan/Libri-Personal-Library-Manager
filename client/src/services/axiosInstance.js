import axios from 'axios';

// Create Axios Instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust base URL as needed
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors (e.g. 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            // Optional: Redirect to login or dispatch a logout action if using context/redux outside
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;