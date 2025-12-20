import { NextRequest, NextResponse } from 'next/server';
import { mockPayrollRuns } from '@/lib/mock-data';

/**
 * POST /api/mock/payroll/run
 * 
 * Execute a payroll run (mock - updates status to PROCESSING)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { runId } = body;

    if (!runId) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'runId is required' },
        { status: 400 }
      );
    }

    const payrollRun = mockPayrollRuns.find(run => run.runId === runId);

    if (!payrollRun) {
      return NextResponse.json(
        { error: 'not_found', message: 'Payroll run not found' },
        { status: 404 }
      );
    }

    // In a real implementation, this would trigger the payroll processing
    // For demo, we return a success response with updated status
    return NextResponse.json({
      success: true,
      payrollRun: {
        ...payrollRun,
        status: 'PROCESSING',
        startedAt: new Date().toISOString(),
      },
      message: 'Payroll run initiated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to run payroll' },
      { status: 500 }
    );
  }
}
