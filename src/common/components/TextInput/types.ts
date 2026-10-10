import { IconName } from '@assets/icons';
import { TextInputProps } from 'react-native';

export interface BaseTextInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  onValueChange: (val: string) => void;
  required?: boolean;
  isPassword?: boolean;
  iconName?: IconName;
}
