// The shape of a single Kobo form entry shown in the list
export type KoboForm = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
};

// The shape of a logged-in user
export type User = {
  username: string;
  token: string;
};

// Auth state held in context
export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Navigation param list — every screen and its expected params
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  FormsList: undefined;
  FormWebView: { form: KoboForm };
};