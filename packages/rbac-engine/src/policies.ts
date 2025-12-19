import { Policy } from './types';
import { Resources, Actions } from './constants';

/**
 * Default policies for the HRMS system
 * These are starter policies that can be customized per tenant
 */

// Admin policies - full access
export const adminPolicies: Policy[] = [
  {
    id: 'admin-full-access',
    name: 'Admin Full Access',
    description: 'Administrators have full access to all resources',
    effect: 'allow',
    resource: '*',
    actions: ['*'],
    conditions: {
      roles: ['admin', 'super_admin'],
    },
    priority: 100,
  },
];

// HR Manager policies
export const hrManagerPolicies: Policy[] = [
  {
    id: 'hr-employee-manage',
    name: 'HR Employee Management',
    effect: 'allow',
    resource: Resources.EMPLOYEE,
    actions: [Actions.CREATE, Actions.READ, Actions.UPDATE, Actions.DELETE],
    conditions: {
      roles: ['hr_manager'],
    },
    priority: 80,
  },
  {
    id: 'hr-payroll-manage',
    name: 'HR Payroll Management',
    effect: 'allow',
    resource: Resources.PAYROLL,
    actions: [Actions.READ, Actions.UPDATE, Actions.APPROVE],
    conditions: {
      roles: ['hr_manager'],
    },
    priority: 80,
  },
  {
    id: 'hr-leave-approve',
    name: 'HR Leave Approval',
    effect: 'allow',
    resource: Resources.LEAVE_APPROVAL,
    actions: [Actions.APPROVE, Actions.REJECT],
    conditions: {
      roles: ['hr_manager'],
    },
    priority: 80,
  },
];

// Employee self-service policies
export const employeePolicies: Policy[] = [
  {
    id: 'employee-self-read',
    name: 'Employee Self Profile Read',
    effect: 'allow',
    resource: Resources.EMPLOYEE_PROFILE,
    actions: [Actions.READ],
    conditions: {
      roles: ['employee'],
    },
    priority: 50,
  },
  {
    id: 'employee-leave-request',
    name: 'Employee Leave Request',
    effect: 'allow',
    resource: Resources.LEAVE_REQUEST,
    actions: [Actions.CREATE, Actions.READ],
    conditions: {
      roles: ['employee'],
    },
    priority: 50,
  },
  {
    id: 'employee-payslip-read',
    name: 'Employee Payslip Read',
    effect: 'allow',
    resource: Resources.PAYSLIP,
    actions: [Actions.READ],
    conditions: {
      roles: ['employee'],
    },
    priority: 50,
  },
  {
    id: 'employee-attendance-read',
    name: 'Employee Attendance Read',
    effect: 'allow',
    resource: Resources.ATTENDANCE,
    actions: [Actions.READ, Actions.CREATE],
    conditions: {
      roles: ['employee'],
    },
    priority: 50,
  },
];

// Outsourcing user policies (restricted)
export const outsourcingPolicies: Policy[] = [
  {
    id: 'outsourcing-profile-read',
    name: 'Outsourcing User Profile Read',
    effect: 'allow',
    resource: Resources.EMPLOYEE_PROFILE,
    actions: [Actions.READ],
    conditions: {
      roles: ['outsourcing'],
    },
    priority: 40,
  },
  {
    id: 'outsourcing-attendance',
    name: 'Outsourcing Attendance',
    effect: 'allow',
    resource: Resources.ATTENDANCE,
    actions: [Actions.CREATE, Actions.READ],
    conditions: {
      roles: ['outsourcing'],
    },
    priority: 40,
  },
  {
    id: 'outsourcing-deny-payroll',
    name: 'Deny Payroll for Outsourcing',
    effect: 'deny',
    resource: Resources.PAYROLL,
    actions: ['*'],
    conditions: {
      allowOutsourcing: false,
    },
    priority: 90, // Higher priority to override any allow rules
  },
  {
    id: 'outsourcing-deny-ai-insights',
    name: 'Deny AI Insights for Outsourcing',
    effect: 'deny',
    resource: Resources.AI_INSIGHTS,
    actions: ['*'],
    conditions: {
      allowOutsourcing: false,
    },
    priority: 90,
  },
];

// Manager policies
export const managerPolicies: Policy[] = [
  {
    id: 'manager-team-read',
    name: 'Manager Team Read',
    effect: 'allow',
    resource: Resources.EMPLOYEE,
    actions: [Actions.READ],
    conditions: {
      roles: ['manager'],
    },
    priority: 60,
  },
  {
    id: 'manager-leave-approve',
    name: 'Manager Leave Approval',
    effect: 'allow',
    resource: Resources.LEAVE_APPROVAL,
    actions: [Actions.APPROVE, Actions.REJECT],
    conditions: {
      roles: ['manager'],
    },
    priority: 60,
  },
  {
    id: 'manager-performance-review',
    name: 'Manager Performance Review',
    effect: 'allow',
    resource: Resources.PERFORMANCE_REVIEW,
    actions: [Actions.CREATE, Actions.READ, Actions.UPDATE],
    conditions: {
      roles: ['manager'],
    },
    priority: 60,
  },
];

/**
 * Get all default policies
 */
export function getDefaultPolicies(): Policy[] {
  return [
    ...adminPolicies,
    ...hrManagerPolicies,
    ...employeePolicies,
    ...outsourcingPolicies,
    ...managerPolicies,
  ];
}
