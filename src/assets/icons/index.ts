import closeEye from './closeEye.svg';
import openEye from './openEye.svg';

export const icons = {
  closeEye,
  openEye,
} as const;

export type IconName = keyof typeof icons;
