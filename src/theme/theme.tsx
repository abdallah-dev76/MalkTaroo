import { StyleSheet } from 'react-native-unistyles';
import { darkColors, lightColors } from './colors';
import { Storage } from '@common/storage/storage';
import { StorageKeys } from '@common/storage';

export type Colors = keyof typeof lightColors;

const themes = {
  light: lightColors,
  dark: darkColors,
} as const;

type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

const storedTheme = Storage.getString(StorageKeys.Theme);

StyleSheet.configure({
  themes,
  settings: {
    initialTheme: (storedTheme as 'light' | 'dark') ?? 'dark',
    adaptiveThemes: false,
  },
});

Storage.setString(StorageKeys.Theme, storedTheme ?? 'dark');
