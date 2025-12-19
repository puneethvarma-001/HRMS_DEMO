import { z } from 'zod';

/**
 * Employee schema
 */
export const EmployeeSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string(),
  position: z.string(),
  managerId: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'terminated']),
  tenantId: z.string(),
  isOutsourcing: z.boolean().default(false),
  contractEndDate: z.string().optional(),
  // Sensitive fields
  ssn: z.string().optional(),
  bankAccount: z.string().optional(),
  salary: z.number().optional(),
});

export type Employee = z.infer<typeof EmployeeSchema>;

/**
 * Employee onboarding schema
 */
export const OnboardingSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      completed: z.boolean(),
      dueDate: z.string().optional(),
    })
  ),
  assignedTo: z.string(),
  startDate: z.string(),
  completedDate: z.string().optional(),
});

export type Onboarding = z.infer<typeof OnboardingSchema>;

/**
 * Employee offboarding schema
 */
export const OffboardingSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  status: z.enum(['initiated', 'in_progress', 'completed']),
  reason: z.enum(['resignation', 'termination', 'retirement', 'contract_end']),
  lastWorkingDay: z.string(),
  exitInterview: z
    .object({
      completed: z.boolean(),
      date: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
  assetReturns: z.array(
    z.object({
      assetId: z.string(),
      assetName: z.string(),
      returned: z.boolean(),
      returnDate: z.string().optional(),
    })
  ),
});

export type Offboarding = z.infer<typeof OffboardingSchema>;
