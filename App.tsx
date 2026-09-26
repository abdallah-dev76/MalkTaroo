import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './src/navigation/mainStack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Content />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
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
