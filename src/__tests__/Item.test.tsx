import { render, screen } from '@testing-library/react';
import Item from '../components/Results/components/Item';

const mockPet = {
  id: 1,
  name: 'Tusik',
  status: 'available' as const,
  category: { id: 1, name: 'Dogs' },
  photoUrls: ['photo1.jpg'],
};

describe('Item Component', () => {
  describe('Rendering Tests', () => {
    it('displays item name and description correctly', () => {
      render(<Item pet={mockPet} />);

      expect(screen.getByText('Tusik')).toBeInTheDocument();
      expect(screen.getByText('available')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Dogs')).toBeInTheDocument();
    });

    it('displays all required field labels', () => {
      render(<Item pet={mockPet} />);

      expect(screen.getByText('ID:')).toBeInTheDocument();
      expect(screen.getByText('Name:')).toBeInTheDocument();
      expect(screen.getByText('Category:')).toBeInTheDocument();
    });
  });
});
