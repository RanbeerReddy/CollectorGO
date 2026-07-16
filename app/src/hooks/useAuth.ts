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
      const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      // data should contain access_token
      if (data.access_token) {
        await login(username, data.access_token);
      } else {
        throw new Error('Authentication token missing');
      }
    } catch (e: any) {
      setError(e.message || 'Login failed. Check your connection.');
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