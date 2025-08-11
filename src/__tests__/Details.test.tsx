import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Details from '../components/Results/components/Details';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';
import { petsApi } from '../store/api/petsApi';

jest.mock('../store/api/petsApi', () => {
  const actualModule = jest.requireActual('../store/api/petsApi');
  return {
    ...actualModule,
    useGetPetByIdQuery: jest.fn(),
  };
});

import { useGetPetByIdQuery } from '../store/api/petsApi';

type MockQueryResult = {
  data: typeof testPet | null | undefined;
  isLoading: boolean;
  error: { message: string } | undefined;
  refetch: jest.Mock;
};

const testPet = {
  id: 1,
  name: 'Bobby',
  status: 'available',
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['photo1.jpg'],
};

const createTestStore = () =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      [petsApi.reducerPath]: petsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(petsApi.middleware),
  });

const renderWithProvider = (component: React.ReactElement) => {
  const testStore = createTestStore();
  return render(<Provider store={testStore}>{component}</Provider>);
};

describe('Details Tests', () => {
  const mockOnClose = jest.fn();
  const mockUseGetPetByIdQuery = useGetPetByIdQuery as jest.MockedFunction<
    typeof useGetPetByIdQuery
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClose.mockClear();
  });

  test('shows loading state', () => {
    mockUseGetPetByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: jest.fn(),
    } satisfies MockQueryResult);

    renderWithProvider(<Details id="1" onClose={mockOnClose} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows pet information', async () => {
    mockUseGetPetByIdQuery.mockReturnValue({
      data: testPet,
      isLoading: false,
      error: undefined,
      refetch: jest.fn(),
    } satisfies MockQueryResult);

    renderWithProvider(<Details id="1" onClose={mockOnClose} />);

    expect(screen.getByText(/Bobby/)).toBeInTheDocument();
    expect(screen.getByText(/ID.*1/)).toBeInTheDocument();
    expect(screen.getByText(/available/)).toBeInTheDocument();
  });

  test('shows error when pet is not found', async () => {
    mockUseGetPetByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: undefined,
      refetch: jest.fn(),
    } satisfies MockQueryResult);

    renderWithProvider(<Details id="999" onClose={mockOnClose} />);

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  test('shows error when API fails', async () => {
    mockUseGetPetByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'API Error' },
      refetch: jest.fn(),
    } satisfies MockQueryResult);

    renderWithProvider(<Details id="1" onClose={mockOnClose} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('close button works', async () => {
    mockUseGetPetByIdQuery.mockReturnValue({
      data: testPet,
      isLoading: false,
      error: undefined,
      refetch: jest.fn(),
    } satisfies MockQueryResult);

    renderWithProvider(<Details id="1" onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close details/i });
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('refetch button works', async () => {
    const mockRefetch = jest.fn();

    mockUseGetPetByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'API Error' },
      refetch: mockRefetch,
    } satisfies MockQueryResult);

    renderWithProvider(<Details id="1" onClose={mockOnClose} />);

    const retryButton = screen.getByText('Try Again');
    await userEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalled();
  });
});
