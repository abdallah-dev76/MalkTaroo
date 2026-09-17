import { Colors } from '@theme/theme';
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
  //When using & {} => TypeScript can preserve the literal union for autocomplete, while still allowing arbitrary strings.
  color?: Colors | (string & {});
  textAlign?: 'left' | 'center' | 'right' | 'start' | 'end';
  variant?: TextVariant;
}
