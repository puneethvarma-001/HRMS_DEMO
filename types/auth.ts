/**
 * RBAC (Role-Based Access Control) Types
 */

export type Role = 'AMP' | 'HR' | 'TA' | 'MANAGER' | 'EMPLOYEE';

export type Permission = string;

export interface RBACConfig {
  [role: string]: Permission[];
}

export interface User {
  id: string;
  sub: string;
  name: string;
  email: string;
  roles: Role[];
  org: {
    id: string;
    name: string;
  };
  iat?: number;
  exp?: number;
  scopes?: string[];
}

export interface DemoTokenPayload {
  iss: string;
  sub: string;
  name: string;
  email: string;
  roles: Role[];
  org: {
    id: string;
    name: string;
  };
  iat: number;
  exp: number;
  scopes: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  isInRole: (role: Role) => boolean;
}
