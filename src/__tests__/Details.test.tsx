import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Details from '../components/Results/components/Details';

jest.mock('../components/Search/Search.api', () => ({
  searchPetsByStatus: jest.fn(),
}));

import { searchPetsByStatus } from '../components/Search/Search.api';

const testPet = {
  id: 1,
  name: 'Bobby',
  status: 'available',
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['photo1.jpg'],
};

describe('Details Tests', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state', () => {
    (searchPetsByStatus as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<Details id="1" onClose={mockOnClose} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows pet information', async () => {
    (searchPetsByStatus as jest.Mock)
      .mockResolvedValueOnce([testPet])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    render(<Details id="1" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Pet Details')).toBeInTheDocument();
    });

    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Name: Bobby')).toBeInTheDocument();
    expect(screen.getByText('Status: available')).toBeInTheDocument();
    expect(screen.getByText('Category: Dogs')).toBeInTheDocument();
  });

  test('shows error when pet is not found', async () => {
    (searchPetsByStatus as jest.Mock).mockResolvedValue([]);

    render(<Details id="999" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  test('shows error when API fails', async () => {
    (searchPetsByStatus as jest.Mock).mockRejectedValue(
      new Error('Something went wrong')
    );

    render(<Details id="1" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  test('close button works', async () => {
    (searchPetsByStatus as jest.Mock)
      .mockResolvedValueOnce([testPet])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    render(<Details id="1" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Pet Details')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close details/i });
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('searches for pet in all statuses', async () => {
    (searchPetsByStatus as jest.Mock).mockResolvedValue([]);

    render(<Details id="1" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });

    expect(searchPetsByStatus).toHaveBeenCalledWith('available');
    expect(searchPetsByStatus).toHaveBeenCalledWith('pending');
    expect(searchPetsByStatus).toHaveBeenCalledWith('sold');
  });
});
