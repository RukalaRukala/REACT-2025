import { STORAGE_KEY } from './Search.const.tsx';

export const saveSearchQuery = (query: string): void => {
  localStorage.setItem(STORAGE_KEY, query);
};
