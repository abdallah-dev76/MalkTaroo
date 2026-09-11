import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@theme/theme';

export type StatusBarStyle = 'light-content' | 'dark-content' | 'default';

export type MainLayoutEdge = 'top' | 'right' | 'bottom' | 'left';

export interface IMainLayoutProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;

  /** Screen background color. Accepts a theme color name or a raw CSS color. */
  backgroundColor?: Colors | (string & {});

  /** Safe area edges to reserve space for. Defaults to all edges. */
  edges?: MainLayoutEdge[];

  /** iOS/Android status bar text & icon style. */
  statusBarStyle?: StatusBarStyle;

  /** Hides the status bar entirely. */
  statusBarHidden?: boolean;

  /** Animates status bar style/visibility changes. */
  statusBarAnimated?: boolean;

  /**
   * `true` (default): status bar is transparent and content is drawn edge-to-edge
   * underneath it (its space is "taken" by the content).
   * `false`: the status bar area keeps its own space, painted with
   * `statusBarBackgroundColor` (falls back to `backgroundColor`).
   */
  statusBarTranslucent?: boolean;

  /** Background color painted behind the status bar when `statusBarTranslucent` is false. */
  statusBarBackgroundColor?: Colors | (string & {});

  /** Wraps content in a `ScrollView` for screens taller than the viewport. Defaults to `false`. */
  scrollable?: boolean;

  /** Style applied to the `ScrollView` content container when `scrollable` is true. */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /** Wraps content in a `KeyboardAvoidingView` so inputs aren't hidden by the keyboard. Defaults to `true`. */
  keyboardAvoiding?: boolean;
}
