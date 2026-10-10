import { PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';
import { styles } from './styles';
import { ITextProps } from './types';

export const Text = ({
  children,
  variant = 'title',
  color = 'textPrimary',
  textAlign = 'left',
  style,
  ...props
}: ITextProps & PropsWithChildren) => {
  styles.useVariants({
    variant,
  });

  return (
    <RNText style={[styles.text(color, textAlign), style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
