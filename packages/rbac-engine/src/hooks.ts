import { Permission, UserContext } from './types';
import { rbacEngine } from './engine';

/**
 * React hook for permission checking
 * Usage: const canEdit = usePermission({ resource: 'employee', action: 'update' })
 */
export function createPermissionHook(getUserContext: () => UserContext | null) {
  return function usePermission(permission: Permission): boolean {
    const context = getUserContext();
    if (!context) return false;
    return rbacEngine.hasPermission(context, permission);
  };
}

/**
 * React hook for checking multiple permissions (AND logic)
 */
export function createAllPermissionsHook(getUserContext: () => UserContext | null) {
  return function useAllPermissions(permissions: Permission[]): boolean {
    const context = getUserContext();
    if (!context) return false;
    return rbacEngine.hasAllPermissions(context, permissions);
  };
}

/**
 * React hook for checking multiple permissions (OR logic)
 */
export function createAnyPermissionHook(getUserContext: () => UserContext | null) {
  return function useAnyPermission(permissions: Permission[]): boolean {
    const context = getUserContext();
    if (!context) return false;
    return rbacEngine.hasAnyPermission(context, permissions);
  };
}

/**
 * Higher-order function to create permission guard for server actions
 */
export function createPermissionGuard(getUserContext: () => Promise<UserContext | null>) {
  return async function requirePermission(permission: Permission): Promise<void> {
    const context = await getUserContext();
    if (!context) {
      throw new Error('Unauthorized: No user context');
    }

    if (!rbacEngine.hasPermission(context, permission)) {
      throw new Error(
        `Forbidden: Missing permission ${permission.action} on ${permission.resource}`
      );
    }
  };
}

/**
 * Utility to check permission synchronously (for server components)
 */
export function checkPermission(context: UserContext | null, permission: Permission): boolean {
  if (!context) return false;
  return rbacEngine.hasPermission(context, permission);
}

/**
 * Utility to filter array based on item-level permissions
 */
export function filterByPermission<T>(
  context: UserContext,
  items: T[],
  getPermission: (item: T) => Permission
): T[] {
  return items.filter((item) => {
    const permission = getPermission(item);
    return rbacEngine.hasPermission(context, permission);
  });
}
