import { Pressable, TextInput as TextInputBase, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Text from '../Text';
import { styles } from './styles';
import { lightColors, palette } from '@theme/colors';
import { getLanguage } from '@common/utils/toggleLanguage';
import { useUnistyles } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { wScale } from '@common/utils/normalize';
import { BaseTextInputProps } from './types';

export const TextInput = ({
  onValueChange,
  required,
  label,
  errorMessage,
  isPassword = false,
  style,
  ...props
}: BaseTextInputProps) => {
  const { theme } = useUnistyles();
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const onChangeHandler = useCallback(
    (val: string) => {
      setValue(val);
      onValueChange(val);
    },
    [onValueChange],
  );

  return (
    <View style={styles.container}>
      {label ? (
        <View style={styles.label}>
          {required && <Text color={palette.red}>*</Text>}
          <Text variant='label'>{label}</Text>
        </View>
      ) : undefined}
      <View style={styles.textInputAndErr}>
        <View style={styles.textInputContainer}>
          <TextInputBase
            placeholderTextColor={theme.inputPlaceholder}
            style={styles.textInput}
            selectionColor={lightColors.inputBorderFocused}
            cursorColor={lightColors.inputBorderFocused}
            value={value}
            onChangeText={onChangeHandler}
            numberOfLines={1}
            secureTextEntry={isPassword && showPassword}
            textAlign={getLanguage() === 'ar' ? 'right' : 'left'}
            {...props}
          />
          {isPassword && (
            <Pressable
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.searchIconContainer}
            >
              <Icon
                name={showPassword ? 'openEye' : 'closeEye'}
                color={theme.textPrimary}
                size={wScale(18)}
              />
            </Pressable>
          )}
        </View>
        {errorMessage ? (
          <Text color={palette.red} variant='caption'>
            {errorMessage}
          </Text>
        ) : undefined}
      </View>
    </View>
  );
};

export default TextInput;
