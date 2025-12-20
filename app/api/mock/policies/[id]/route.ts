import { NextRequest, NextResponse } from 'next/server';
import { mockPolicies } from '@/lib/mock-data';

/**
 * GET /api/mock/policies/[id]
 * 
 * Returns a specific policy by ID (with full content)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const policy = mockPolicies.find(p => p.id === id);

  if (!policy) {
    return NextResponse.json(
      { error: 'not_found', message: 'Policy not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(policy);
}

/**
 * POST /api/mock/policies/[id]
 * 
 * Acknowledge a policy
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { employeeId } = body;

    if (!employeeId) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'employeeId is required' },
        { status: 400 }
      );
    }

    const policy = mockPolicies.find(p => p.id === id);

    if (!policy) {
      return NextResponse.json(
        { error: 'not_found', message: 'Policy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      acknowledgement: {
        policyId: id,
        employeeId,
        acknowledgedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to acknowledge policy' },
      { status: 500 }
    );
  }
}
