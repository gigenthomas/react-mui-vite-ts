import { FunctionComponent, PropsWithChildren, useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import DARK_THEME from './dark';

/**
 * Renders everything needed to get MUI theme working
 * The Dark theme is always applied
 */
const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true); // True until the component is mounted

  useEffect(() => setLoading(false), []); // Set .loading to false when the component is mounted

  const currentTheme = createTheme(DARK_THEME); // Always use dark theme

  if (loading) return null; // Don't render anything until the component is mounted

  return (
    <EmotionThemeProvider theme={currentTheme}>
      <CssBaseline /* MUI Styles */ />
      {children}
    </EmotionThemeProvider>
  );
};

export default AppThemeProvider;
