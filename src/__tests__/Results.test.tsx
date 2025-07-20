import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';

const mockPets = [
  {
    id: 1,
    name: 'Tusik',
    status: 'available' as const,
    category: { id: 1, name: 'Dogs' },
    photoUrls: ['photo1.jpg'],
  },
  {
    id: 2,
    name: 'Belka',
    status: 'pending' as const,
    category: { id: 2, name: 'Cats' },
    photoUrls: ['photo2.jpg'],
  },
  {
    id: 3,
    name: 'Rex',
    status: 'sold' as const,
    photoUrls: ['photo3.jpg'],
  },
];

describe('Results Component', () => {
  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', () => {
      render(<Results pets={mockPets} isLoading={false} />);

      expect(screen.getByText('Tusik')).toBeInTheDocument();
      expect(screen.getByText('Belka')).toBeInTheDocument();
      expect(screen.getByText('Rex')).toBeInTheDocument();
      expect(screen.getByText('available')).toBeInTheDocument();
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('sold')).toBeInTheDocument();
    });

    it('displays "no results" message when data array is empty', () => {
      render(<Results pets={[]} isLoading={false} />);

      expect(screen.getByText('No pets found')).toBeInTheDocument();
    });

    it('renders items with correct structure when data is provided', () => {
      render(<Results pets={mockPets} isLoading={false} />);

      expect(screen.getAllByText('ID:')).toHaveLength(3);
      expect(screen.getAllByText('Name:')).toHaveLength(3);
      expect(screen.getAllByText('Category:')).toHaveLength(3);
    });
  });

  describe('Data Display Tests', () => {
    it('correctly displays item names and descriptions', () => {
      render(<Results pets={mockPets} isLoading={false} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Tusik')).toBeInTheDocument();
      expect(screen.getByText('Dogs')).toBeInTheDocument();

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Belka')).toBeInTheDocument();
      expect(screen.getByText('Cats')).toBeInTheDocument();
    });

    it('handles missing or undefined data gracefully', () => {
      const petsWithMissingData = [
        {
          id: 1,
          name: 'Tusik',
          status: 'available' as const,
          photoUrls: ['photo1.jpg'],
        },
        {
          id: 2,
          name: 'Belka',
          status: 'pending' as const,
          category: undefined,
          photoUrls: ['photo2.jpg'],
        },
      ];

      render(<Results pets={petsWithMissingData} isLoading={false} />);

      expect(screen.getByText('Tusik')).toBeInTheDocument();
      expect(screen.getByText('Belka')).toBeInTheDocument();
      expect(screen.getAllByText('Not specified')).toHaveLength(2);
    });

    it('displays all pet statuses correctly', () => {
      render(<Results pets={mockPets} isLoading={false} />);

      expect(screen.getByText('available')).toBeInTheDocument();
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('sold')).toBeInTheDocument();
    });

    it('handles pets with missing category gracefully', () => {
      const petWithoutCategory = [
        {
          id: 1,
          name: 'Buddy',
          status: 'available' as const,
          photoUrls: ['photo1.jpg'],
        },
      ];

      render(<Results pets={petWithoutCategory} isLoading={false} />);

      expect(screen.getByText('Buddy')).toBeInTheDocument();
      expect(screen.getByText('Not specified')).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('displays no results message when API returns empty array', () => {
      render(<Results pets={[]} isLoading={false} />);

      expect(screen.getByText('No pets found')).toBeInTheDocument();
      expect(screen.queryByText('available')).not.toBeInTheDocument();
      expect(screen.queryByText('pending')).not.toBeInTheDocument();
      expect(screen.queryByText('sold')).not.toBeInTheDocument();
    });
  });
});
