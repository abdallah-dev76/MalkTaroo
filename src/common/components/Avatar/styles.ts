import { wScale } from '@common/utils';
import { lightColors } from '@theme/colors';
import { radius } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create({
  container: (isBorder?: boolean) => ({
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: radius.full,
    borderWidth: isBorder ? 1 : 0,
    borderColor: lightColors.borderGold,

    variants: {
      size: {
        small: { width: wScale(40) },
        medium: { width: wScale(60) },
        large: { width: wScale(100) },
        xLarge: { width: wScale(130) },
      },
    },
  }),

  image: { height: '100%', width: '100%' },
});
