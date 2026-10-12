import React, { useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import Text from '../Text';
import { DropdownProps } from './types';
import { ITEM_HEIGHT, styles } from './styles';

export const Dropdown = ({
  label,
  placeholder,
  options,
  value,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = options.findIndex(option => option.value === value);
  const selectedOption = options[selectedIndex];

  const handleSelect = (optionValue: number) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {label ? (
        <Text variant='label' color='textGold'>
          {label}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole='button'
        accessibilityLabel={label ?? placeholder}
        onPress={() => setIsOpen(true)}
        style={styles.trigger}
      >
        <Text
          numberOfLines={1}
          color={selectedOption ? 'textPrimary' : 'inputPlaceholder'}
          style={styles.triggerText}
        >
          {selectedOption?.label ?? placeholder}
        </Text>
        <Text color='textGold'>▾</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)}>
          <Pressable style={styles.sheet}>
            <Text variant='label' color='textGold' style={styles.sheetTitle}>
              {label ?? placeholder}
            </Text>
            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              initialScrollIndex={selectedIndex > 0 ? selectedIndex : undefined}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              renderItem={({ item }) => {
                const isSelected = item.value === value;

                return (
                  <Pressable
                    accessibilityRole='button'
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => handleSelect(item.value)}
                    style={[styles.option, isSelected && styles.optionSelected]}
                  >
                    <Text color={isSelected ? 'textGold' : 'textPrimary'}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;
