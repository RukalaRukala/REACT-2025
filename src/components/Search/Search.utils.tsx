import { EMPTY_STRING, STORAGE_KEY } from './Search.const.tsx';
import { useEffect } from 'react';

export const saveSearchQuery = (query: string): void => {
  localStorage.setItem(STORAGE_KEY, query);
};

export const loadSearchQuery = (): string | null => {
  return localStorage.getItem(STORAGE_KEY);
};

export const clearSearchQuery = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useDebounceStorage = (value: string, delay: number = 500) => {
  useEffect(() => {
    if (value === EMPTY_STRING) return;

    const timeoutId = setTimeout(() => {
      saveSearchQuery(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);
};
