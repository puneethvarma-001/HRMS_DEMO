import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/mock/attendance/mark
 * 
 * Mark attendance (check-in or check-out)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, type, location } = body;

    if (!employeeId || !type) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['IN', 'OUT'].includes(type)) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'Type must be IN or OUT' },
        { status: 400 }
      );
    }

    const newAttendance = {
      id: `att-${Date.now()}`,
      employeeId,
      timestamp: new Date().toISOString(),
      type,
      location: location || null,
    };

    return NextResponse.json({
      success: true,
      attendance: newAttendance,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}
