'use client';

import React from 'react';

/**
 * Permission-aware component wrapper
 * Shows children only if user has required permissions
 * NO role-only checks allowed
 */
interface PermissionGuardProps {
  children: React.ReactNode;
  /**
   * Permission check function
   */
  hasPermission: boolean;
  /**
   * Fallback to show when permission is denied
   */
  fallback?: React.ReactNode;
}

export function PermissionGuard({ children, hasPermission, fallback = null }: PermissionGuardProps) {
  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
