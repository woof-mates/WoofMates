import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Georgia, Times New Roman, Times, serif',
  },
  palette: {
    primary: {
      main: '#DAE7DE',
    },
    secondary: {
      main: '#2f2235',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  spacing: 1,
  overrides: {
    MuiInput: {
      input: {
        "&::placeholder": {
            fontFamily: 'Georgia, Times New Roman, Times, serif',
        },
      }
    }
  },

});

export default theme;
