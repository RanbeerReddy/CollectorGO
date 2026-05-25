import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, KoboForm } from '@/types';
import { FormCard } from '@/components/FormCard';
import { FORMS } from '@/constants/forms';
import { useAuth } from '@/hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'FormsList'>;

export function FormsListScreen({ navigation }: Props) {
  const { logout, user } = useAuth();

  const handleFormPress = (form: KoboForm) => {
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
      <FlatList
        data={FORMS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FormCard form={item} onPress={handleFormPress} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No forms available.</Text>}
      />
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
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
});