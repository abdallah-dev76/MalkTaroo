import { storage } from './mmkv';

export const Storage = {
  setString: (key: string, value: string) => storage.set(key, value),

  getString: (key: string) => storage.getString(key),

  setBoolean: (key: string, value: boolean) => storage.set(key, value),

  getBoolean: (key: string) => storage.getBoolean(key),

  removeItem: (key: string) => storage.remove(key),

  clearAll: () => storage.clearAll(),
};
