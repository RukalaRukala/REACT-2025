import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Results from '../components/Results/Results';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';
import Item from '../components/Results/components/Item.tsx';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

const testPets = [
  {
    id: 1,
    name: 'Tusik',
    status: 'available' as const,
    category: { id: 1, name: 'Dogs' },
    photoUrls: ['tusik.jpg'],
  },
  {
    id: 2,
    name: 'Belka',
    status: 'pending' as const,
    category: { id: 2, name: 'Cats' },
    photoUrls: ['belka.jpg'],
  },
];

describe('Results Tests', () => {
  it('shows pets when data exists', () => {
    renderWithProviders(
      <Results
        pets={testPets}
        isLoading={false}
        page={1}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText('Tusik')).toBeInTheDocument();
    expect(screen.getByText('Belka')).toBeInTheDocument();
  });

  it('shows loading skeletons', () => {
    renderWithProviders(
      <Results pets={[]} isLoading={true} page={1} onPageChange={() => {}} />
    );

    const skeletons = screen.getAllByTestId('skeleton-item');
    expect(skeletons).toHaveLength(3);
  });

  test('shows pet names correctly', () => {
    const pet = {
      id: 1,
      name: 'Rex',
      status: 'available' as const,
      photoUrls: [],
    };
    renderWithProviders(<Item pet={pet} />);

    expect(screen.getByText('Rex')).toBeInTheDocument();
  });
});
