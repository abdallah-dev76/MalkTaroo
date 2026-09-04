import { ReactNode } from 'react';
import { PressableProps } from 'react-native';

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'premium';

export type ButtonSizes = 'small' | 'medium' | 'large';

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
