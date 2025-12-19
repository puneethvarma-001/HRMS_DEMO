import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee } from '../types';
import { EmployeeService } from '../services';

/**
 * Hook to get employees list
 */
export function useEmployees(
  employeeService: EmployeeService,
  params?: {
    department?: string;
    status?: string;
    page?: number;
    limit?: number;
  }
) {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => employeeService.getEmployees(params),
  });
}

/**
 * Hook to get single employee
 */
export function useEmployee(employeeService: EmployeeService, id: string) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getEmployee(id),
    enabled: !!id,
  });
}

/**
 * Hook to create employee
 */
export function useCreateEmployee(employeeService: EmployeeService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Employee, 'id'>) => employeeService.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}

/**
 * Hook to update employee
 */
export function useUpdateEmployee(employeeService: EmployeeService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Employee> }) =>
      employeeService.updateEmployee(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['employee', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}

/**
 * Hook to delete employee
 */
export function useDeleteEmployee(employeeService: EmployeeService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => employeeService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}

/**
 * Hook to get employee onboarding
 */
export function useOnboarding(employeeService: EmployeeService, employeeId: string) {
  return useQuery({
    queryKey: ['onboarding', employeeId],
    queryFn: () => employeeService.getOnboarding(employeeId),
    enabled: !!employeeId,
  });
}

/**
 * Hook to get employee offboarding
 */
export function useOffboarding(employeeService: EmployeeService, employeeId: string) {
  return useQuery({
    queryKey: ['offboarding', employeeId],
    queryFn: () => employeeService.getOffboarding(employeeId),
    enabled: !!employeeId,
  });
}
