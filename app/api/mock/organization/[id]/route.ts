import { NextRequest, NextResponse } from 'next/server';
import { mockOrganization } from '@/lib/mock-data';

/**
 * GET /api/mock/organization/[id]
 * 
 * Returns a specific organization unit by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Check if requesting the main org
  if (id === mockOrganization.id) {
    return NextResponse.json(mockOrganization);
  }

  // Find the unit
  const unit = mockOrganization.units.find(u => u.id === id);

  if (!unit) {
    return NextResponse.json(
      { error: 'not_found', message: 'Organization unit not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(unit);
}
