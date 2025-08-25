import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { MainPage } from '../MainPage';

const mockLoadCountries = jest.fn();

jest.mock('../../../store/appStore', () => ({
  useAppStore: () => ({
    submittedData: [],
    loadCountries: mockLoadCountries,
    lastSubmittedId: null,
    clearLastSubmittedId: jest.fn(),
  }),
}));

describe('MainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен рендериться без ошибок', () => {
    const { container } = render(<MainPage />);
    expect(container).toBeTruthy();
  });

  it('должен вызывать loadCountries при монтировании', () => {
    render(<MainPage />);
    expect(mockLoadCountries).toHaveBeenCalledTimes(1);
  });
});
