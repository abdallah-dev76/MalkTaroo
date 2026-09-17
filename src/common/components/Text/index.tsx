import { PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';
import { styles } from './styles';
import { ITextProps } from './types';
import { isArabic } from '@common/utils/appSettings';

const resolveTextAlign = (textAlign: NonNullable<ITextProps['textAlign']>) => {
  if (textAlign === 'start') {
    return isArabic ? 'right' : 'left';
  }

  if (textAlign === 'end') {
    return isArabic ? 'left' : 'right';
  }

  return textAlign;
};

export const Text = ({
  children,
  variant = 'title',
  color = 'textPrimary',
  textAlign = 'start',
  style,
  ...props
}: ITextProps & PropsWithChildren) => {
  styles.useVariants({
    variant,
  });

  return (
    <RNText
      style={[styles.text(color, resolveTextAlign(textAlign)), style]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
