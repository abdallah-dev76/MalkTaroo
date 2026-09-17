import { PropsWithChildren } from 'react';
import { I18nManager, Text as RNText } from 'react-native';
import { styles } from './styles';
import { ITextProps } from './types';

const resolveTextAlign = (textAlign: NonNullable<ITextProps['textAlign']>) => {
  if (textAlign === 'start') {
    return I18nManager.isRTL ? 'right' : 'left';
  }

  if (textAlign === 'end') {
    return I18nManager.isRTL ? 'left' : 'right';
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
