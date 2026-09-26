import type { Storage } from 'redux-persist';
import { storage } from '@common/storage/mmkv';

export const mmkvStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => Promise.resolve(storage.getString(key)),
  removeItem: (key: string) => {
    storage.remove(key);
    return Promise.resolve();
  },
};
