import { ImageSourcePropType } from 'react-native';
import { appImages } from '@assets/images';

export type TarotCard = {
  id: string;
  image: ImageSourcePropType;
  meaningKey: string;
};

export type TarotPeriod = 'past' | 'present' | 'future';

export const TAROT_PERIODS: TarotPeriod[] = ['past', 'present', 'future'];

export const tarotCards: TarotCard[] = [
  {
    id: 'swords',
    image: appImages.swords,
    meaningKey: 'tarotCards.swords.general',
  },
];

export const getTarotCard = (id?: string) =>
  tarotCards.find(card => card.id === id) ?? tarotCards[0];

export const getPeriodMeaningKey = (card: TarotCard, period: TarotPeriod) =>
  `tarotCards.${card.id}.${period}`;

export const drawTarotCard = () =>
  tarotCards[Math.floor(Math.random() * tarotCards.length)];

// Falls back to repeats while the deck is smaller than the spread.
export const drawTarotCards = (count: number) => {
  if (tarotCards.length < count) {
    return Array.from({ length: count }, drawTarotCard);
  }
  const deck = [...tarotCards];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, count);
};
