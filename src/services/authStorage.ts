import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

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
  setTokens: async (accessToken: string, refreshToken: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      notifyAuthChange(true);
    } catch (error) {
      console.warn('Failed to save tokens:', error);
      throw error;
    }
  },

  /**
   * Lưu access token
   */
  setAccessToken: async (accessToken: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      notifyAuthChange(true);
    } catch (error) {
      console.warn('Failed to save access token:', error);
      throw error;
    }
  },

  /**
   * Lấy access token
   */
  getAccessToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.warn('Failed to get access token:', error);
      return null;
    }
  },

  /**
   * Lấy refresh token
   */
  getRefreshToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.warn('Failed to get refresh token:', error);
      return null;
    }
  },

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return !!accessToken;
    } catch (error) {
      console.warn('Failed to check auth:', error);
      return false;
    }
  },

  /**
   * Xóa tất cả tokens
   */
  clearTokens: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
      notifyAuthChange(false);
    } catch (error) {
      console.warn('Failed to clear tokens:', error);
      throw error;
    }
  },

  /**
   * Lưu user info
   */
  setUser: async (user: object): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.warn('Failed to save user:', error);
      throw error;
    }
  },

  /**
   * Lấy user info
   */
  getUser: async (): Promise<object | null> => {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.warn('Failed to get user:', error);
      return null;
    }
  },

  /**
   * Xóa user info
   */
  clearUser: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.warn('Failed to clear user:', error);
      throw error;
    }
  },

  /**
   * Xóa tất cả auth data (tokens + user)
   */
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ]);
      notifyAuthChange(false);
    } catch (error) {
      console.warn('Failed to clear all auth data:', error);
      throw error;
    }
  },
};

export default authStorage;
