import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useState, useMemo } from 'react';
import { TarotStackParamList } from '@common/types.ts';
import { Storage } from '@common/storage/storage';
import { StorageKeys } from '@common/storage';
import { Start } from '@features/tarot/screens/start';
import { ZodiacCardProps } from '@common/components/ZodiacCard/types';
import { ReadingType } from '@features/tarot/screens/readingType';
import { OneCardReading } from '@features/tarot/screens/oneCardReading';
import { ThreeCardReading } from '@features/tarot/screens/threeCardReading';

export type TarotContextType = {
  zodiac: Partial<ZodiacCardProps>[];
  setZodiac: React.Dispatch<React.SetStateAction<Partial<ZodiacCardProps>[]>>;
};

const Stack = createNativeStackNavigator<TarotStackParamList>();

export const TarotContext = createContext<TarotContextType | null>(null);

export const TarotStack = () => {
  const [zodiac, setZodiac] = useState<Partial<ZodiacCardProps>[]>([]);

  const values = useMemo(() => ({ zodiac, setZodiac }), [zodiac, setZodiac]);

  return (
    <TarotContext.Provider value={values}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!Storage.getBoolean(StorageKeys.IS_FRIST_READING_DONE) && (
          <Stack.Screen name='Start' component={Start} />
        )}
        <Stack.Screen name='ReadingType' component={ReadingType} />
        <Stack.Screen name='OneCardReading' component={OneCardReading} />
        <Stack.Screen name='ThreeCardReading' component={ThreeCardReading} />
      </Stack.Navigator>
    </TarotContext.Provider>
  );
};
