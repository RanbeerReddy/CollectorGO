import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, AppForm, FormAssignment } from '@/types';
import { FormCard } from '@/components/FormCard';
import { useAuth } from '@/hooks/useAuth';
import { CONFIG } from '@/constants/config';

type Props = NativeStackScreenProps<RootStackParamList, 'FormsList'>;

export function FormsListScreen({ navigation }: Props) {
  const { logout, user } = useAuth();
  const [assignments, setAssignments] = useState<FormAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    if (!user?.token) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${CONFIG.API_URL}/assignments/my`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to load assignments');
      }

      const data = await res.json();
      setAssignments(data);
    } catch (err: any) {
      setError(err.message || 'Error loading forms');
    } finally {
      setIsLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleFormPress = (form: AppForm) => {
    navigation.navigate('FormWebView', { form });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.username}</Text>
          <Text style={styles.subtitle}>Select a form to begin</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1976D2" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity onPress={fetchAssignments} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={assignments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FormCard form={item.form} onPress={handleFormPress} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No forms assigned to you.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  greeting: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  subtitle: { fontSize: 13, color: '#666666', marginTop: 2 },
  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFF3F3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutText: { color: '#D32F2F', fontSize: 13, fontWeight: '600' },
  list: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
  error: { color: '#D32F2F', fontSize: 14, marginBottom: 16 },
  retryBtn: { padding: 12, backgroundColor: '#1976D2', borderRadius: 8 },
  retryText: { color: 'white', fontWeight: 'bold' }
});