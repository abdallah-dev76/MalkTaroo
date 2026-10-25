import { IconName } from '@assets/icons';
import { TextInputProps } from 'react-native';
import type { TextInput } from 'react-native';
import type { Ref } from 'react';

export interface BaseTextInputProps extends TextInputProps {
  ref?: Ref<TextInput>;
  label?: string;
  errorMessage?: string;
  onValueChange: (val: string) => void;
  required?: boolean;
  isPassword?: boolean;
  iconName?: IconName;
}
