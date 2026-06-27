// src/theme.ts

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: '#394188',
      light: mode === 'light' ? '#eef2ff' : '#1e293b', 
      dark: '#2d3192',
      contrastText: '#ffffff',
    },
    success: {
      main: '#38a169',
      light: mode === 'light' ? '#f0fdf4' : '#064e3b',
      dark: '#166534',
    },
    error: {
      main: '#e53e3e',
      light: mode === 'light' ? '#fef2f2' : '#7f1d1d',
      dark: '#9b1c1c',
    },
    warning: {
      main: '#ecc94b',
      light: mode === 'light' ? '#fffbeb' : '#78350f',
      dark: '#b45309',
    },
    info: {
      main: '#3182ce',
      light: mode === 'light' ? '#ebf8ff' : '#1e3a8a',
      dark: '#1e40af',
    },
    background: {
      default: mode === 'light' ? '#f8f9fa' : '#0f172a', 
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: mode === 'light' ? '#394188' : '#ffffff',
      secondary: mode === 'light' ? '#4a5568' : '#a0aec0',
      disabled: mode === 'light' ? '#94a3b8' : '#64748b',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    action: {
      hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
      selected: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
      active: mode === 'light' ? '#4a5568' : '#a0aec0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: mode === 'light' 
              ? '0 0 0 1000px #ffffff inset !important' 
              : '0 0 0 1000px #1e293b inset !important',
            WebkitTextFillColor: mode === 'light' ? '#000000' : '#ffffff',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: mode === 'light' ? '#f1f5f9' : '#334155',
        },
      },
    },
  },
});