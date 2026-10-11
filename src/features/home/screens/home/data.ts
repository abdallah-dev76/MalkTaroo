import { IconName } from '@assets/icons';
import { Colors } from '@theme/theme';

export type LuckCategory = {
  id: number;
  titleKey: string;
  color: Colors;
  icon: IconName;
};

export const getDailyLuckScore = (categoryId: number, date: Date) => {
  const seed = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${categoryId}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + (seed.codePointAt(index) ?? 0)) % 2147483647;
  }

  return (hash % 10) + 1;
};

export const luckCategories: LuckCategory[] = [
  {
    id: 1,
    titleKey: 'love',
    color: 'error',
    icon: 'heart',
  },
  {
    id: 2,
    titleKey: 'finance',
    color: 'warning',
    icon: 'coins',
  },
  {
    id: 3,
    titleKey: 'career',
    color: 'info',
    icon: 'bag',
  },
  {
    id: 4,
    titleKey: 'energy',
    color: 'accent',
    icon: 'flower',
  },
];
