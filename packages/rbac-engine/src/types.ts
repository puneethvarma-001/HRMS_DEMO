import { z } from 'zod';

/**
 * Permission structure for RBAC system
 * Follows policy-based RBAC with ABAC (Attribute-Based Access Control) support
 */
export const PermissionSchema = z.object({
  resource: z.string().describe('Resource type (e.g., employee, payroll, attendance)'),
  action: z.string().describe('Action type (e.g., read, write, delete, approve)'),
  conditions: z
    .record(z.unknown())
    .optional()
    .describe('Context-aware conditions for permission evaluation'),
});

export type Permission = z.infer<typeof PermissionSchema>;

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  permissions: z.array(PermissionSchema),
  isSystemRole: z.boolean().default(false),
});

export type Role = z.infer<typeof RoleSchema>;

export const PolicySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  effect: z.enum(['allow', 'deny']),
  resource: z.string(),
  actions: z.array(z.string()),
  conditions: z.record(z.unknown()).optional(),
  priority: z.number().default(0),
});

export type Policy = z.infer<typeof PolicySchema>;

export const UserContextSchema = z.object({
  userId: z.string(),
  roles: z.array(z.string()),
  tenantId: z.string(),
  attributes: z.record(z.unknown()).optional(),
  isOutsourcing: z.boolean().default(false),
  contractEndDate: z.string().optional(),
});

export type UserContext = z.infer<typeof UserContextSchema>;
