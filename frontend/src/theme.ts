import { createMuiTheme, Theme } from '@material-ui/core/styles';

/**
 * Custom Material UI theme
 */
const theme: Theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: 'rgba(48, 60, 108, 1)',
      default: 'rgba(131, 122, 117, 1)'
    },
    primary: {
      light: 'rgba(79, 89, 130, 1)',
      main: 'rgba(48, 60, 108, 1)',
      dark: 'rgba(0, 23, 65, 1)',
      contrastText: 'rgba(255, 255, 255, 1)'
    },
    secondary: {
      light: 'rgba(255, 255, 216, 1)',
      main: 'rgba(251, 232, 166, 1)',
      dark: 'rgba(199, 182, 118, 1)',
      contrastText: 'rgba(0, 0, 0, 1)'
    },
    error: {
      light: 'rgba(255, 155, 135, 1)',
      main: 'rgba(237, 106, 90, 1)',
      dark: 'rgba(181, 57, 48, 1)',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
      disabled: 'rgba(188, 231, 253, 1)',
      hint: 'rgba(131, 122, 117, 1)'
    }
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(',')
  }
});

export default theme;
