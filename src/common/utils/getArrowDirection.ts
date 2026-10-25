import { IconName } from '@assets/icons';
import { isArabic } from './appSettings';

export const getArrowDirection = (icon: IconName) => {
  const arrowDirection = icon === 'rightArrow' ? 'leftArrow' : 'rightArrow';
  return isArabic ? icon : arrowDirection;
};
