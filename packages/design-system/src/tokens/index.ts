export * from './colors';
export * from './spacing';
export * from './effects';

// Export all tokens as a single object
import { colors } from './colors';
import { spacing, typography } from './spacing';
import { radius, shadows, motion, zIndex } from './effects';

export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  motion,
  zIndex,
} as const;
