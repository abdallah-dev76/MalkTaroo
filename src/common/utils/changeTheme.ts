import { UnistylesRuntime } from 'react-native-unistyles';

export const changeTheme = (theme: 'light' | 'dark') =>
  UnistylesRuntime.setTheme(theme);
