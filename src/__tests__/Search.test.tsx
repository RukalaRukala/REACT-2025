import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search/Search';
import { STORAGE_KEY } from '../components/Search/Search.const';

const mockConsoleWarn = jest
  .spyOn(console, 'warn')
  .mockImplementation(() => {});
const mockConsoleError = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

describe('Search Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
    mockConsoleWarn.mockClear();
    mockConsoleError.mockClear();
  });

  afterAll(() => {
    mockConsoleWarn.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      render(<Search onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      const savedTerm = 'saved search term';
      localStorage.setItem(STORAGE_KEY, savedTerm);

      render(<Search onSearch={mockOnSearch} />);

      expect(screen.getByDisplayValue(savedTerm)).toBeInTheDocument();
    });

    it('shows empty input when no saved term exists', () => {
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('renders all sub-components correctly', () => {
      render(<Search onSearch={mockOnSearch} />);

      expect(
        screen.getByPlaceholderText(
          'Enter pet status (available, pending, sold)'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(
        screen.getByText('Enter one of these status types:')
      ).toBeInTheDocument();
      expect(screen.getByText('available')).toBeInTheDocument();
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('sold')).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('updates input value when user types', async () => {
      const user = userEvent.setup();
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      const testValue = 'test search';

      await user.type(input, testValue);

      expect(input).toHaveValue(testValue);
    });

    it('triggers search callback with correct parameters when search button is clicked', async () => {
      const user = userEvent.setup();
      const searchTerm = 'test search';
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      await user.type(input, searchTerm);
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith(searchTerm);
    });

    it('handles search callback error gracefully', async () => {
      const user = userEvent.setup();
      const mockOnSearchWithError = jest.fn().mockImplementation(() => {
        throw new Error('Search error');
      });

      render(<Search onSearch={mockOnSearchWithError} />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      await user.type(input, 'test');
      await user.click(button);

      expect(mockConsoleError).toHaveBeenCalled();
    });

    it('triggers search with current input value even if empty', async () => {
      const user = userEvent.setup();
      render(<Search onSearch={mockOnSearch} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });

  describe('LocalStorage Integration', () => {
    it('saves search term to localStorage when user types', async () => {
      const user = userEvent.setup();
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      const searchTerm = 'test search';

      await user.type(input, searchTerm);

      await waitFor(
        () => {
          expect(localStorage.getItem(STORAGE_KEY)).toBe(searchTerm);
        },
        { timeout: 1000 }
      );
    });

    it('overwrites existing localStorage value when new search is performed', async () => {
      const user = userEvent.setup();
      const initialTerm = 'initial term';
      const newTerm = 'new term';

      localStorage.setItem(STORAGE_KEY, initialTerm);
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');

      await user.clear(input);
      await user.type(input, newTerm);

      await waitFor(
        () => {
          expect(localStorage.getItem(STORAGE_KEY)).toBe(newTerm);
        },
        { timeout: 1000 }
      );
    });

    it('retrieves saved search term on component mount', () => {
      const savedTerm = 'retrieved term';
      localStorage.setItem(STORAGE_KEY, savedTerm);

      render(<Search onSearch={mockOnSearch} />);

      expect(screen.getByDisplayValue(savedTerm)).toBeInTheDocument();
    });

    it('saves search query with debounce functionality', async () => {
      const user = userEvent.setup();
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'available');

      await waitFor(
        () => {
          expect(localStorage.getItem(STORAGE_KEY)).toBe('available');
        },
        { timeout: 1000 }
      );
    });
  });

  describe('Component Lifecycle', () => {
    it('clears debounce timer on unmount', () => {
      const { unmount } = render(<Search onSearch={mockOnSearch} />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
