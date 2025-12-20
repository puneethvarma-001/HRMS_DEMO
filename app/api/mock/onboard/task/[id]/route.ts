import { NextRequest, NextResponse } from 'next/server';
import { mockOnboarding } from '@/lib/mock-data';

/**
 * GET /api/mock/onboard/task/[id]
 * 
 * Returns a specific onboarding task by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Search for the task in all onboarding records
  for (const onboard of mockOnboarding) {
    const task = onboard.tasks.find(t => t.id === id);
    if (task) {
      return NextResponse.json({
        task,
        onboardingId: onboard.id,
        employeeId: onboard.employeeId,
      });
    }
  }

  return NextResponse.json(
    { error: 'not_found', message: 'Task not found' },
    { status: 404 }
  );
}

/**
 * PUT /api/mock/onboard/task/[id]
 * 
 * Update onboarding task status
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'Invalid status' },
        { status: 400 }
      );
    }

    // In a real implementation, this would update the database
    return NextResponse.json({
      success: true,
      task: {
        id,
        status,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to update task' },
      { status: 500 }
    );
  }
}
