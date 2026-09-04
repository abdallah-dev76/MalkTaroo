import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    variants: {
      variant: {
        primary: {
          backgroundColor: theme.buttonPrimaryBackground,
        },

        secondary: {
          backgroundColor: theme.buttonSecondaryBackground,
          borderWidth: 1,
          borderColor: theme.buttonSecondaryBorder,
        },

        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1,
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
          height: 36,
          paddingHorizontal: 16,
          borderRadius: 10,
        },

        medium: {
          height: 44,
          paddingHorizontal: 20,
          borderRadius: 12,
        },

        large: {
          height: 52,
          paddingHorizontal: 24,
          borderRadius: 14,
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
          fontSize: 14,
        },

        medium: {
          fontSize: 16,
        },

        large: {
          fontSize: 16,
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
