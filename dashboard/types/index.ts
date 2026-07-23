export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'FIELD_WORKER';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  is_superuser: boolean;
  organization_id: string;
  created_at: string;
}

export interface Form {
  id: string;
  name: string;
  description: string | null;
  kobo_asset_uid: string | null;
  enketo_url: string | null;
  category: string | null;
  organization_id: string;
  is_active: boolean;
  created_at: string;
}

export interface FormAssignment {
  id: string;
  form_id: string;
  user_id: string;
  assigned_by: string;
  status: 'PENDING' | 'COMPLETED';
  assigned_at: string;
  completed_at: string | null;
  created_at: string;
  form?: Form;
  user?: User; // Depending on if we expand it, backend doesn't output user inside assignment currently but frontend might need it
}

export interface Organization {
  id: string;
  name: string;
  code: string;
}

export interface DashboardStats {
  users_count: number;
  forms_count: number;
  assignments_count: number;
  organizations_count: number;
}
