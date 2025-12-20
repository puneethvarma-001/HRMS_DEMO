import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/mock/holidays/add
 * 
 * Add a new holiday (mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, name, regions } = body;

    if (!date || !name) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'date and name are required' },
        { status: 400 }
      );
    }

    const newHoliday = {
      id: `hol-${date.replace(/-/g, '')}`,
      date,
      name,
      regions: regions || ['ALL'],
    };

    return NextResponse.json({
      success: true,
      holiday: newHoliday,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to add holiday' },
      { status: 500 }
    );
  }
}
