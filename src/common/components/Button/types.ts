import { IconName } from '@assets/icons';
import { PressableProps } from 'react-native';

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'premium';

export type ButtonSizes = 'small' | 'medium' | 'large';

export type ButtonIcon = { name: IconName; size?: number; color?: string };

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: ButtonIcon;
  rightIcon?: ButtonIcon;
}
