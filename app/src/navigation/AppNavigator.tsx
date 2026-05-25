import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { SplashScreen } from '@/screens/SplashScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { FormsListScreen } from '@/screens/FormsListScreen';
import { FormWebViewScreen } from '@/screens/FormWebViewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="FormsList"
          component={FormsListScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="FormWebView"
          component={FormWebViewScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params.form.name,
            headerBackTitle: 'Forms',
            headerTintColor: '#1976D2',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}