import { fontScale, hScale, wScale } from '@common/utils/normalize';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wScale(8),

    variants: {
      variant: {
        primary: {
          backgroundColor: theme.buttonPrimaryBackground,
        },

        secondary: {
          backgroundColor: theme.buttonSecondaryBackground,
          borderWidth: wScale(1),
          borderColor: theme.buttonSecondaryBorder,
        },

        outline: {
          backgroundColor: 'transparent',
          borderWidth: wScale(1),
          borderColor: theme.primary,
        },

        ghost: {
          backgroundColor: 'transparent',
        },

        destructive: {
          backgroundColor: theme.error,
        },

        premium: {
          backgroundColor: theme.premiumGold,
        },
      },

      size: {
        small: {
          height: hScale(36),
          paddingHorizontal: wScale(16),
          borderRadius: wScale(10),
        },

        medium: {
          height: hScale(44),
          paddingHorizontal: wScale(20),
          borderRadius: wScale(12),
        },

        large: {
          height: hScale(52),
          paddingHorizontal: wScale(24),
          borderRadius: wScale(14),
        },
      },

      disabled: {
        true: {
          opacity: 0.5,
        },

        false: {},
      },

      fullWidth: {
        true: {
          width: '100%',
        },

        false: {},
      },
    },
  },

  text: {
    variants: {
      variant: {
        primary: {
          color: theme.buttonPrimaryText,
        },

        secondary: {
          color: theme.buttonSecondaryText,
        },

        outline: {
          color: theme.primary,
        },

        ghost: {
          color: theme.buttonGhostText,
        },

        destructive: {
          color: theme.textInverse,
        },

        premium: {
          color: theme.textInverse,
        },
      },

      size: {
        small: {
          fontSize: fontScale(14),
        },

        medium: {
          fontSize: fontScale(16),
        },

        large: {
          fontSize: fontScale(16),
        },
      },

      disabled: {
        true: {},
        false: {},
      },

      fullWidth: {
        true: {},
        false: {},
      },
    },
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressed: {
    opacity: 0.8,
  },
}));
