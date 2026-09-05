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

  style,
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
      style={state => [
        styles.button,
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
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

export default Button;
