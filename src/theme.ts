import { ThemeObj } from 'types/theme';

export const lightTheme: ThemeObj = {
  accentColors: {
    primary: '#FF3465',
  },
  backgroundColors: {
    primary: '#FFFFFF',
    secondary: '#F9F9F9',
  },
  textColors: {
    primary: '#242831',
    secondary: '#919398',
    tertiary: '#C8C9CB',
  },
  borderColors: {
    tertiary: '#ececec',
  },
};

export const darkTheme: ThemeObj = {
  accentColors: {
    primary: '#FF3465',
  },
  backgroundColors: {
    primary: '#222b38',
    secondary: '#2B3543',
  },
  textColors: {
    primary: '#FFFFFF',
    secondary: '#8A9098',
    tertiary: '#606772',
  },
  borderColors: {
    tertiary: '#232323',
  },
};

const theme = {
  dark: darkTheme,
  light: lightTheme,
};

export default theme;
