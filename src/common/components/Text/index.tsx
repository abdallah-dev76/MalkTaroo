import { useAppTheme } from '@theme/index';
import { PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';
import { styles } from './styles';
import { ITextProps } from './types';

export const Text = ({
  children,
  variant = 'title',
  color = 'textPrimary',
  textAlign = 'left',
  ...props
}: ITextProps & PropsWithChildren) => {
  const { colors } = useAppTheme();

  styles.useVariants({
    variant,
  });

  return (
    <RNText
      style={[styles.text, { color: colors[color], textAlign }]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
