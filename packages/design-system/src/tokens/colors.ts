/**
 * Design tokens for the HRMS design system
 * Following a token-based approach for consistency and theming
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  // Secondary brand colors
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Semantic colors
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
  },
  warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
  },
  // Background colors
  background: {
    light: '#ffffff',
    default: '#f5f5f5',
    paper: '#ffffff',
    dark: '#121212',
  },
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd',
    hint: '#9e9e9e',
  },
} as const;

export type ColorToken = typeof colors;
