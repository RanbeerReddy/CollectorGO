// import React, { useState } from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/types';
// import { useAuth } from '@/hooks/useAuth';
// import { CONFIG } from '@/constants/config';

// type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// export function LoginScreen({ navigation }: Props) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { handleLogin, isLoading, error, isAuthenticated } = useAuth();

//   React.useEffect(() => {
//     if (isAuthenticated) {
//       navigation.replace('FormsList');
//     }
//   }, [isAuthenticated]);

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.inner}>
//         <Text style={styles.title}>{CONFIG.APP_NAME}</Text>
//         <Text style={styles.subtitle}>Sign in to continue</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           placeholderTextColor="#999"
//           value={username}
//           onChangeText={setUsername}
//           autoCapitalize="none"
//           autoCorrect={false}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         {error && <Text style={styles.error}>{error}</Text>}
//         <TouchableOpacity
//           style={[styles.button, isLoading && styles.buttonDisabled]}
//           onPress={() => handleLogin(username, password)}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>
//             {isLoading ? 'Signing in...' : 'Sign In'}
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.hint}>
//           Demo: {CONFIG.DEMO_USERNAME} / {CONFIG.DEMO_PASSWORD}
//         </Text>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F7FA' },
//   inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
//   title: { fontSize: 32, fontWeight: '800', color: '#1976D2', textAlign: 'center', marginBottom: 4 },
//   subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32 },
//   input: {
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 15,
//     color: '#1A1A1A',
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   button: { backgroundColor: '#1976D2', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 8 },
//   buttonDisabled: { backgroundColor: '#90CAF9' },
//   buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
//   error: { color: '#D32F2F', fontSize: 13, marginBottom: 8, textAlign: 'center' },
//   hint: { marginTop: 24, textAlign: 'center', fontSize: 12, color: '#999' },
// });