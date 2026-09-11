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

const DEFAULT_EDGES: MainLayoutEdge[] = ['top', 'right', 'bottom', 'left'];

// stable references so memoized children don't re-render from new objects each render
const FLEX_ONE = { flex: 1 } as const;
const FLEX_GROW_ONE = { flexGrow: 1 } as const;

export const MainLayout = ({
  children,
  style,
  backgroundColor = 'background',
  edges = DEFAULT_EDGES,
  statusBarStyle = 'dark-content',
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
    () => [styles.container(backgroundColor), { paddingTop: topInset }, style],
    [backgroundColor, topInset, style],
  );

  // bottom/left/right insets live on the scrollable content so they scroll away with it,
  // rather than being reserved permanently on the fixed outer container
  const bodyPaddingStyle = useMemo(
    () => ({
      paddingBottom: bottomInset,
      paddingLeft: leftInset,
      paddingRight: rightInset,
    }),
    [bottomInset, leftInset, rightInset],
  );

  const body = scrollable ? (
    <ScrollView
      style={FLEX_ONE}
      contentContainerStyle={[
        bodyPaddingStyle,
        FLEX_GROW_ONE,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[FLEX_ONE, bodyPaddingStyle]}>{children}</View>
  );

  return (
    <View style={containerStyle}>
      <StatusBar
        animated={statusBarAnimated}
        hidden={statusBarHidden}
        barStyle={statusBarStyle}
        // Always edge-to-edge at the native level; the reserved-space look for
        // `statusBarTranslucent === false` is achieved via the painted spacer + padding below,
        // which behaves identically on iOS and Android (incl. Android 15 edge-to-edge enforcement).
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

      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={FLEX_ONE}
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
