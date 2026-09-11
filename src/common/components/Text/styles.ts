import { fontScale } from '@common/utils/normalize';
import { Colors } from '@theme/theme';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  // color/textAlign are dynamic per-instance, so they're resolved via a style function
  // instead of `useUnistyles`, avoiding a re-render subscription on every theme change.
  text: (
    color: Colors | (string & {}),
    textAlign: 'left' | 'center' | 'right',
  ) => ({
    // fall back to the raw value when `color` isn't a known theme color name
    color: color in theme ? theme[color as Colors] : color,
    textAlign,

    variants: {
      variant: {
        display: {
          fontFamily: 'ElMessiri-Bold',
          fontSize: fontScale(36),
          lineHeight: fontScale(48),
        },

        heading1: {
          fontFamily: 'ElMessiri-Bold',
          fontSize: fontScale(30),
          lineHeight: fontScale(40),
        },

        heading2: {
          fontFamily: 'ElMessiri-SemiBold',
          fontSize: fontScale(24),
          lineHeight: fontScale(34),
        },

        heading3: {
          fontFamily: 'ElMessiri-SemiBold',
          fontSize: fontScale(20),
          lineHeight: fontScale(30),
        },

        title: {
          fontFamily: 'Cairo-SemiBold',
          fontSize: fontScale(18),
          lineHeight: fontScale(28),
        },

        body: {
          fontFamily: 'Cairo-Regular',
          fontSize: fontScale(16),
          lineHeight: fontScale(26),
        },

        bodyMedium: {
          fontFamily: 'Cairo-Medium',
          fontSize: fontScale(16),
          lineHeight: fontScale(26),
        },

        label: {
          fontFamily: 'Cairo-Medium',
          fontSize: fontScale(14),
          lineHeight: fontScale(22),
        },

        button: {
          fontFamily: 'Cairo-SemiBold',
          fontSize: fontScale(16),
          lineHeight: fontScale(24),
        },

        caption: {
          fontFamily: 'Cairo-Regular',
          fontSize: fontScale(12),
          lineHeight: fontScale(18),
        },

        small: {
          fontFamily: 'Cairo-Regular',
          fontSize: fontScale(10),
          lineHeight: fontScale(16),
        },
      },
    },
  }),
}));
