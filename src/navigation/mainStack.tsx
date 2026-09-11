import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from '@features/splash';
import MainTabs from './mainTabs';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='MainTabs' component={MainTabs} />
    </Stack.Navigator>
  );
}

export default MainStack;
