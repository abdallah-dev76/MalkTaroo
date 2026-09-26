import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CompatibilityRecord = {
  id: string;
  firstZodiacId: string;
  secondZodiacId: string;
  percentage: number;
  createdAt: string;
};

type CompatibilityState = {
  history: CompatibilityRecord[];
};

const initialState: CompatibilityState = {
  history: [],
};

const compatibilitySlice = createSlice({
  name: 'compatibility',
  initialState,
  reducers: {
    addResult: {
      reducer: (state, action: PayloadAction<CompatibilityRecord>) => {
        state.history.unshift(action.payload);
      },
      prepare: (
        result: Pick<
          CompatibilityRecord,
          'firstZodiacId' | 'secondZodiacId' | 'percentage'
        >,
      ) => {
        const now = new Date();
        return {
          payload: {
            ...result,
            id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
            createdAt: now.toISOString(),
          },
        };
      },
    },
    removeResult: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    clearHistory: state => {
      state.history = [];
    },
  },
});

export const { addResult, removeResult, clearHistory } =
  compatibilitySlice.actions;

export default compatibilitySlice.reducer;
