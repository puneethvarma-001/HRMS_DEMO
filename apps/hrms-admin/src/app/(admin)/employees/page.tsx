'use client';

import { Container, Typography, Box, TextField, MenuItem } from '@mui/material';
import { Button } from '@hrms/design-system';
import { EmployeeList } from '@/modules/employee-lifecycle';
import { useState } from 'react';

// Mock data for demonstration
const mockEmployees = [
  {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1234567890',
    department: 'Engineering',
    position: 'Senior Developer',
    startDate: '2023-01-15',
    status: 'active' as const,
    tenantId: 'tenant-123',
    isOutsourcing: false,
  },
  {
    id: '2',
    employeeId: 'EMP002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    department: 'HR',
    position: 'HR Manager',
    startDate: '2022-06-01',
    status: 'active' as const,
    tenantId: 'tenant-123',
    isOutsourcing: false,
  },
  {
    id: '3',
    employeeId: 'OUT001',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@vendor.com',
    department: 'Engineering',
    position: 'Contractor',
    startDate: '2024-01-01',
    status: 'active' as const,
    tenantId: 'tenant-123',
    isOutsourcing: true,
    contractEndDate: '2025-12-31',
  },
];

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || emp.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employees
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage employee lifecycle, onboarding, and offboarding
        </Typography>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          size="small"
        />
        <TextField
          select
          label="Department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          sx={{ minWidth: 200 }}
          size="small"
        >
          <MenuItem value="all">All Departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </TextField>
        <Button variant="contained">Add Employee</Button>
      </Box>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={(employee) => console.log('Edit', employee)}
        onDelete={(employee) => console.log('Delete', employee)}
      />
    </Container>
  );
}
