import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search/Search';
import { STORAGE_KEY } from '../components/Search/Search.const';

const mockConsole = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('Search Tests', () => {
  const mockSearch = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockSearch.mockClear();
    mockConsole.mockClear();
  });

  afterAll(() => {
    mockConsole.mockRestore();
  });

  it('shows search box and button', () => {
    render(<Search onSearch={mockSearch} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('loads saved search from storage', () => {
    localStorage.setItem(STORAGE_KEY, 'available');
    render(<Search onSearch={mockSearch} />);

    expect(screen.getByDisplayValue('available')).toBeInTheDocument();
  });

  it('updates input when typing', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'pending');

    expect(input).toHaveValue('pending');
  });

  it('calls search when button clicked', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(input, 'sold');
    await user.click(button);

    expect(mockSearch).toHaveBeenCalledWith('sold');
  });

  it('saves to localStorage when typing', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'available');

    await waitFor(() => {
      expect(localStorage.getItem(STORAGE_KEY)).toBe('available');
    });
  });
});
