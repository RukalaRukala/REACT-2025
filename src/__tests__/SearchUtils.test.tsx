import { saveSearchQuery } from '../components/Search/Search.utils';
import { STORAGE_KEY } from '../components/Search/Search.const';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Search utils', () => {
  beforeEach(() => {
    localStorageMock.setItem.mockClear();
  });

  it('saves search query to localStorage', () => {
    const testQuery = 'available';

    saveSearchQuery(testQuery);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      testQuery
    );
  });
});
