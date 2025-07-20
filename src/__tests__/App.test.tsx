import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { searchPetsByStatus } from '../components/Search/Search.api';

jest.mock('../components/Search/Search.api');
const mockApi = searchPetsByStatus as jest.MockedFunction<
  typeof searchPetsByStatus
>;

const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

const testPets = [
  {
    id: 1,
    name: 'Tusik',
    status: 'available' as const,
    category: { id: 1, name: 'Dogs' },
    photoUrls: ['photo1.jpg'],
  },
];

describe('App Component', () => {
  beforeEach(() => {
    mockApi.mockClear();
    mockConsole.mockClear();
    localStorage.clear();
  });

  afterAll(() => {
    mockConsole.mockRestore();
  });

  it('renders application header', () => {
    render(<App />);

    expect(screen.getByText('Pet Store Search')).toBeInTheDocument();
    expect(
      screen.getByText('Find your perfect pet by status')
    ).toBeInTheDocument();
  });

  it('shows search input and button', () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('loads saved search query', () => {
    localStorage.setItem('searchQuery', 'available');

    render(<App />);

    expect(screen.getByDisplayValue('available')).toBeInTheDocument();
  });

  it('calls API on search', async () => {
    mockApi.mockResolvedValue(testPets);

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'available' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockApi).toHaveBeenCalledWith('available');
    });
  });

  it('displays search results', async () => {
    mockApi.mockResolvedValue(testPets);

    render(<App />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Tusik')).toBeInTheDocument();
    });
  });

  it('shows error when API fails', async () => {
    mockApi.mockRejectedValue(new Error('Server error'));

    render(<App />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('shows loading indicator', async () => {
    mockApi.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(testPets), 100))
    );

    render(<App />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });
});
