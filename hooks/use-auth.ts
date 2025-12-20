"use client"

import { useContext, createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthContextValue, AuthState, Role, Permission, User } from '@/types/auth';
import { getRBACConfig, hasPermission as checkPermission } from '@/lib/rbac';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'hrms_auth_token';
const USER_STORAGE_KEY = 'hrms_auth_user';

export function HRMSAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const rbacConfig = getRBACConfig();

  // Load auth state from storage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        const userJson = localStorage.getItem(USER_STORAGE_KEY);
        
        if (token && userJson) {
          const user = JSON.parse(userJson) as User;
          
          // Check token expiry
          if (user.exp && user.exp * 1000 < Date.now()) {
            // Token expired, clear storage
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            localStorage.removeItem(USER_STORAGE_KEY);
            setState({ ...initialState, isLoading: false });
            return;
          }
          
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState({ ...initialState, isLoading: false });
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
        setState({ ...initialState, isLoading: false });
      }
    };

    loadAuthState();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await fetch('/api/mock/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Authentication failed');
      }

      const data = await response.json();
      const { access_token, id_token, user } = data;

      // Store in localStorage (demo mode - in production use httpOnly cookies)
      localStorage.setItem(TOKEN_STORAGE_KEY, access_token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      setState({
        user,
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const hasPermissionCheck = useCallback((permission: Permission): boolean => {
    if (!state.user || !state.user.roles) return false;
    return checkPermission(rbacConfig, state.user.roles, permission);
  }, [state.user, rbacConfig]);

  const isInRole = useCallback((role: Role): boolean => {
    if (!state.user || !state.user.roles) return false;
    return state.user.roles.includes(role);
  }, [state.user]);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    hasPermission: hasPermissionCheck,
    isInRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an HRMSAuthProvider');
  }
  return context;
}

export { AuthContext };
