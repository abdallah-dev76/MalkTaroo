import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { darkColors, lightColors } from './colors';

export type ColorsNames = keyof typeof lightColors;

type Colors = typeof lightColors;

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
    adaptiveThemes: true,
  },
});
