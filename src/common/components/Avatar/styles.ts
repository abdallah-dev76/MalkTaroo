import { wScale } from '@common/utils/normalize';
import { lightColors } from '@theme/colors';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: 9999,

    variants: {
      size: {
        small: { width: wScale(40) },
        medium: { width: wScale(60) },
        large: { width: wScale(100) },
      },
    },
  },
  image: { height: '100%', width: '100%' },
});
