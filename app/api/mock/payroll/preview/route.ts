import { NextResponse } from 'next/server';
import { mockPayrollRuns } from '@/lib/mock-data';

/**
 * GET /api/mock/payroll/preview
 * 
 * Returns the current draft payroll run for preview
 */
export async function GET() {
  const draftRun = mockPayrollRuns.find(run => run.status === 'DRAFT');
  
  if (!draftRun) {
    return NextResponse.json(
      { error: 'not_found', message: 'No draft payroll run found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    payrollRun: draftRun,
    summary: {
      totalEmployees: draftRun.employees.length,
      totalGross: draftRun.employees.reduce((sum, e) => sum + e.gross, 0),
      totalNet: draftRun.employees.reduce((sum, e) => sum + e.net, 0),
      totalDeductions: draftRun.employees.reduce((sum, e) => sum + e.deductions, 0),
    },
  });
}
