import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Item from '../components/Results/components/Item';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';

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

const testPet = {
  id: 1,
  name: 'Tusik',
  status: 'available' as const,
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['tusik.jpg'],
};

const petWithoutCategory = {
  id: 2,
  name: 'Belka',
  status: 'pending' as const,
  photoUrls: ['belka.jpg'],
};

describe('Item Tests', () => {
  it('shows pet info', () => {
    renderWithProviders(<Item pet={testPet} />);

    expect(screen.getByText('Tusik')).toBeInTheDocument();
    expect(screen.getByText('available')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Dogs')).toBeInTheDocument();
  });

  it('shows not specified when no category', () => {
    renderWithProviders(<Item pet={petWithoutCategory} />);

    expect(screen.getByText('Belka')).toBeInTheDocument();
    expect(screen.getByText('Not specified')).toBeInTheDocument();
  });
});
