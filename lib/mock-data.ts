/**
 * Mock Data Seed
 * 
 * Contains all the mock data for the HRMS demo application.
 * This data is used by the mock API endpoints.
 */

import type { Role } from '@/types/auth';

// Demo Users
export const mockUsers = [
  {
    id: 'user:demo-amp-001',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'AMP' as Role,
    roles: ['AMP'] as Role[],
    jobTitle: 'System Administrator',
    orgUnitId: 'ou-001',
    status: 'active',
    hireDate: '2020-01-01',
  },
  {
    id: 'user:demo-hr-001',
    firstName: 'Sarah',
    lastName: 'HR Manager',
    email: 'hr@demo.com',
    password: 'hr123',
    role: 'HR' as Role,
    roles: ['HR'] as Role[],
    jobTitle: 'HR Director',
    orgUnitId: 'ou-002',
    status: 'active',
    hireDate: '2021-03-15',
  },
  {
    id: 'user:demo-ta-001',
    firstName: 'Tom',
    lastName: 'Recruiter',
    email: 'ta@demo.com',
    password: 'ta123',
    role: 'TA' as Role,
    roles: ['TA'] as Role[],
    jobTitle: 'Talent Acquisition Specialist',
    orgUnitId: 'ou-002',
    status: 'active',
    hireDate: '2022-06-01',
  },
  {
    id: 'user:demo-mgr-001',
    firstName: 'Bob',
    lastName: 'Manager',
    email: 'manager@demo.com',
    password: 'manager123',
    role: 'MANAGER' as Role,
    roles: ['MANAGER'] as Role[],
    jobTitle: 'Engineering Manager',
    orgUnitId: 'ou-003',
    status: 'active',
    hireDate: '2021-08-20',
  },
  {
    id: 'user:demo-emp-001',
    firstName: 'Alice',
    lastName: 'Developer',
    email: 'employee@demo.com',
    password: 'employee123',
    role: 'EMPLOYEE' as Role,
    roles: ['EMPLOYEE'] as Role[],
    jobTitle: 'Software Engineer',
    orgUnitId: 'ou-003',
    status: 'active',
    hireDate: '2023-01-15',
  },
  {
    id: 'user:demo-emp-002',
    firstName: 'Charlie',
    lastName: 'Designer',
    email: 'charlie@demo.com',
    password: 'charlie123',
    role: 'EMPLOYEE' as Role,
    roles: ['EMPLOYEE'] as Role[],
    jobTitle: 'UX Designer',
    orgUnitId: 'ou-003',
    status: 'active',
    hireDate: '2023-03-01',
  },
];

// Organization Structure
export const mockOrganization = {
  id: 'org-demo-001',
  name: 'Demo Corp',
  units: [
    {
      id: 'ou-001',
      name: 'Executive',
      parentId: null,
      managerId: 'user:demo-amp-001',
    },
    {
      id: 'ou-002',
      name: 'Human Resources',
      parentId: 'ou-001',
      managerId: 'user:demo-hr-001',
    },
    {
      id: 'ou-003',
      name: 'Engineering',
      parentId: 'ou-001',
      managerId: 'user:demo-mgr-001',
    },
    {
      id: 'ou-004',
      name: 'Frontend Team',
      parentId: 'ou-003',
      managerId: 'user:demo-mgr-001',
    },
    {
      id: 'ou-005',
      name: 'Backend Team',
      parentId: 'ou-003',
      managerId: 'user:demo-mgr-001',
    },
  ],
};

// Leave Records
export const mockLeaves = [
  {
    id: 'leave-1001',
    employeeId: 'user:demo-emp-001',
    employeeName: 'Alice Developer',
    type: 'PAID',
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    status: 'PENDING',
    approverId: 'user:demo-mgr-001',
    reason: 'Family vacation',
  },
  {
    id: 'leave-1002',
    employeeId: 'user:demo-emp-002',
    employeeName: 'Charlie Designer',
    type: 'SICK',
    startDate: '2025-01-15',
    endDate: '2025-01-15',
    status: 'APPROVED',
    approverId: 'user:demo-mgr-001',
    reason: 'Medical appointment',
  },
  {
    id: 'leave-1003',
    employeeId: 'user:demo-emp-001',
    employeeName: 'Alice Developer',
    type: 'UNPAID',
    startDate: '2025-02-10',
    endDate: '2025-02-12',
    status: 'PENDING',
    approverId: 'user:demo-mgr-001',
    reason: 'Personal matters',
  },
];

// Attendance Records
export const mockAttendance = [
  {
    id: 'att-001',
    employeeId: 'user:demo-emp-001',
    employeeName: 'Alice Developer',
    timestamp: '2025-01-10T09:02:00Z',
    type: 'IN',
    location: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 'att-002',
    employeeId: 'user:demo-emp-001',
    employeeName: 'Alice Developer',
    timestamp: '2025-01-10T18:15:00Z',
    type: 'OUT',
    location: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 'att-003',
    employeeId: 'user:demo-emp-002',
    employeeName: 'Charlie Designer',
    timestamp: '2025-01-10T09:30:00Z',
    type: 'IN',
    location: { lat: 12.9716, lng: 77.5946 },
  },
];

