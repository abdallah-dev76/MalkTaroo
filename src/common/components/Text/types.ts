import { Colors } from '@theme/index';
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
  // accepts a theme color name for autocomplete, or any raw CSS color string (e.g. 'red', '#fff')
  color?: Colors | (string & {});
  textAlign?: 'left' | 'center' | 'right';
  variant?: TextVariant;
}
