import { createApiClient } from '@hrms/api-client';
import { Employee, Onboarding, Offboarding } from '../types';

/**
 * Employee service for API calls
 */
export class EmployeeService {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiClient: ReturnType<typeof createApiClient>) {
    this.apiClient = apiClient;
  }

  /**
   * Get all employees
   */
  async getEmployees(params?: {
    department?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ employees: Employee[]; total: number }> {
    return this.apiClient.get('/employees', {
      params: params as Record<string, string>,
    });
  }

  /**
   * Get employee by ID
   */
  async getEmployee(id: string): Promise<Employee> {
    return this.apiClient.get(`/employees/${id}`);
  }

  /**
   * Create new employee
   */
  async createEmployee(data: Omit<Employee, 'id'>): Promise<Employee> {
    return this.apiClient.post('/employees', data);
  }

  /**
   * Update employee
   */
  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    return this.apiClient.patch(`/employees/${id}`, data);
  }

  /**
   * Delete employee
   */
  async deleteEmployee(id: string): Promise<void> {
    return this.apiClient.delete(`/employees/${id}`);
  }

  /**
   * Get employee onboarding
   */
  async getOnboarding(employeeId: string): Promise<Onboarding> {
    return this.apiClient.get(`/employees/${employeeId}/onboarding`);
  }

  /**
   * Update onboarding progress
   */
  async updateOnboarding(
    employeeId: string,
    data: Partial<Onboarding>
  ): Promise<Onboarding> {
    return this.apiClient.patch(`/employees/${employeeId}/onboarding`, data);
  }

  /**
   * Initiate offboarding
   */
  async initiateOffboarding(
    employeeId: string,
    data: Omit<Offboarding, 'id' | 'status'>
  ): Promise<Offboarding> {
    return this.apiClient.post(`/employees/${employeeId}/offboarding`, data);
  }

  /**
   * Get employee offboarding
   */
  async getOffboarding(employeeId: string): Promise<Offboarding> {
    return this.apiClient.get(`/employees/${employeeId}/offboarding`);
  }

  /**
   * Update offboarding progress
   */
  async updateOffboarding(
    employeeId: string,
    data: Partial<Offboarding>
  ): Promise<Offboarding> {
    return this.apiClient.patch(`/employees/${employeeId}/offboarding`, data);
  }
}
