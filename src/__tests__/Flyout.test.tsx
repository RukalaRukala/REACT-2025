import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';
import Flyout from '../components/Flyout/Flyout';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe('Flyout Tests', () => {
  beforeEach(() => {
    mockStore.dispatch({
      type: 'selectedItems/unselectAllPets',
    });
  });

  it('should not render when no pets are selected', () => {
    renderWithProvider(<Flyout />);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('should render when pets are selected', () => {
    const testPet = {
      id: 1,
      name: 'Test Pet',
      status: 'available' as const,
      photoUrls: [],
    };

    mockStore.dispatch({
      type: 'selectedItems/togglePetSelection',
      payload: testPet,
    });

    renderWithProvider(<Flyout />);
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });

  it('should render correct count for multiple pets', () => {
    const testPets = [
      { id: 1, name: 'Pet 1', status: 'available' as const, photoUrls: [] },
      { id: 2, name: 'Pet 2', status: 'pending' as const, photoUrls: [] },
    ];

    testPets.forEach((pet) => {
      mockStore.dispatch({
        type: 'selectedItems/togglePetSelection',
        payload: pet,
      });
    });

    renderWithProvider(<Flyout />);
    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  it('should unselect all pets when clicking "Unselect all"', () => {
    const testPet = {
      id: 1,
      name: 'Test Pet',
      status: 'available' as const,
      photoUrls: [],
    };

    mockStore.dispatch({
      type: 'selectedItems/togglePetSelection',
      payload: testPet,
    });

    renderWithProvider(<Flyout />);
    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('should trigger download when clicking "Download"', () => {
    const mockUrl = 'blob:test';
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn(() => mockUrl);

    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    const testPet = {
      id: 1,
      name: 'Test Pet',
      status: 'available' as const,
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'friendly' }],
      photoUrls: ['photo1.jpg'],
    };

    mockStore.dispatch({
      type: 'selectedItems/togglePetSelection',
      payload: testPet,
    });

    renderWithProvider(<Flyout />);
    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    URL.createObjectURL = originalCreateObjectURL;
  });
});
