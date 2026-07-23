import { Platform } from 'react-native';

const getApiUrl = () => {
  // Android emulator uses 10.0.2.2 to reach host machine's localhost.
  // iOS simulator can use 127.0.0.1 directly.
  // For physical devices, replace with your machine's local network IP.
  const host = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
  return `http://${host}:8000/api/v1`;
};

export const CONFIG = {
  APP_NAME: 'CollectorGO',
  API_URL: getApiUrl(),
} as const;