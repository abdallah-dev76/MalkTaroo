import { PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './styles';
import { ITextProps } from './types';

export const Text = ({
  children,
  variant = 'title',
  color = 'textPrimary',
  textAlign = 'left',
  ...props
}: ITextProps & PropsWithChildren) => {
  const { theme } = useUnistyles();

  styles.useVariants({
    variant,
  });

  return (
    <RNText
      style={[styles.text, { color: theme[color], textAlign }]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
