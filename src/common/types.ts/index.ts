import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Tarot: NavigatorScreenParams<TarotStackParamList> | undefined;
  Compatibility: NavigatorScreenParams<CompatibilityStackParamList> | undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: { isEditing?: boolean } | undefined;
  MainTabs: undefined;
  LearningList: { type: 'tarot' | 'zodiac' };
  CompatibilityHistory: undefined;
  CompatibilityDetail: { id: string };
  TarotHistory: undefined;
  TarotDetail: { id: string };
  ZodiacDetails: { id: string };
  TarotCardDetails: { id: string };
};

export type CompatibilityStackParamList = {
  Start: undefined;
  FirstZodiac: undefined;
  SecondZodiac: undefined;
  CalculatingResult: undefined;
  Result: undefined;
};

export type TarotStackParamList = {
  Start: undefined;
  ReadingType: undefined;
  OneCardReading: undefined;
  ThreeCardReading: undefined;
};
