import closeEye from './closeEye.svg';
import openEye from './openEye.svg';
import heart from './heart.svg';
import heartSolid from './heartSolid.svg';
import cards from './cards.svg';
import profile from './profile.svg';
import home from './home.svg';
import leftArrow from './leftArrow.svg';
import rightArrow from './rightArrow.svg';
import share from './share.svg';
import moon from './moon.svg';
import notification from './notification.svg';
import lang from './lang.svg';
import coins from './coins.svg';
import flower from './flower.svg';
import bag from './bag.svg';
import calender from './calender.svg';
import astrology from './astrology.svg';

export const icons = {
  closeEye,
  openEye,
  heart,
  heartSolid,
  cards,
  profile,
  home,
  leftArrow,
  rightArrow,
  share,
  moon,
  notification,
  lang,
  coins,
  flower,
  bag,
  calender,
  astrology,
} as const;

export type IconName = keyof typeof icons;
