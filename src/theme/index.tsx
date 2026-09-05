import { StyleSheet } from 'react-native-unistyles';
import { darkColors, lightColors } from './colors';

export type Colors = keyof typeof lightColors;


const themes = {
  light: lightColors,
  dark: darkColors,
} as const;

type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes,

  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});
