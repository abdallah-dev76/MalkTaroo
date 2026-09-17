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
  container: (backgroundColor?: Colors | (string & {})) => ({
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: resolveColor(theme, backgroundColor, theme.background),
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
