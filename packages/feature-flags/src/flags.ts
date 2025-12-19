/**
 * Feature flags for the HRMS system
 * Allows gradual rollout of features per tenant
 */

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  tenants?: string[]; // If specified, only enabled for these tenants
}

export const featureFlags: Record<string, FeatureFlag> = {
  AI_COPILOT: {
    key: 'AI_COPILOT',
    name: 'AI Copilot',
    description: 'Enable AI-powered assistance across the platform',
    enabled: true,
  },
  ADVANCED_ANALYTICS: {
    key: 'ADVANCED_ANALYTICS',
    name: 'Advanced Analytics',
    description: 'Enable advanced analytics and reporting features',
    enabled: true,
  },
  OUTSOURCING_PORTAL: {
    key: 'OUTSOURCING_PORTAL',
    name: 'Outsourcing Portal',
    description: 'Enable outsourcing user portal and features',
    enabled: true,
  },
  PERFORMANCE_REVIEWS: {
    key: 'PERFORMANCE_REVIEWS',
    name: 'Performance Reviews',
    description: 'Enable performance review module',
    enabled: true,
  },
  RECRUITMENT_MODULE: {
    key: 'RECRUITMENT_MODULE',
    name: 'Recruitment Module',
    description: 'Enable recruitment and applicant tracking',
    enabled: true,
  },
  DOCUMENT_SIGNING: {
    key: 'DOCUMENT_SIGNING',
    name: 'Document Signing',
    description: 'Enable electronic document signatures',
    enabled: false, // Not yet released
  },
  MULTI_CURRENCY: {
    key: 'MULTI_CURRENCY',
    name: 'Multi-Currency Support',
    description: 'Enable multi-currency payroll',
    enabled: false, // Coming soon
  },
};

export class FeatureFlagManager {
  private flags: Map<string, FeatureFlag>;

  constructor(flags: Record<string, FeatureFlag> = featureFlags) {
    this.flags = new Map(Object.entries(flags));
  }

  /**
   * Check if a feature is enabled
   */
  isEnabled(key: string, tenantId?: string): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;

    // Global check
    if (!flag.enabled) return false;

    // Tenant-specific check
    if (flag.tenants && tenantId) {
      return flag.tenants.includes(tenantId);
    }

    return true;
  }

  /**
   * Enable a feature
   */
  enable(key: string, tenantId?: string): void {
    const flag = this.flags.get(key);
    if (!flag) return;

    if (tenantId) {
      // Enable for specific tenant
      if (!flag.tenants) {
        flag.tenants = [];
      }
      if (!flag.tenants.includes(tenantId)) {
        flag.tenants.push(tenantId);
      }
    } else {
      // Enable globally
      flag.enabled = true;
    }
  }

  /**
   * Disable a feature
   */
  disable(key: string, tenantId?: string): void {
    const flag = this.flags.get(key);
    if (!flag) return;

    if (tenantId && flag.tenants) {
      // Disable for specific tenant
      flag.tenants = flag.tenants.filter((t) => t !== tenantId);
    } else {
      // Disable globally
      flag.enabled = false;
    }
  }

  /**
   * Get all flags
   */
  getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  /**
   * Get enabled flags for a tenant
   */
  getEnabledFlags(tenantId?: string): FeatureFlag[] {
    return this.getAllFlags().filter((flag) => this.isEnabled(flag.key, tenantId));
  }
}

// Singleton instance
export const featureFlagManager = new FeatureFlagManager();
