import React, { memo, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { IMainLayoutProps, MainLayoutEdge } from './types';
import { isDark } from '@common/utils';

const DEFAULT_EDGES: MainLayoutEdge[] = ['top', 'right', 'bottom', 'left'];

export const MainLayout = ({
  children,
  style,
  header,
  backgroundColor = 'background',
  edges = DEFAULT_EDGES,
  statusBarStyle,
  statusBarHidden = false,
  statusBarAnimated = true,
  statusBarTranslucent = false,
  statusBarBackgroundColor,
  scrollable = false,
  contentContainerStyle,
  keyboardAvoiding = true,
}: IMainLayoutProps) => {
  const insets = useSafeAreaInsets();

  const topInset =
    edges.includes('top') && !statusBarTranslucent ? insets.top : 0;
  const bottomInset = edges.includes('bottom') ? insets.bottom : 0;
  const leftInset = edges.includes('left') ? insets.left : 0;
  const rightInset = edges.includes('right') ? insets.right : 0;

  const containerStyle = useMemo(
    () => [styles.container(backgroundColor, topInset), style],
    [backgroundColor, topInset, style],
  );

  // bottom/left/right insets live on the scrollable content so they scroll away with it,
  // rather than being reserved permanently on the fixed outer container
  const bodyPaddingStyle = useMemo(
    () => styles.bodyInsets(bottomInset, leftInset, rightInset),
    [bottomInset, leftInset, rightInset],
  );

  const headerPaddingStyle = useMemo(
    () => styles.headerInsets(leftInset, rightInset),
    [leftInset, rightInset],
  );

  const body = scrollable ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        bodyPaddingStyle,
        styles.content,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, bodyPaddingStyle]}>{children}</View>
  );

  return (
    <View style={containerStyle}>
      <StatusBar
        animated={statusBarAnimated}
        hidden={statusBarHidden}
        barStyle={statusBarStyle ?? (isDark ? 'light-content' : 'dark-content')}
        translucent
        backgroundColor={Platform.OS === 'android' ? 'transparent' : undefined}
      />

      {!statusBarTranslucent && (
        <View
          pointerEvents='none'
          style={styles.statusBarSpacer(
            statusBarBackgroundColor,
            backgroundColor,
            insets.top,
          )}
        />
      )}

      {header && <View style={headerPaddingStyle}>{header}</View>}

      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
    </View>
  );
};

export default memo(MainLayout);
