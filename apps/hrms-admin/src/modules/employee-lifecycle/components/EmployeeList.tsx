'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Employee } from '../types';

interface EmployeeListProps {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
}

/**
 * Employee list component with permission-aware actions
 */
export function EmployeeList({ employees, onEdit, onDelete }: EmployeeListProps) {
  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on_leave':
        return 'warning';
      case 'inactive':
      case 'terminated':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Box sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No employees found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>
                  {employee.firstName} {employee.lastName}
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.status}
                    color={getStatusColor(employee.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {employee.isOutsourcing ? (
                    <Chip label="Outsourcing" color="info" size="small" variant="outlined" />
                  ) : (
                    <Chip label="Employee" size="small" variant="outlined" />
                  )}
                </TableCell>
                <TableCell align="right">
                  {onEdit && (
                    <IconButton size="small" onClick={() => onEdit(employee)}>
                      ✏️
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton size="small" onClick={() => onDelete(employee)}>
                      🗑️
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
