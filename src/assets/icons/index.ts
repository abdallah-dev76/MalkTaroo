import ReactNative from './react-native.svg';

export const icons = {
  reactNative: ReactNative,
} as const;

export type IconName = keyof typeof icons;
