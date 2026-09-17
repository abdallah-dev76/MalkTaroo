import closeEye from './closeEye.svg';
import openEye from './openEye.svg';
import heart from './heart.svg';
import cards from './cards.svg';
import profile from './profile.svg';
import home from './home.svg';
import leftArrow from './leftArrow.svg';
import rightArrow from './rightArrow.svg';
import share from './share.svg';

export const icons = {
  closeEye,
  openEye,
  heart,
  cards,
  profile,
  home,
  leftArrow,
  rightArrow,
  share,
} as const;

export type IconName = keyof typeof icons;
