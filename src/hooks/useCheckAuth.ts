import { useEffect, useState } from 'react';

interface UseCheckAuthReturn {
  isLoading: boolean;
  isLoggedIn: boolean;
}

import { storage } from './useAuth';
import { STORAGE_KEYS } from '../config/constants';

export const useCheckAuth = (): UseCheckAuthReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.warn('Failed to check auth:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isLoading, isLoggedIn };
};

export default useCheckAuth;