// Payroll Data
export const mockPayrollRuns = [
  {
    runId: 'pr-2025-01',
    periodStart: '2025-01-01',
    periodEnd: '2025-01-31',
    status: 'DRAFT',
    employees: [
      { employeeId: 'user:demo-emp-001', employeeName: 'Alice Developer', gross: 5000, net: 4200, deductions: 800 },
      { employeeId: 'user:demo-emp-002', employeeName: 'Charlie Designer', gross: 4500, net: 3780, deductions: 720 },
    ],
  },
  {
    runId: 'pr-2024-12',
    periodStart: '2024-12-01',
    periodEnd: '2024-12-31',
    status: 'COMPLETED',
    employees: [
      { employeeId: 'user:demo-emp-001', employeeName: 'Alice Developer', gross: 5000, net: 4200, deductions: 800 },
      { employeeId: 'user:demo-emp-002', employeeName: 'Charlie Designer', gross: 4500, net: 3780, deductions: 720 },
    ],
  },
];

// Onboarding Tasks
export const mockOnboarding = [
  {
    id: 'onboard-9001',
    employeeId: 'user:demo-emp-001',
    employeeName: 'Alice Developer',
    tasks: [
      { id: 't-1', title: 'Document Verification', status: 'COMPLETED' },
      { id: 't-2', title: 'System Access Setup', status: 'COMPLETED' },
      { id: 't-3', title: 'Policy Acknowledgement', status: 'IN_PROGRESS' },
      { id: 't-4', title: 'Initial Training', status: 'PENDING' },
    ],
    startDate: '2023-01-15',
    status: 'IN_PROGRESS',
  },
];

// Policies
export const mockPolicies = [
  {
    id: 'policy-01',
    title: 'Remote Work Policy',
    version: '1.2',
    effectiveDate: '2024-12-01',
    content: `# Remote Work Policy

## Overview
This policy outlines the guidelines for remote work arrangements at Demo Corp.

## Eligibility
All employees who have completed their probation period are eligible for remote work.

## Guidelines
1. Maintain regular working hours
2. Be available during core hours (10 AM - 4 PM)
3. Attend all scheduled meetings
4. Ensure reliable internet connection

## Equipment
The company will provide necessary equipment for remote work.`,
    category: 'HR',
    acknowledgements: 45,
    totalEmployees: 50,
  },
  {
    id: 'policy-02',
    title: 'Leave Policy',
    version: '2.0',
    effectiveDate: '2024-01-01',
    content: `# Leave Policy

## Types of Leave
- Paid Leave: 20 days per year
- Sick Leave: 12 days per year
- Casual Leave: 6 days per year

## Application Process
1. Apply through the HRMS portal
2. Get manager approval
3. Plan leaves in advance

## Carry Forward
Up to 5 days of paid leave can be carried forward to the next year.`,
    category: 'HR',
    acknowledgements: 50,
    totalEmployees: 50,
  },
];

// Holidays
export const mockHolidays = [
  {
    id: 'hol-2025-01-01',
    date: '2025-01-01',
    name: 'New Year\'s Day',
    regions: ['ALL'],
  },
  {
    id: 'hol-2025-01-26',
    date: '2025-01-26',
    name: 'Republic Day',
    regions: ['IN'],
  },
  {
    id: 'hol-2025-03-14',
    date: '2025-03-14',
    name: 'Holi',
    regions: ['IN'],
  },
  {
    id: 'hol-2025-08-15',
    date: '2025-08-15',
    name: 'Independence Day',
    regions: ['IN'],
  },
  {
    id: 'hol-2025-10-02',
    date: '2025-10-02',
    name: 'Gandhi Jayanti',
    regions: ['IN'],
  },
  {
    id: 'hol-2025-12-25',
    date: '2025-12-25',
    name: 'Christmas',
    regions: ['ALL'],
  },
];

// Candidates (for TA module)
export const mockCandidates = [
  {
    id: 'cand-001',
    firstName: 'John',
    lastName: 'Applicant',
    email: 'john.applicant@email.com',
    phone: '+1-555-0101',
    position: 'Senior Software Engineer',
    status: 'SCREENING',
    appliedDate: '2025-01-05',
    resumeUrl: '/mock/resumes/john-applicant.pdf',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    experience: 5,
  },
  {
    id: 'cand-002',
    firstName: 'Jane',
    lastName: 'Candidate',
    email: 'jane.candidate@email.com',
    phone: '+1-555-0102',
    position: 'Product Designer',
    status: 'INTERVIEW',
    appliedDate: '2025-01-08',
    resumeUrl: '/mock/resumes/jane-candidate.pdf',
    skills: ['Figma', 'Sketch', 'UI/UX', 'Prototyping'],
    experience: 3,
  },
];

// Helper function to find user by email
export function findUserByEmail(email: string) {
  return mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Helper function to find user by id
export function findUserById(id: string) {
  return mockUsers.find(u => u.id === id);
}
