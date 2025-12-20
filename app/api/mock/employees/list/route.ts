import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

/**
 * GET /api/mock/employees/list
 * 
 * Returns list of all employees
 */
export async function GET() {
  const employees = mockUsers.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    roles: user.roles,
    jobTitle: user.jobTitle,
    orgUnitId: user.orgUnitId,
    status: user.status,
    hireDate: user.hireDate,
  }));

  return NextResponse.json({
    employees,
    total: employees.length,
  });
}
