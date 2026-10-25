import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompatibilityStackParamList } from '@common/types.ts';
import { Start } from '@features/compatibility/screens/start';
import { FirstZodiac } from '@features/compatibility/screens/firstZodiac';
import { SecondZodiac } from '@features/compatibility/screens/secondZodiac';
import { Result } from '@features/compatibility/screens/result';
import { CalculatingResult } from '@features/compatibility/screens/calculatinResult';
import { CompatibilityProvider } from '@features/compatibility/context/CompatibilityContext';
import { Storage } from '@common/storage/storage';
import { StorageKeys } from '@common/storage';

const Stack = createNativeStackNavigator<CompatibilityStackParamList>();

export const CompatibilityStack = () => {
  return (
    <CompatibilityProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!Storage.getBoolean(StorageKeys.IS_FIRST_COMPATIBILITY_DONE) && (
          <Stack.Screen name='Start' component={Start} />
        )}
        <Stack.Screen name='FirstZodiac' component={FirstZodiac} />
        <Stack.Screen name='SecondZodiac' component={SecondZodiac} />
        <Stack.Screen name='CalculatingResult' component={CalculatingResult} />
        <Stack.Screen name='Result' component={Result} />
      </Stack.Navigator>
    </CompatibilityProvider>
  );
};
