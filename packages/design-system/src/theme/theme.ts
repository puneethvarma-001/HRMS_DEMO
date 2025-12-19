import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { tokens } from '../tokens';

/**
 * Density modes for the UI
 */
export type DensityMode = 'compact' | 'comfortable';

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  mode: 'light' | 'dark';
  density: DensityMode;
  tenantColors?: {
    primary?: string;
    secondary?: string;
  };
}

/**
 * Create MUI theme with design tokens
 */
export function createAppTheme(config: ThemeConfig): Theme {
  const { mode, density, tenantColors } = config;

  // Spacing multiplier based on density
  const spacingMultiplier = density === 'compact' ? 0.75 : 1;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: tenantColors?.primary || tokens.colors.primary[500],
        light: tokens.colors.primary[300],
        dark: tokens.colors.primary[700],
      },
      secondary: {
        main: tenantColors?.secondary || tokens.colors.secondary[500],
        light: tokens.colors.secondary[300],
        dark: tokens.colors.secondary[700],
      },
      error: {
        main: tokens.colors.error.main,
        light: tokens.colors.error.light,
        dark: tokens.colors.error.dark,
      },
      warning: {
        main: tokens.colors.warning.main,
        light: tokens.colors.warning.light,
        dark: tokens.colors.warning.dark,
      },
      success: {
        main: tokens.colors.success.main,
        light: tokens.colors.success.light,
        dark: tokens.colors.success.dark,
      },
      info: {
        main: tokens.colors.info.main,
        light: tokens.colors.info.light,
        dark: tokens.colors.info.dark,
      },
      background: {
        default: mode === 'dark' ? tokens.colors.background.dark : tokens.colors.background.default,
        paper: mode === 'dark' ? '#1e1e1e' : tokens.colors.background.paper,
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : tokens.colors.text.primary,
        secondary: mode === 'dark' ? '#b0b0b0' : tokens.colors.text.secondary,
        disabled: tokens.colors.text.disabled,
      },
    },
    typography: {
      fontFamily: tokens.typography.fontFamily.base,
      fontSize: 14,
      h1: {
        fontSize: tokens.typography.fontSize['4xl'],
        fontWeight: tokens.typography.fontWeight.bold,
        lineHeight: tokens.typography.lineHeight.tight,
      },
      h2: {
        fontSize: tokens.typography.fontSize['3xl'],
        fontWeight: tokens.typography.fontWeight.bold,
        lineHeight: tokens.typography.lineHeight.tight,
      },
      h3: {
        fontSize: tokens.typography.fontSize['2xl'],
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      h4: {
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      h5: {
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      h6: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      body1: {
        fontSize: tokens.typography.fontSize.base,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      body2: {
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.normal,
      },
    },
    spacing: (factor: number) => `${factor * 8 * spacingMultiplier}px`,
    shape: {
      borderRadius: parseInt(tokens.radius.base),
    },
    shadows: [
      tokens.shadows.none,
      tokens.shadows.sm,
      tokens.shadows.base,
      tokens.shadows.md,
      tokens.shadows.md,
      tokens.shadows.lg,
      tokens.shadows.lg,
      tokens.shadows.xl,
      tokens.shadows.xl,
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
      tokens.shadows['2xl'],
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: tokens.typography.fontWeight.medium,
            borderRadius: tokens.radius.base,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.md,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: density === 'compact' ? 'small' : 'medium',
        },
      },
      MuiButton: {
        defaultProps: {
          size: density === 'compact' ? 'small' : 'medium',
        },
      },
    },
  };

  return createTheme(themeOptions);
}

/**
 * Default light theme
 */
export const lightTheme = createAppTheme({
  mode: 'light',
  density: 'comfortable',
});

/**
 * Default dark theme
 */
export const darkTheme = createAppTheme({
  mode: 'dark',
  density: 'comfortable',
});
