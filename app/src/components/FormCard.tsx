import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KoboForm } from '@/types';

type Props = {
  form: KoboForm;
  onPress: (form: KoboForm) => void;
};

export function FormCard({ form, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(form)}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{form.category}</Text>
      </View>
      <Text style={styles.name}>{form.name}</Text>
      <Text style={styles.description}>{form.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#1976D2',
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666666',
  },
});