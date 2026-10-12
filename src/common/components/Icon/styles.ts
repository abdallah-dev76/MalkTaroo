import { wScale } from '@common/utils/normalize';
import { StyleSheet } from 'react-native-unistyles';

export const DEFAULT_ICON_SIZE = wScale(24);

export const styles = StyleSheet.create(() => ({
  icon: (size: number, color: string, isFocused: boolean) => ({
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    ...(isFocused && {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: wScale(6),
      elevation: 6,
    }),
  }),
}));
