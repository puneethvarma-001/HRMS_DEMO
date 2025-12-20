/**
 * RBAC (Role-Based Access Control) Utilities
 * 
 * Parses RBAC_CONFIG from environment variables and provides
 * permission checking utilities.
 */

import type { RBACConfig, Role, Permission } from '@/types/auth';

/**
 * Parse RBAC configuration from environment variable
 */
export function parseRBACConfig(configString?: string): RBACConfig {
  if (!configString) {
    // Return default configuration if not provided
    return {
      AMP: ['*'],
      HR: ['employees.*', 'leave.*', 'onboard.*', 'policies.*', 'payroll.review'],
      TA: ['candidates.*', 'resume.analyze', 'screening.call'],
      MANAGER: ['team.view', 'team.approve', 'leave.approve', 'attendance.review'],
      EMPLOYEE: ['self.view', 'leave.apply', 'attendance.mark', 'payslip.view']
    };
  }

  try {
    return JSON.parse(configString);
  } catch (error) {
    console.error('Failed to parse RBAC_CONFIG:', error);
    return {};
  }
}

/**
 * Get the RBAC configuration from environment
 */
export function getRBACConfig(): RBACConfig {
  // Use client-side env variable if available
  const configString = typeof window !== 'undefined' 
    ? process.env.NEXT_PUBLIC_RBAC_CONFIG
    : process.env.RBAC_CONFIG || process.env.NEXT_PUBLIC_RBAC_CONFIG;
  
  return parseRBACConfig(configString);
}

/**
 * Check if a permission matches a pattern
 * Supports wildcard patterns like "employees.*" or "*"
 */
export function matchesPermission(pattern: Permission, permission: Permission): boolean {
  // Exact match
  if (pattern === permission) return true;
  
  // Wildcard match for all permissions
  if (pattern === '*') return true;
  
  // Wildcard suffix match (e.g., "employees.*" matches "employees.read")
  if (pattern.endsWith('.*')) {
    const prefix = pattern.slice(0, -2);
    return permission.startsWith(prefix + '.');
  }
  
  return false;
}

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(
  rbacConfig: RBACConfig, 
  role: Role, 
  permission: Permission
): boolean {
  const permissions = rbacConfig[role] || [];
  return permissions.some(p => matchesPermission(p, permission));
}

/**
 * Check if any of the given roles has a specific permission
 */
export function hasPermission(
  rbacConfig: RBACConfig,
  roles: Role[],
  permission: Permission
): boolean {
  return roles.some(role => roleHasPermission(rbacConfig, role, permission));
}

/**
 * Get all permissions for a set of roles
 */
export function getPermissionsForRoles(
  rbacConfig: RBACConfig,
  roles: Role[]
): Permission[] {
  const permissions = new Set<Permission>();
  
  for (const role of roles) {
    const rolePermissions = rbacConfig[role] || [];
    for (const permission of rolePermissions) {
      permissions.add(permission);
    }
  }
  
  return Array.from(permissions);
}

/**
 * Check if dummy OAuth2 mode is enabled
 */
export function isDummyOAuthMode(): boolean {
  return process.env.OAUTH2_DUMMY_MODE === 'true' || 
         process.env.NEXT_PUBLIC_OAUTH2_DUMMY_MODE === 'true';
}

/**
 * Check if OAuth2 is enabled
 */
export function isOAuthEnabled(): boolean {
  return process.env.OAUTH2_ENABLED === 'true' ||
         process.env.NEXT_PUBLIC_OAUTH2_ENABLED === 'true';
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(featureName: string): boolean {
  const envKey = `ENABLE_FEATURE_${featureName.toUpperCase()}`;
  return process.env[envKey] === 'true' || 
         process.env[`NEXT_PUBLIC_${envKey}`] === 'true';
}
