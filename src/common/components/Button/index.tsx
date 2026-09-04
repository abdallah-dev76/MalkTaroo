import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { styles } from './styles';
import { ButtonProps } from './types';

export const Button = ({
  children,

  variant = 'primary',
  size = 'large',

  loading = false,
  disabled = false,
  fullWidth = false,

  leftIcon,
  rightIcon,

  ...pressableProps
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  styles.useVariants({
    variant,
    size,
    disabled: isDisabled,
    fullWidth,
  });

  return (
    <Pressable
      {...pressableProps}
      disabled={isDisabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          <Text style={styles.text}>{children}</Text>

          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
};
