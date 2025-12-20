import { NextResponse } from 'next/server';
import { mockOrganization } from '@/lib/mock-data';

/**
 * GET /api/mock/organization/list
 * 
 * Returns organization structure
 */
export async function GET() {
  return NextResponse.json({
    organization: mockOrganization,
    units: mockOrganization.units,
    total: mockOrganization.units.length,
  });
}
