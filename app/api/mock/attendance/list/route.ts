import { NextResponse } from 'next/server';
import { mockAttendance } from '@/lib/mock-data';

/**
 * GET /api/mock/attendance/list
 * 
 * Returns list of all attendance records
 */
export async function GET() {
  return NextResponse.json({
    attendance: mockAttendance,
    total: mockAttendance.length,
  });
}
