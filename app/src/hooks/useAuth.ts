import { useState } from 'react';
import { CONFIG } from '@/constants/config';
import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { login, logout, isAuthenticated, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // MVP: simple credential check against hardcoded values
      // v2: replace with POST to Kobo API or your own auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network

      if (
        username === CONFIG.DEMO_USERNAME &&
        password === CONFIG.DEMO_PASSWORD
      ) {
        login(username, 'demo-token-mvp');
      } else {
        setError('Invalid username or password');
      }
    } catch (e) {
      setError('Login failed. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    logout,
    isAuthenticated,
    isLoading,
    error,
    user,
  };
}