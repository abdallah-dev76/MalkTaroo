import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './src/navigation/mainStack';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <SafeAreaProvider>
      <Content />
    </SafeAreaProvider>
  );
}

const Content = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
export default App;
