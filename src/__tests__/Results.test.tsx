import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';

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
    render(<Results pets={testPets} isLoading={false} />);

    expect(screen.getByText('Tusik')).toBeInTheDocument();
    expect(screen.getByText('Belka')).toBeInTheDocument();
  });

  it('shows no results message when empty', () => {
    render(<Results pets={[]} isLoading={false} />);

    expect(screen.getByText('No pets found')).toBeInTheDocument();
  });

  it('shows loading skeletons', () => {
    render(<Results pets={[]} isLoading={true} />);

    const skeletons = screen.getAllByTestId('skeleton-item');
    expect(skeletons).toHaveLength(3);
  });

  it('shows pet names correctly', () => {
    render(<Results pets={testPets} isLoading={false} />);

    expect(screen.getByText('Tusik')).toBeInTheDocument();
    expect(screen.getByText('Belka')).toBeInTheDocument();
    expect(screen.getByText('available')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });
});
