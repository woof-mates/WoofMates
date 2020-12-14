import { createMuiTheme }  from '@material-ui/core/styles'

const regTheme = createMuiTheme({
    typography: {
        fontFamily: 'Georgia, Times New Roman, Times, serif',
    },
    palette: {
        primary: {
          main: '#DAE7DE',
        },
        secondary: {
          main: '#44C767',
          contrastText: '#FFFFFF',
        },
    },
    overrides: {
        MuiInput: {
          input: {
            "&::placeholder": {
                fontFamily: 'Georgia, Times New Roman, Times, serif',
            },
          }
        }
      },
})

export default regTheme;

