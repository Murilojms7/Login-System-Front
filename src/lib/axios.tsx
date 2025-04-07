import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    timeout: 10000, // tempo limite de 10s
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    
        return config;
    },
    (error) => Promise.reject(error)
);

export default api