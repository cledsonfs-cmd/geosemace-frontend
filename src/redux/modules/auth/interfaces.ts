export interface AuthState {
  authorization: Authorization | null;
  loading: boolean;
  error: string | null;
}

export interface Authorization{
  username: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  roles: string[];
}

