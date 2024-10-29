import axios from "axios";
import { getFromLocalStorage } from "../utils/LocalStorage";
import { ServerAddress } from "./UrlServerAddress";

// Instance axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: ServerAddress,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor để xử lý request (có thể đưa Authenticate token vào)
// Tạm thời bỏ qua interceptors
axiosInstance.interceptors.request.use(
    async config => {
        const token = getFromLocalStorage('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };

        return config;
    },
    error => Promise.reject(error)
);

// Interceptor để xử lý response
axiosInstance.interceptors.response.use(
    response => {
        // Làm gì đó với dữ liệu response
        return response;
    },
    error => {
        // Xử lý lỗi response
        console.log(`Lỗi khi tải dữ liệu: ${error}`);
        return;
    }
);

export default axiosInstance;