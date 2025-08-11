import { saveSearchQuery } from '../components/Search/Search.utils';
import { STORAGE_KEY } from '../components/Search/Search.const';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      Reflect.deleteProperty(store, key);
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Search Utils', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  test('saveSearchQuery saves query to localStorage', () => {
    const testQuery = 'available';
    saveSearchQuery(testQuery);

    expect(mockLocalStorage.getItem(STORAGE_KEY)).toBe(testQuery);
  });

  test('saveSearchQuery overwrites previous query', () => {
    saveSearchQuery('old query');
    saveSearchQuery('new query');

    expect(mockLocalStorage.getItem(STORAGE_KEY)).toBe('new query');
  });

  test('saveSearchQuery handles empty string', () => {
    saveSearchQuery('');

    expect(mockLocalStorage.getItem(STORAGE_KEY)).toBe('');
  });
});
