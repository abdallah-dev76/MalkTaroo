import { Pressable, TextInput as TextInputBase, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Text from '../Text';
import { styles } from './styles';
import { lightColors, palette } from '@theme/colors';
import { useUnistyles } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { getLanguage, wScale } from '@common/utils';
import { BaseTextInputProps } from './types';

export const TextInput = ({
  onValueChange,
  required,
  label,
  errorMessage,
  isPassword = false,
  value,
  defaultValue,
  iconName,
  ...props
}: BaseTextInputProps) => {
  const { theme } = useUnistyles();
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? value ?? '',
  );
  const [showPassword, setShowPassword] = useState(true);

  const controlledValue = value ?? internalValue;

  const onChangeHandler = useCallback(
    (val: string) => {
      if (value === undefined) {
        setInternalValue(val);
      }
      onValueChange(val);
    },
    [onValueChange, value],
  );

  return (
    <View style={styles.container}>
      {label ? (
        <View style={styles.label}>
          {required && <Text color={palette.red}>*</Text>}
          <Text variant='label' color='textGold'>
            {label}
          </Text>
        </View>
      ) : undefined}
      <View style={styles.textInputAndErr}>
        <View style={styles.textInputContainer}>
          {iconName && (
            <View style={styles.iconContainer}>
              <Icon name={iconName} color={theme.textGold} />
            </View>
          )}
          <TextInputBase
            placeholderTextColor={theme.inputPlaceholder}
            style={styles.textInput}
            selectionColor={lightColors.inputBorderFocused}
            cursorColor={lightColors.inputBorderFocused}
            value={controlledValue}
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
