import { ImageSourcePropType } from 'react-native';
import man from './man.jpeg';
import woman from './woman.jpeg';

export const appImages = {
  man,
  woman,
} as const satisfies Record<string, ImageSourcePropType>;
