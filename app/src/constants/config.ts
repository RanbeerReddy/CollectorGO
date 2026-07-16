import { Platform } from 'react-native';

const getApiUrl = () => {
  // If you are using Android emulator, 10.0.2.2 maps to host's 127.0.0.1
  // If using iOS Simulator or Web, localhost works fine
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api/v1';
  }
  return 'http://127.0.0.1:8000/api/v1';
};

export const CONFIG = {
  APP_NAME: 'CollectorGO',
  API_URL: getApiUrl(),
} as const;