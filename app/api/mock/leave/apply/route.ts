import { NextRequest, NextResponse } from 'next/server';
import { mockLeaves } from '@/lib/mock-data';

/**
 * POST /api/mock/leave/apply
 * 
 * Apply for leave (mock - just returns success with new ID)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, type, startDate, endDate, reason } = body;

    if (!employeeId || !type || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newLeave = {
      id: `leave-${Date.now()}`,
      employeeId,
      type,
      startDate,
      endDate,
      reason: reason || '',
      status: 'PENDING',
      approverId: 'user:demo-mgr-001',
      createdAt: new Date().toISOString(),
    };

    // In a real implementation, this would persist to a database
    // For demo, we just return the created record
    return NextResponse.json({
      success: true,
      leave: newLeave,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to apply for leave' },
      { status: 500 }
    );
  }
}
