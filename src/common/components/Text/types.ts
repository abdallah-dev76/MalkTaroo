import { ColorsNames } from '@theme/index';
import { TextProps } from 'react-native';

export type TextVariant =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'title'
  | 'body'
  | 'bodyMedium'
  | 'label'
  | 'button'
  | 'caption'
  | 'small';

export interface ITextProps extends TextProps {
  color?: ColorsNames;
  textAlign?: 'left' | 'center' | 'right';
  variant?: TextVariant;
}
