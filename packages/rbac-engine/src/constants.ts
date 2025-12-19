/**
 * Standard resource types in the HRMS system
 */
export const Resources = {
  // Employee lifecycle
  EMPLOYEE: 'employee',
  EMPLOYEE_PROFILE: 'employee.profile',
  EMPLOYEE_DOCUMENTS: 'employee.documents',
  EMPLOYEE_ONBOARDING: 'employee.onboarding',
  EMPLOYEE_OFFBOARDING: 'employee.offboarding',

  // Attendance & Leave
  ATTENDANCE: 'attendance',
  LEAVE: 'leave',
  LEAVE_REQUEST: 'leave.request',
  LEAVE_APPROVAL: 'leave.approval',
  TIMESHEET: 'timesheet',

  // Payroll
  PAYROLL: 'payroll',
  PAYROLL_RUN: 'payroll.run',
  SALARY: 'salary',
  PAYSLIP: 'payslip',
  TAX: 'tax',

  // Performance
  PERFORMANCE: 'performance',
  PERFORMANCE_REVIEW: 'performance.review',
  GOALS: 'goals',
  FEEDBACK: 'feedback',

  // Recruitment
  RECRUITMENT: 'recruitment',
  JOB_POSTING: 'recruitment.job_posting',
  CANDIDATE: 'recruitment.candidate',
  INTERVIEW: 'recruitment.interview',

  // Documents
  DOCUMENT: 'document',
  DOCUMENT_TEMPLATE: 'document.template',
  DOCUMENT_SIGNATURE: 'document.signature',

  // Compliance
  COMPLIANCE: 'compliance',
  AUDIT_LOG: 'compliance.audit_log',
  POLICY: 'compliance.policy',

  // Assets
  ASSET: 'asset',
  ASSET_REQUEST: 'asset.request',
  ASSET_ASSIGNMENT: 'asset.assignment',

  // IT Requests
  IT_REQUEST: 'it_request',
  ACCESS_REQUEST: 'it_request.access',

  // Admin
  TENANT: 'tenant',
  ROLE: 'role',
  PERMISSION: 'permission',
  USER: 'user',

  // AI Features
  AI_COPILOT: 'ai.copilot',
  AI_INSIGHTS: 'ai.insights',
  AI_ANALYTICS: 'ai.analytics',
} as const;

/**
 * Standard actions in the RBAC system
 */
export const Actions = {
  // CRUD operations
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  // Special operations
  APPROVE: 'approve',
  REJECT: 'reject',
  SUBMIT: 'submit',
  EXPORT: 'export',
  IMPORT: 'import',

  // Admin operations
  MANAGE: 'manage',
  CONFIGURE: 'configure',

  // AI operations
  QUERY: 'query',
  ANALYZE: 'analyze',
} as const;

export type ResourceType = (typeof Resources)[keyof typeof Resources];
export type ActionType = (typeof Actions)[keyof typeof Actions];
