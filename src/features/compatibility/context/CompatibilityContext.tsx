import { createContext, useContext, useMemo, useReducer } from 'react';
import type { PropsWithChildren } from 'react';

type Selection = { first?: string; second?: string };
type Action = { type: 'first' | 'second'; id: string } | { type: 'reset' };

export const compatibilitySelectionReducer = (
  state: Selection,
  action: Action,
): Selection => {
  switch (action.type) {
    case 'first':
      return { ...state, first: action.id };
    case 'second':
      return { ...state, second: action.id };
    case 'reset':
      return {};
  }
};

type CompatibilityFlow = {
  selection: Selection;
  selectFirst: (id: string) => void;
  selectSecond: (id: string) => void;
  reset: () => void;
};

const CompatibilityContext = createContext<CompatibilityFlow | null>(null);

export const CompatibilityProvider = ({ children }: PropsWithChildren) => {
  const [selection, dispatch] = useReducer(compatibilitySelectionReducer, {});
  const value = useMemo(
    () => ({
      selection,
      selectFirst: (id: string) => dispatch({ type: 'first', id }),
      selectSecond: (id: string) => dispatch({ type: 'second', id }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [selection],
  );
  return (
    <CompatibilityContext.Provider value={value}>
      {children}
    </CompatibilityContext.Provider>
  );
};

export const useCompatibility = () => {
  const context = useContext(CompatibilityContext);
  if (!context) {
    throw new Error('useCompatibility requires CompatibilityProvider');
  }
  return context;
};
