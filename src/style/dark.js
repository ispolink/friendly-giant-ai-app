import colors from './css/colors.scss'

const dark_palette = {
  mode: 'dark',
  common: {
    black: '#1c2d41',
    white: '#FFF',
    blue: '#98B0FF',
  },
  primary: {
    main: '#98B0FF',
    semiLight: '#4a5768',
    light: '#324153',
    dark: '#6565f3',
    contrastText: '#FFF',
  },
  secondary: {
    main: '#55c883',
    // light: '#ddf4e6',
    // dark: '#000077',
    contrastText: '#FFF',
  },
  error: {
    main: '#f5b272',
    // light: '#ddf4e6',
    // dark: '#000077',
    contrastText: '#FFF',
  },
  warning: {
    main: '#ff6a6a',
    // light: '#ddf4e6',
    // dark: '#000077',
    contrastText: '#FFF',
  },
  // info: {
  //   main: '#ff6a6a',
  //   // light: '#ddf4e6',
  //   // dark: '#000077',
  //   contrastText: '#FFF',
  // },
  // success: {
  //   main: '#ff6a6a',
  //   // light: '#ddf4e6',
  //   // dark: '#000077',
  //   contrastText: '#FFF',
  // },
  grey: {
    50: '#f2f3f4',
    100: '#e7e9eb',
    200: '#d1d5d9',
    300: '#babfc5',
    400: '#a4abb3',
    500: '#8d959f',
    600: '#76818d',
    700: '#5f6b79',
    800: '#495767',
    900: '#324153',
    A100: '#e7e9eb',
    A200: '#d1d5d9',
    A400: '#a4abb3',
    A700: '#5f6b79',
  },
  text: {
    primary: 'rgba(255,255,255,1)',
    secondary: 'rgba(255,255,255,0.7)',
    disabled: 'rgba(255,255,255,0.38)',
  },
  divider: 'rgba(0,0,0,0.12)',
  background: {
    paper: '#233346',
    paperBorder: '#324153',
    default: '#1c2d41',
    paperLight: '#4a5768',
    defaultGray: '#1F2F4F',
  },
  assets: {
    logo: 'assets/ispolink_logo_blue_w.svg',
  },
  colors: {
    background: '#1c2d41',
    foreground: '#FFF',
    footer: {
      text: '#98B0FF',
    },
    anchor: {
      normal: '#98B0FF',
    },
    skeleton: {
      base: '#324153',
      highlight: '#42556d',
    },
    formControl: {
      background: '#1c2d41',
      border: '#324153',
      label: {
        filled: '#98B0FF',
        error: '#ff6a6a',
      },
      hover: {
        border: '#98B0FF',
      },
      focused: {
        border: '#98B0FF',
      },
      autofill: {
        background: '#324153',
        color: '#ced2d6',
      },
      selectIconColor: '#FFF',
      checkboxColor: '#FFF',
    },
    scrollbar: {
      scrollbar: '#4a5768',
      scrollbarHover: '#76818d',
    },
    header: {
      searchBox: {
        background: '#1c2d41',
        border: '#76818d',
      },
      themeSwitch: {
        background: '#233346',
      },
      button: {
        background: '#233346',
        backgroundHover: '#233346',
        text: '#FFF',
      },
      icon: {
        background: '#4a5768',
        backgroundHover: '#4c596b',
        border: '#4a5768',
        color: '#FFF',
        backgroundHighlight: '#1c2d41',
      },
      globalSearch: {
        background: '#233346',
      },
      border: '#4a5768',
    },
    wallet: {
      coinIcon: {
        background: '#f2f2fe',
      },
    },
    tweetbox: {
      background: '#101a26',
    },
  },
}

export default dark_palette
