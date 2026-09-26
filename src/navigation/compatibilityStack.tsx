import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useState, useMemo } from 'react';
import { CompatibilityStackParamList } from '@common/types.ts';
import { Start } from '@features/compatibility/screens/start';
import { FirstZodiac } from '@features/compatibility/screens/firstZodiac';
import { SecondZodiac } from '@features/compatibility/screens/secondZodiac';
import { Result } from '@features/compatibility/screens/result';
import { CalculatingResult } from '@features/compatibility/screens/calculatinResult';
import { ZodiacCardProps } from '@common/components/ZodiacCard/types';

export type CompatibilityContextType = {
  zodiac: Partial<ZodiacCardProps>[];
  setZodiac: React.Dispatch<React.SetStateAction<Partial<ZodiacCardProps>[]>>;
};

const Stack = createNativeStackNavigator<CompatibilityStackParamList>();

export const CompatibilityContext =
  createContext<CompatibilityContextType | null>(null);

export const CompatibilityStack = () => {
  const [zodiac, setZodiac] = useState<Partial<ZodiacCardProps>[]>([]);

  const values = useMemo(() => ({ zodiac, setZodiac }), [zodiac]);

  return (
    <CompatibilityContext.Provider value={values}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='FirstZodiac' component={FirstZodiac} />
        <Stack.Screen name='SecondZodiac' component={SecondZodiac} />
        <Stack.Screen name='CalculatingResult' component={CalculatingResult} />
        <Stack.Screen name='Result' component={Result} />
      </Stack.Navigator>
    </CompatibilityContext.Provider>
  );
};
