export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  CompatibilityHistory: undefined;
  CompatibilityDetail: { id: string };
  TarotHistory: undefined;
  TarotDetail: { id: string };
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
