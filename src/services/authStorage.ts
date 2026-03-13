import { createMMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from '@/constants';

const storage = createMMKV();

// Event emitter đơn giản để notify auth changes
type AuthChangeListener = (isLoggedIn: boolean) => void;
const listeners: AuthChangeListener[] = [];

const notifyAuthChange = (isLoggedIn: boolean) => {
  listeners.forEach((listener) => listener(isLoggedIn));
};

// Subscribe to auth changes
export const subscribeAuthChange = (listener: AuthChangeListener): (() => void) => {
  listeners.push(listener);
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

export const authStorage = {
  /**
   * Lưu access token và refresh token
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    try {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      notifyAuthChange(true);
    } catch (error) {
      console.warn('Failed to save tokens:', error);
      throw error;
    }
  },

  /**
   * Lưu access token
   */
  setAccessToken: (accessToken: string): void => {
    try {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      notifyAuthChange(true);
    } catch (error) {
      console.warn('Failed to save access token:', error);
      throw error;
    }
  },

  /**
   * Lấy access token
   */
  getAccessToken: (): string | null => {
    try {
      return storage.getString(STORAGE_KEYS.ACCESS_TOKEN) ?? null;
    } catch (error) {
      console.warn('Failed to get access token:', error);
      return null;
    }
  },

  /**
   * Lấy refresh token
   */
  getRefreshToken: (): string | null => {
    try {
      return storage.getString(STORAGE_KEYS.REFRESH_TOKEN) ?? null;
    } catch (error) {
      console.warn('Failed to get refresh token:', error);
      return null;
    }
  },

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isAuthenticated: (): boolean => {
    try {
      const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
      return !!accessToken;
    } catch (error) {
      console.warn('Failed to check auth:', error);
      return false;
    }
  },

  /**
   * Xóa tất cả tokens
   */
  clearTokens: (): void => {
    try {
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      notifyAuthChange(false);
    } catch (error) {
      console.warn('Failed to clear tokens:', error);
      throw error;
    }
  },

  /**
   * Lưu user info
   */
  setUser: (user: object): void => {
    try {
      storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.warn('Failed to save user:', error);
      throw error;
    }
  },

  /**
   * Lấy user info
   */
  getUser: (): object | null => {
    try {
      const userJson = storage.getString(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.warn('Failed to get user:', error);
      return null;
    }
  },

  /**
   * Xóa user info
   */
  clearUser: (): void => {
    try {
      storage.remove(STORAGE_KEYS.USER);
    } catch (error) {
      console.warn('Failed to clear user:', error);
      throw error;
    }
  },

  /**
   * Xóa tất cả auth data (tokens + user)
   */
  clearAll: (): void => {
    try {
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      storage.remove(STORAGE_KEYS.USER);
      notifyAuthChange(false);
    } catch (error) {
      console.warn('Failed to clear all auth data:', error);
      throw error;
    }
  },
};

export default authStorage;
