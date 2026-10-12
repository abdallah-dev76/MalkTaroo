import { StyleSheet } from 'react-native-unistyles';
import { Colors } from '@theme/theme';
import { spacing } from '@theme/index';

type ColorInput = Colors | (string & {});

const resolveColor = (
  theme: Record<string, string>,
  color: ColorInput | undefined,
  fallback: string,
) => {
  if (!color) {
    return fallback;
  }
  return color in theme ? theme[color as Colors] : color;
};

export const styles = StyleSheet.create(theme => ({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  container: (backgroundColor?: ColorInput, topInset = 0) => ({
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: topInset,
    backgroundColor: resolveColor(theme, backgroundColor, theme.background),
  }),

  bodyInsets: (bottom: number, left: number, right: number) => ({
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right,
  }),
  headerInsets: (left: number, right: number) => ({
    paddingLeft: left,
    paddingRight: right,
  }),

  statusBarSpacer: (
    color: ColorInput | undefined,
    fallback: ColorInput | undefined,
    height: number,
  ) => ({
    height,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: resolveColor(
      theme,
      color,
      resolveColor(theme, fallback, theme.background),
    ),
  }),
}));
