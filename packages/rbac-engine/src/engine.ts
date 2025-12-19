import { Permission, Policy, UserContext } from './types';

/**
 * Core RBAC Engine
 * Implements policy-based RBAC with ABAC support
 * NO role-only checks allowed - all checks must be permission-based
 */
export class RBACEngine {
  private policies: Map<string, Policy> = new Map();

  /**
   * Register a policy in the engine
   */
  registerPolicy(policy: Policy): void {
    this.policies.set(policy.id, policy);
  }

  /**
   * Unregister a policy from the engine
   */
  unregisterPolicy(policyId: string): void {
    this.policies.delete(policyId);
  }

  /**
   * Check if user has permission to perform action on resource
   * @param context User context with roles and attributes
   * @param permission Permission to check
   * @param currentTime Optional current time for contract validation (defaults to now)
   * @returns true if user has permission, false otherwise
   */
  hasPermission(context: UserContext, permission: Permission, currentTime?: Date): boolean {
    // Outsourcing users have time-bound access
    if (context.isOutsourcing && context.contractEndDate) {
      const now = currentTime || new Date();
      const contractEnd = new Date(context.contractEndDate);
      if (contractEnd < now) {
        return false; // Contract expired
      }
    }

    // Get all applicable policies
    const applicablePolicies = this.getApplicablePolicies(context, permission);

    // Sort by priority (higher priority first)
    const sortedPolicies = applicablePolicies.sort((a, b) => b.priority - a.priority);

    // Evaluate policies - first matching policy wins
    for (const policy of sortedPolicies) {
      if (this.evaluatePolicy(policy, context, permission)) {
        return policy.effect === 'allow';
      }
    }

    // Default deny if no matching policy
    return false;
  }

  /**
   * Check multiple permissions at once (AND logic)
   */
  hasAllPermissions(context: UserContext, permissions: Permission[]): boolean {
    return permissions.every((permission) => this.hasPermission(context, permission));
  }

  /**
   * Check multiple permissions at once (OR logic)
   */
  hasAnyPermission(context: UserContext, permissions: Permission[]): boolean {
    return permissions.some((permission) => this.hasPermission(context, permission));
  }

  /**
   * Get applicable policies for a permission
   */
  private getApplicablePolicies(context: UserContext, permission: Permission): Policy[] {
    return Array.from(this.policies.values()).filter((policy) => {
      // Check if resource matches (support wildcards)
      const resourceMatches =
        policy.resource === '*' ||
        policy.resource === permission.resource ||
        this.matchesPattern(policy.resource, permission.resource);

      // Check if action matches
      const actionMatches =
        policy.actions.includes('*') || policy.actions.includes(permission.action);

      return resourceMatches && actionMatches;
    });
  }

  /**
   * Evaluate a policy against user context and permission
   */
  private evaluatePolicy(policy: Policy, context: UserContext, permission: Permission): boolean {
    // Check policy conditions
    if (policy.conditions) {
      return this.evaluateConditions(policy.conditions, context, permission);
    }

    return true; // No conditions means policy applies
  }

  /**
   * Evaluate conditions using context and permission
   */
  private evaluateConditions(
    conditions: Record<string, unknown>,
    context: UserContext,
    permission: Permission
  ): boolean {
    // Check tenant matching
    if (conditions['tenantId'] && conditions['tenantId'] !== context.tenantId) {
      return false;
    }

    // Check role requirements
    if (conditions['roles'] && Array.isArray(conditions['roles'])) {
      const requiredRoles = conditions['roles'] as string[];
      if (!requiredRoles.some((role) => context.roles.includes(role))) {
        return false;
      }
    }

    // Check outsourcing restrictions
    if (conditions['allowOutsourcing'] === false && context.isOutsourcing) {
      return false;
    }

    // Check custom conditions from permission
    if (permission.conditions) {
      return this.evaluateCustomConditions(permission.conditions, context);
    }

    return true;
  }

  /**
   * Evaluate custom conditions specific to a permission
   */
  private evaluateCustomConditions(
    conditions: Record<string, unknown>,
    context: UserContext
  ): boolean {
    // Check if user attributes match required conditions
    for (const [key, value] of Object.entries(conditions)) {
      const userValue = context.attributes?.[key];
      if (userValue !== value) {
        return false;
      }
    }

    return true;
  }

  /**
   * Match resource patterns (supports wildcards)
   */
  private matchesPattern(pattern: string, value: string): boolean {
    // Convert wildcard pattern to regex
    const regexPattern = pattern.replace(/\*/g, '.*').replace(/\?/g, '.');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(value);
  }

  /**
   * Get all registered policies
   */
  getPolicies(): Policy[] {
    return Array.from(this.policies.values());
  }

  /**
   * Clear all policies
   */
  clearPolicies(): void {
    this.policies.clear();
  }
}

// Singleton instance
export const rbacEngine = new RBACEngine();
