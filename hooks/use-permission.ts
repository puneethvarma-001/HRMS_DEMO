"use client"

import { useMemo } from 'react';
import { useAuth } from './use-auth';
import type { Permission, Role } from '@/types/auth';
import { getRBACConfig, hasPermission as checkPermission, getPermissionsForRoles } from '@/lib/rbac';

/**
 * Hook to check permissions for the current user
 */
export function usePermission(permission?: Permission): boolean {
  const { user, isAuthenticated } = useAuth();
  const rbacConfig = getRBACConfig();

  return useMemo(() => {
    if (!permission) return true; // No permission required
    if (!isAuthenticated || !user || !user.roles) return false;
    return checkPermission(rbacConfig, user.roles, permission);
  }, [permission, isAuthenticated, user, rbacConfig]);
}

/**
 * Hook to check multiple permissions (all must be satisfied)
 */
export function usePermissions(permissions: Permission[]): boolean {
  const { user, isAuthenticated } = useAuth();
  const rbacConfig = getRBACConfig();

  return useMemo(() => {
    if (permissions.length === 0) return true;
    if (!isAuthenticated || !user || !user.roles) return false;
    return permissions.every(p => checkPermission(rbacConfig, user.roles, p));
  }, [permissions, isAuthenticated, user, rbacConfig]);
}

/**
 * Hook to check if user has any of the specified permissions
 */
export function useAnyPermission(permissions: Permission[]): boolean {
  const { user, isAuthenticated } = useAuth();
  const rbacConfig = getRBACConfig();

  return useMemo(() => {
    if (permissions.length === 0) return true;
    if (!isAuthenticated || !user || !user.roles) return false;
    return permissions.some(p => checkPermission(rbacConfig, user.roles, p));
  }, [permissions, isAuthenticated, user, rbacConfig]);
}

/**
 * Hook to check if user is in a specific role
 */
export function useRole(role: Role): boolean {
  const { user, isAuthenticated } = useAuth();

  return useMemo(() => {
    if (!isAuthenticated || !user || !user.roles) return false;
    return user.roles.includes(role);
  }, [role, isAuthenticated, user]);
}

/**
 * Hook to check if user is in any of the specified roles
 */
export function useAnyRole(roles: Role[]): boolean {
  const { user, isAuthenticated } = useAuth();

  return useMemo(() => {
    if (roles.length === 0) return true;
    if (!isAuthenticated || !user || !user.roles) return false;
    return roles.some(r => user.roles.includes(r));
  }, [roles, isAuthenticated, user]);
}

/**
 * Hook to get all permissions for the current user
 */
export function useUserPermissions(): Permission[] {
  const { user, isAuthenticated } = useAuth();
  const rbacConfig = getRBACConfig();

  return useMemo(() => {
    if (!isAuthenticated || !user || !user.roles) return [];
    return getPermissionsForRoles(rbacConfig, user.roles);
  }, [isAuthenticated, user, rbacConfig]);
}
