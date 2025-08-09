import colors from './css/colors.scss'

const light_palette = {
  mode: 'light',
  common: {
    black: '#1C2D41',
    white: '#FFF',
    blue: '#0000EE',
  },
  primary: {
    main: '#0000FF',
    semiLight: '#ced2d6',
    light: '#EAEFFF',
    dark: '#0000B3',
    contrastText: '#FFF',
  },
  secondary: {
    main: '#3ddfb4',
    // light: '#D8F9F0',
    // dark: '#0000B3',
    contrastText: '#FFF',
  },
  error: {
    main: '#F5B272',
    // light: '#D8F9F0',
    // dark: '#0000B3',
    contrastText: '#FFF',
  },
  warning: {
    main: '#FF4878',
    // light: '#D8F9F0',
    // dark: '#0000B3',
    contrastText: '#FFF',
  },
  // info: {
  //   main: '#FF6A79',
  //   // light: '#D8F9F0',
  //   // dark: '#0000B3',
  //   contrastText: '#FFF',
  // },
  // success: {
  //   main: '#FF6A79',
  //   // light: '#D8F9F0',
  //   // dark: '#0000B3',
  //   contrastText: '#FFF',
  // },
  grey: {
    50: '#F2F3F4',
    100: '#E7E9EB',
    200: '#D1D5D9',
    300: '#BABFC5',
    400: '#A4ABB3',
    500: '#8D959F',
    600: '#76818D',
    700: '#5F6B79',
    800: '#495767',
    900: '#324153',
    A100: '#E7E9EB',
    A200: '#D1D5D9',
    A400: '#A4ABB3',
    A700: '#5F6B79',
  },
  text: {
    primary: '#1C2D41',
    secondary: 'rgba(0,0,0,0.6)',
    disabled: 'rgba(0,0,0,0.38)',
  },
  divider: 'rgba(0,0,0,0.12)',
  background: {
    paper: '#FFFFFF',
    paperBorder: '#EAEFFF',
    default: '#F8FAFF',
    paperLight: '#FFF',
    defaultGray: '#F2F3F4',
  },
  assets: {
    logo: 'assets/ispolink_logo_blue_b.svg',
  },
  colors: {
    background: '#FFFFFF',
    foreground: '#1C2D41',
    footer: {
      text: '#0000FF',
    },
    anchor: {
      normal: '#0000FF',
    },
    skeleton: {
      base: '#ebebeb',
      highlight: '#f5f5f5',
    },
    formControl: {
      background: '#FFF',
      border: '#ced2d6',
      label: {
        filled: '#0000FF',
        error: '#FF4878',
      },
      hover: {
        border: '#0000FF',
      },
      focused: {
        border: '#0000FF',
      },
      autofill: {
        background: '#EAEFFF',
        color: '#1C2D41',
      },
      selectIconColor: 'rgba(0, 0, 0, 0.54)',
      checkboxColor: '#22d3a4',
    },
    scrollbar: {
      scrollbar: '#eaefff',
      scrollbarHover: '#d6e0ff',
    },
    header: {
      searchBox: {
        background: '#FFF',
        border: '#FFF',
      },
      themeSwitch: {
        background: '#EAEFFF',
      },
      button: {
        background: '#FFF',
        backgroundHover: '#EAEFFF',
        text: '#1C2D41',
      },
      icon: {
        background: '#FFF',
        backgroundHover: '#f2f2fe',
        border: '#EAEFFF',
        color: '#1C2D41',
        backgroundHighlight: '#FFF',
      },
      globalSearch: {
        background: '#F8FAFF',
      },
      border: '#E6E8EA',
    },
    wallet: {
      coinIcon: {
        background: '#f2f2fe',
      },
    },
    tweetbox: {
      background: '#f0f4ff',
    },
  },
}

export default light_palette
