import { UnistylesRuntime } from 'react-native-unistyles';
import { StorageKeys } from '@common/storage';
import { Storage } from '@common/storage/storage';

export const toggleTheme = () => {
  const storedTheme = Storage.getString(StorageKeys.Theme);
  const newTheme = storedTheme === 'light' ? 'dark' : 'light';
  UnistylesRuntime.setTheme(newTheme);
  Storage.setString(StorageKeys.Theme, newTheme);
};
