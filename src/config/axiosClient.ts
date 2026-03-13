import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '@/constants';
import { storage } from '@/hooks/useAuth';

// Tạo axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Biến theo dõi refresh token đang được xử lý
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Danh sách các endpoint không cần token (auth endpoints)
const NO_TOKEN_ENDPOINTS = [
  '/api/auth/login',
  '/api/auth/login-with-otp',
  '/api/auth/login-with-firebase',
  '/api/auth/register',
  '/api/auth/register-with-otp',
  '/api/auth/register-with-firebase',
  '/api/auth/refresh',
  '/api/auth/forgot-password',
  '/api/auth/verify-otp',
  '/api/auth/reset-password',
  '/api/auth/send-login-otp',
  '/api/auth/send-register-otp',
  '/api/auth/resend-otp',
  '/api/auth/check-existence',
];

// Request interceptor - Thêm token vào headers (trừ auth endpoints)
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip token cho các endpoint auth
    const isAuthEndpoint = NO_TOKEN_ENDPOINTS.some(endpoint =>
      config.url?.includes(endpoint)
    );

    if (!isAuthEndpoint) {
      const token = await storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý response và refresh token
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Đang refresh, đợi và thử lại
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await storage.getString(STORAGE_KEYS.REFRESH_TOKEN);

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Gọi API refresh
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Lưu token mới
         storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

        // Thử lại request ban đầu
        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        // Xóa token và chuyển về login
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
