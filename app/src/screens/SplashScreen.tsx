import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { useAuthContext } from '@/context/AuthContext';
import { CONFIG } from '@/constants/config';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { isAuthenticated, setIsLoading } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isAuthenticated) {
        navigation.replace('FormsList');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>{CONFIG.APP_NAME}</Text>
      <Text style={styles.tagline}>NGO Field Data Collection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#BBDEFB',
    marginTop: 8,
  },
});