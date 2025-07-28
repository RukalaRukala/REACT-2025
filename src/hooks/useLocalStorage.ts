import { useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (newValue: string) => void, () => void] {
  const getValue = (): string => {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      return item;
    }
    return initialValue;
  };

  const [value, setValueState] = useState<string>(getValue);

  const setValue = (newValue: string) => {
    setValueState(newValue);
    window.localStorage.setItem(key, newValue);
  };

  const remove = () => {
    window.localStorage.removeItem(key);
    setValueState(initialValue);
  };

  return [value, setValue, remove];
}
