import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const fontScale = (size: number) => {
  const scale = width / BASE_WIDTH;

  return PixelRatio.roundToNearestPixel(size + (size * scale - size) * 0.5);
};

export const wScale = (size: number) =>
  PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size);

export const hScale = (size: number) =>
  PixelRatio.roundToNearestPixel((height / BASE_HEIGHT) * size);
