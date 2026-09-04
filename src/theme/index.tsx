import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { darkColors, lightColors } from './colors';
import { ColorSchemeName, useColorScheme } from 'react-native';

export type ColorsNames = keyof typeof lightColors;

type Colors = typeof lightColors;

interface ITheme {
  colors: Colors;
  mode: ColorSchemeName; //'light' || 'dark'
  toggleMode: () => void;
}

const ThemeContext = createContext<ITheme | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return context;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorTheme = useColorScheme();
  const [mode, setMode] = useState<ColorSchemeName>(colorTheme ?? 'light');

  const toggleMode = useCallback(() => {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  }, []);

  const colors = mode === 'dark' ? darkColors : lightColors;

  const contextValues = useMemo(
    () => ({
      colors,
      mode,
      toggleMode,
    }),
    [colors, mode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};
