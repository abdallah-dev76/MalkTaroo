import { useUnistyles } from 'react-native-unistyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from '@features/splash';
import { RootStackParamList } from '@common/types.ts';
import MainTabs from './mainTabs';
import { TarotHistory } from '@features/profile/screens/tarotReadingsHistory';
import { TarotDetail } from '@features/profile/screens/tarotReadingsDetails';
import { Onboarding } from '@features/onboarding';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='MainTabs' component={MainTabs} />

      <Stack.Group
        screenOptions={{
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name='TarotHistory' component={TarotHistory} />
        <Stack.Screen name='TarotDetail' component={TarotDetail} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MainStack;
