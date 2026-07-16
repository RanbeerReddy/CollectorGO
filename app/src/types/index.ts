export type AppForm = {
  id: string;
  name: string;
  description: string | null;
  enketo_url: string | null;
  category: string | null;
};

export type FormAssignment = {
  id: string;
  form_id: string;
  user_id: string;
  status: 'PENDING' | 'COMPLETED';
  form: AppForm;
};

export type User = {
  username: string;
  token: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  FormsList: undefined;
  FormWebView: { form: AppForm };
};