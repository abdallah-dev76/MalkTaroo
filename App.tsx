import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './src/navigation/mainStack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';

function App() {
  return (
    <SafeAreaProvider>
      <Content />
    </SafeAreaProvider>
  );
}

const Content = () => {
  const { rt, theme } = useUnistyles();
  const baseTheme = rt.themeName === 'dark' ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: theme.background,
      card: theme.background,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainStack />
    </NavigationContainer>
  );
};
export default App;
