import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TarotStackParamList } from '@common/types.ts';
import { Storage } from '@common/storage/storage';
import { StorageKeys } from '@common/storage';
import { Start } from '@features/tarot/screens/start';
import { ReadingType } from '@features/tarot/screens/readingType';
import { OneCardReading } from '@features/tarot/screens/oneCardReading';
import { ThreeCardReading } from '@features/tarot/screens/threeCardReading';

const Stack = createNativeStackNavigator<TarotStackParamList>();

export const TarotStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!Storage.getBoolean(StorageKeys.IS_FRIST_READING_DONE) && (
        <Stack.Screen name='Start' component={Start} />
      )}
      <Stack.Screen name='ReadingType' component={ReadingType} />
      <Stack.Screen name='OneCardReading' component={OneCardReading} />
      <Stack.Screen name='ThreeCardReading' component={ThreeCardReading} />
    </Stack.Navigator>
  );
};
