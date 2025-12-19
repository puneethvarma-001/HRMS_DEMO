'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  /**
   * If true, renders a loading state
   */
  loading?: boolean;
}

/**
 * Custom Button component wrapping MUI Button
 * Part of the atomic design system
 */
export function Button({ loading, disabled, children, ...props }: ButtonProps) {
  return (
    <MuiButton disabled={disabled || loading} {...props}>
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
}
