import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/mock/ai/payroll-verify
 * 
 * AI-powered payroll verification (mock)
 * Detects anomalies and suspicious patterns in payroll data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payrollRunId, payrollData } = body;

    if (!payrollRunId || !payrollData) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'payrollRunId and payrollData are required' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Analyze payroll data for anomalies
    const analysis = analyzePayrollData(payrollData);

    return NextResponse.json({
      payrollRunId,
      verification_result: {
        anomalies: analysis.anomalies,
        risk_score: analysis.riskScore,
        recommendation: analysis.recommendation,
        checks_performed: analysis.checksPerformed,
        summary: analysis.summary,
      },
      processed_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to verify payroll' },
      { status: 500 }
    );
  }
}

interface PayrollEmployee {
  employeeId: string;
  employeeName?: string;
  gross: number;
  net: number;
  deductions: number;
  previousGross?: number;
}

interface PayrollData {
  employees: PayrollEmployee[];
}

interface Anomaly {
  employeeId: string;
  employeeName?: string;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  details: string;
}

function analyzePayrollData(data: PayrollData): {
  anomalies: Anomaly[];
  riskScore: number;
  recommendation: string;
  checksPerformed: string[];
  summary: string;
} {
  const anomalies: Anomaly[] = [];
  let riskScore = 0;

  const checksPerformed = [
    'Gross/Net ratio check',
    'Deduction percentage validation',
    'Duplicate payment detection',
    'Historical comparison',
    'Statistical outlier detection',
  ];

  if (!data.employees || data.employees.length === 0) {
    return {
      anomalies: [],
      riskScore: 0,
      recommendation: 'No employee data to verify.',
      checksPerformed,
      summary: 'Payroll run is empty.',
    };
  }

  // Check each employee
  for (const emp of data.employees) {
    // Check deduction ratio
    const deductionRatio = emp.deductions / emp.gross;
    if (deductionRatio > 0.5) {
      anomalies.push({
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        issue: 'Unusually high deductions',
        severity: 'high',
        details: `Deductions (${emp.deductions}) are ${Math.round(deductionRatio * 100)}% of gross pay`,
      });
      riskScore += 30;
    } else if (deductionRatio < 0.05) {
      anomalies.push({
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        issue: 'Unusually low deductions',
        severity: 'low',
        details: `Deductions are only ${Math.round(deductionRatio * 100)}% of gross pay`,
      });
      riskScore += 10;
    }

    // Check net calculation
    const expectedNet = emp.gross - emp.deductions;
    if (Math.abs(emp.net - expectedNet) > 1) {
      anomalies.push({
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        issue: 'Net pay calculation mismatch',
        severity: 'high',
        details: `Expected net: ${expectedNet}, Actual: ${emp.net}`,
      });
      riskScore += 25;
    }

    // Check for historical anomalies (mock - random check)
    if (emp.previousGross && emp.gross > emp.previousGross * 2) {
      anomalies.push({
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        issue: 'Gross increased by more than 100%',
        severity: 'high',
        details: `Previous: ${emp.previousGross}, Current: ${emp.gross}`,
      });
      riskScore += 35;
    }
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100);

  // Generate recommendation
  let recommendation: string;
  if (riskScore >= 70) {
    recommendation = 'HIGH RISK: Hold payment and conduct manual review. Multiple anomalies detected that require HR verification.';
  } else if (riskScore >= 40) {
    recommendation = 'MEDIUM RISK: Review flagged items before processing. Some anomalies detected that may require clarification.';
  } else if (anomalies.length > 0) {
    recommendation = 'LOW RISK: Minor anomalies detected. Review recommended but payment can proceed with approval.';
  } else {
    recommendation = 'PASSED: No anomalies detected. Payroll can be processed safely.';
  }

  const summary = `Analyzed ${data.employees.length} employee records. Found ${anomalies.length} anomalies. Overall risk score: ${riskScore}/100.`;

  return {
    anomalies,
    riskScore,
    recommendation,
    checksPerformed,
    summary,
  };
}
