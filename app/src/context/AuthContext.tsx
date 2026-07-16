import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthState, User } from '@/types';

type AuthContextType = AuthState & {
  login: (username: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setIsLoading: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
const TOKEN_KEY = 'collector_go_jwt';
const USERNAME_KEY = 'collector_go_username';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token on startup
    const loadStoredToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const username = await SecureStore.getItemAsync(USERNAME_KEY);
        
        if (token && username) {
          setUser({ username, token });
        }
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredToken();
  }, []);

  const login = async (username: string, token: string) => {
    setUser({ username, token });
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USERNAME_KEY, username);
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USERNAME_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider');
  }
  return context;
}