import { spacing } from '@theme/spacing';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  tabBarContainer: (bottomInset: number) => ({
    flexDirection: 'row',
    backgroundColor: theme.tabBarBackground,
    padding: spacing.md,
    paddingBottom: bottomInset + spacing.md,
    borderTopWidth: 1,
    borderColor: theme.tabBarBorder,
  }),
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  tabLabel: (isFocused: boolean) => ({
    color: isFocused ? theme.textGold : theme.textSecondary,
  }),
}));
