import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createMigrate,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import { mmkvStorage } from './mmkvStorage';
import compatibilityReducer from './slices/compatibilitySlice';
import tarotReducer from './slices/tarotSlice';

const rootReducer = combineReducers({
  compatibility: compatibilityReducer,
  tarot: tarotReducer,
});

const migrations = {
  1: (state: any) => ({
    ...state,
    tarot: {
      ...state?.tarot,
      history: (state?.tarot?.history ?? []).map(
        ({ cardId, ...reading }: any) => ({
          ...reading,
          cardIds: reading.cardIds ?? (cardId ? [cardId] : []),
        }),
      ),
    },
  }),
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage: mmkvStorage,
    whitelist: ['compatibility', 'tarot'],
    migrate: createMigrate(migrations),
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export * from './slices/compatibilitySlice';
export * from './slices/tarotSlice';
