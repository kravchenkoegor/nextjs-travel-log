import { useState, useEffect } from 'react';

export function useLocalState<State = undefined>(
  key: string,
  initialValue: State
) {
  const [value, setValue] = useState<State>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }

    return initialValue;
  });

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
