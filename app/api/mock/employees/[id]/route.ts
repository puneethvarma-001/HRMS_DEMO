import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/lib/mock-data';

/**
 * GET /api/mock/employees/[id]
 * 
 * Returns a specific employee by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = findUserById(id);

  if (!user) {
    return NextResponse.json(
      { error: 'not_found', message: 'Employee not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
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
  });
}
