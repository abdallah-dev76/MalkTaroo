import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TarotReadingType = 'one' | 'three';

export type TarotReading = {
  id: string;
  createdAt: string;
  type: TarotReadingType;
  // Three-card readings are ordered past, present, future.
  cardIds: string[];
};

export type TarotReadingState = {
  history: TarotReading[];
};

const initialState: TarotReadingState = {
  history: [],
};

const tarotSlice = createSlice({
  name: 'tarot',
  initialState,
  reducers: {
    addTarotReading: {
      reducer: (state, action: PayloadAction<TarotReading>) => {
        state.history.unshift(action.payload);
      },
      prepare: (reading: Pick<TarotReading, 'type' | 'cardIds'>) => {
        const now = new Date();
        return {
          payload: {
            ...reading,
            id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
            createdAt: now.toISOString(),
          },
        };
      },
    },
    removeTarotResult: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    clearTarotHistory: state => {
      state.history = [];
    },
  },
});

export const { addTarotReading, removeTarotResult, clearTarotHistory } =
  tarotSlice.actions;

export default tarotSlice.reducer;
