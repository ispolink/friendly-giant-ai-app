import { createTheme } from '@mui/material/styles'
import '../assets/proxima-nova/style.css'

import light_palette from './light'
import dark_palette from './dark'

const DarkTheme = createTheme({
  typography: {
    fontFamily: ['Proxima Nova'],
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Proxima Nova'],
      },
    },
  },
  palette: dark_palette,
})

const LightTheme = createTheme({
  typography: {
    fontFamily: ['Proxima Nova'],
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Proxima Nova'],
      },
    },
  },
  palette: light_palette,
})

export { DarkTheme, LightTheme }
