import { NextResponse } from 'next/server';
import { mockLeaves } from '@/lib/mock-data';

/**
 * GET /api/mock/leave/list
 * 
 * Returns list of all leave records
 */
export async function GET() {
  return NextResponse.json({
    leaves: mockLeaves,
    total: mockLeaves.length,
  });
}
