import { render, screen } from '@testing-library/react';
import Item from '../components/Results/components/Item';

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
    render(<Item pet={testPet} />);

    expect(screen.getByText('Tusik')).toBeInTheDocument();
    expect(screen.getByText('available')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Dogs')).toBeInTheDocument();
  });

  it('shows not specified when no category', () => {
    render(<Item pet={petWithoutCategory} />);

    expect(screen.getByText('Belka')).toBeInTheDocument();
    expect(screen.getByText('Not specified')).toBeInTheDocument();
  });
});
