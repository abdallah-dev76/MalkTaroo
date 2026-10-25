import type { PersistedState } from 'redux-persist';
import type { TarotReading } from './slices/tarotSlice';

type LegacyTarotReading = Omit<TarotReading, 'cardIds'> & {
  cardId?: string;
  cardIds?: string[];
};

type LegacyPersistedState = NonNullable<PersistedState> & {
  tarot?: {
    history?: LegacyTarotReading[];
    [key: string]: unknown;
  };
};

export const migrateTarotHistory = (state: PersistedState): PersistedState => {
  const legacy = state as LegacyPersistedState | undefined;
  return {
    ...legacy,
    tarot: {
      ...legacy?.tarot,
      history: (legacy?.tarot?.history ?? []).map(({ cardId, ...reading }) => ({
        ...reading,
        cardIds: reading.cardIds ?? (cardId ? [cardId] : []),
      })),
    },
  } as PersistedState;
};

export const migrations = { 1: migrateTarotHistory };
