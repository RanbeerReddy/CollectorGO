import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { User, Form, FormAssignment, Organization } from '@/types';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/users/');
      return data;
    },
  });
};

export const useForms = () => {
  return useQuery<Form[]>({
    queryKey: ['forms'],
    queryFn: async () => {
      const { data } = await api.get('/forms/');
      return data;
    },
  });
};

export const useAssignments = () => {
  return useQuery<FormAssignment[]>({
    queryKey: ['assignments'],
    queryFn: async () => {
      const { data } = await api.get('/assignments/');
      return data;
    },
  });
};
