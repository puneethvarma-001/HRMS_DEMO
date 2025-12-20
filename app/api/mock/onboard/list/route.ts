import { NextResponse } from 'next/server';
import { mockOnboarding } from '@/lib/mock-data';

/**
 * GET /api/mock/onboard/list
 * 
 * Returns list of all onboarding records
 */
export async function GET() {
  return NextResponse.json({
    onboarding: mockOnboarding,
    total: mockOnboarding.length,
  });
}
