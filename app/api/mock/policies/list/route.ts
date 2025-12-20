import { NextResponse } from 'next/server';
import { mockPolicies } from '@/lib/mock-data';

/**
 * GET /api/mock/policies/list
 * 
 * Returns list of all company policies
 */
export async function GET() {
  // Return policies without full content for list view
  const policiesSummary = mockPolicies.map(policy => ({
    id: policy.id,
    title: policy.title,
    version: policy.version,
    effectiveDate: policy.effectiveDate,
    category: policy.category,
    acknowledgements: policy.acknowledgements,
    totalEmployees: policy.totalEmployees,
  }));

  return NextResponse.json({
    policies: policiesSummary,
    total: policiesSummary.length,
  });
}
