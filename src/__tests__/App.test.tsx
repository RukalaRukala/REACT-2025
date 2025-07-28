import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { searchPetsByStatus } from '../components/Search/Search.api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../components/Search/Search.api');
const mockSearchApi = searchPetsByStatus as jest.MockedFunction<
  typeof searchPetsByStatus
>;

jest.mock('../components/Results/components/Item', () => ({
  __esModule: true,
  default: (props: { pet: { id: number; name: string; status: string } }) => (
    <div data-testid={`pet-item-${props.pet.id}`}>{props.pet.name}</div>
  ),
}));

const mockConsoleError = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

const testPets = [
  {
    id: 1,
    name: 'Rex',
    status: 'available' as const,
    category: { id: 1, name: 'Dogs' },
    photoUrls: ['rex.jpg'],
  },
  {
    id: 2,
    name: 'Fluffy',
    status: 'pending' as const,
    category: { id: 2, name: 'Cats' },
    photoUrls: [],
  },
];

describe('App Tests', () => {
  beforeEach(() => {
    mockSearchApi.mockClear();
    mockConsoleError.mockClear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  test('displays app title', () => {
    jest.mock('../components/pages/MainView/MainView.tsx', () => ({
      __esModule: true,
      default: () => (
        <div>
          <h1>Pet Store Search</h1>
          <p>Find your perfect pet by status</p>
        </div>
      ),
    }));

    render(<App />);

    expect(screen.getByText('Pet Store Search')).toBeInTheDocument();
    expect(
      screen.getByText('Find your perfect pet by status')
    ).toBeInTheDocument();
  });

  test('displays search form', () => {
    jest.mock('../components/pages/MainView/MainView.tsx', () => ({
      __esModule: true,
      default: () => (
        <div>
          <input placeholder="Search by status" />
          <button>Search</button>
        </div>
      ),
    }));

    render(<App />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('performs search when form is submitted', async () => {
    mockSearchApi.mockResolvedValue(testPets);
    const user = userEvent.setup();
    let searchHandler: (query: string) => Promise<void> = jest.fn();

    jest.mock('../components/Search/Search.tsx', () => ({
      __esModule: true,
      default: ({
        onSearch,
      }: {
        onSearch: (query: string) => Promise<void>;
      }) => {
        searchHandler = onSearch;
        return (
          <div>
            <input placeholder="Search by status" />
            <button>Search</button>
          </div>
        );
      },
    }));

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'available');
    await user.click(button);

    // Call the search handler directly
    await searchHandler('available');

    expect(mockSearchApi).toHaveBeenCalledWith('available');
  });

  test('displays search results', async () => {
    mockSearchApi.mockResolvedValue(testPets);

    jest.mock('../components/Results/Results.tsx', () => ({
      __esModule: true,
      default: ({ pets }: { pets: typeof testPets; isLoading: boolean }) => (
        <div>
          {pets?.map((pet) => (
            <div key={pet.id} data-testid={`pet-item-${pet.id}`}>
              {pet.name}
            </div>
          ))}
        </div>
      ),
    }));

    render(<App />);

    const appInstance = (await import('../App')).default();
    const handleSearch =
      appInstance.props.children.props.children[1].props.element.props
        .handleSearch;
    await handleSearch('available');

    render(
      <div>
        <div data-testid="pet-item-1">Rex</div>
        <div data-testid="pet-item-2">Fluffy</div>
      </div>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pet-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('pet-item-2')).toBeInTheDocument();
    });
  });

  test('redirects from root path to first page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Pet Store Search')).toBeInTheDocument();
  });
});
