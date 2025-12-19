'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme, ThemeConfig } from './theme';

interface ThemeContextValue {
  config: ThemeConfig;
  toggleMode: () => void;
  setDensity: (density: ThemeConfig['density']) => void;
  setTenantColors: (colors: ThemeConfig['tenantColors']) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultConfig?: Partial<ThemeConfig>;
}

export function ThemeProvider({ children, defaultConfig }: ThemeProviderProps) {
  const [config, setConfig] = useState<ThemeConfig>({
    mode: defaultConfig?.mode ?? 'dark', // Defaults to dark mode when not specified
    density: defaultConfig?.density ?? 'comfortable',
    tenantColors: defaultConfig?.tenantColors,
  });

  const theme = React.useMemo(() => createAppTheme(config), [config]);

  const toggleMode = () => {
    setConfig((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const setDensity = (density: ThemeConfig['density']) => {
    setConfig((prev) => ({
      ...prev,
      density,
    }));
  };

  const setTenantColors = (tenantColors: ThemeConfig['tenantColors']) => {
    setConfig((prev) => ({
      ...prev,
      tenantColors,
    }));
  };

  // Persist theme preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-config', JSON.stringify(config));
    }
  }, [config]);

  const value: ThemeContextValue = {
    config,
    toggleMode,
    setDensity,
    setTenantColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
