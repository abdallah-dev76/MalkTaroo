import { t } from 'i18next';
import { appImages } from '@assets/images';
import { ZodiacCardProps } from '@common/components/ZodiacCard/types';

export const zodiacList: ZodiacCardProps[] = [
  {
    id: 'aquarius',
    name: t('aquarius'),
    image: appImages.aquarius,
    date: t('dates.aquarius'),
  },
  {
    id: 'pisces',
    name: t('pisces'),
    image: appImages.pisces,
    date: t('dates.pisces'),
  },
  {
    id: 'aries',
    name: t('aries'),
    image: appImages.aries,
    date: t('dates.aries'),
  },
  {
    id: 'taurus',
    name: t('taurus'),
    image: appImages.taurus,
    date: t('dates.taurus'),
  },
  {
    id: 'gemini',
    name: t('gemini'),
    image: appImages.gemini,
    date: t('dates.gemini'),
  },
  {
    id: 'cancer',
    name: t('cancer'),
    image: appImages.cancer,
    date: t('dates.cancer'),
  },
  {
    id: 'leo',
    name: t('leo'),
    image: appImages.leo,
    date: t('dates.leo'),
  },
  {
    id: 'virgo',
    name: t('virgo'),
    image: appImages.virgo,
    date: t('dates.virgo'),
  },
  {
    id: 'libra',
    name: t('libra'),
    image: appImages.libra,
    date: t('dates.libra'),
  },
  {
    id: 'scorpio',
    name: t('scorpio'),
    image: appImages.scorpio,
    date: t('dates.scorpio'),
  },
  {
    id: 'sagittarius',
    name: t('sagittarius'),
    image: appImages.sagittarius,
    date: t('dates.sagittarius'),
  },
  {
    id: 'capricorn',
    name: t('capricorn'),
    image: appImages.capricorn,
    date: t('dates.capricorn'),
  },
];
