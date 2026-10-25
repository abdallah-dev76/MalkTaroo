import {
  getPeriodMeaningKey,
  getTarotCard,
  TAROT_PERIODS,
} from '@common/data/tarot';
import type { TarotReadingType } from '@store/slices/tarotSlice';

export const readingTypeKey = (type: TarotReadingType) =>
  type === 'one' ? 'oneCardReading' : 'threeCardReading';

export const getReadingShareText = (
  type: TarotReadingType,
  cardIds: string[],
  translate: (key: string) => string,
) => {
  const cards = cardIds.map(getTarotCard);
  const first = cards[0] ?? getTarotCard();
  return type === 'three'
    ? TAROT_PERIODS.map(
        (period, index) =>
          `${translate(period)}: ${translate(
            getPeriodMeaningKey(cards[index] ?? first, period),
          )}`,
      ).join('\n')
    : translate(first.meaningKey);
};
