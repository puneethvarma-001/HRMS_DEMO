import { NextResponse } from 'next/server';
import { mockHolidays } from '@/lib/mock-data';

/**
 * GET /api/mock/holidays/list
 * 
 * Returns list of all holidays
 */
export async function GET() {
  return NextResponse.json({
    holidays: mockHolidays,
    total: mockHolidays.length,
  });
}
