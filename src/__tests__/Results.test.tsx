import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';
import { MemoryRouter } from 'react-router-dom';
import Item from '../components/Results/components/Item.tsx';

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
    render(
      <MemoryRouter>
        <Results
          pets={testPets}
          isLoading={false}
          page={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Tusik')).toBeInTheDocument();
    expect(screen.getByText('Belka')).toBeInTheDocument();
  });

  it('shows loading skeletons', () => {
    render(
      <MemoryRouter>
        <Results
          pets={[]}
          isLoading={true}
          page={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </MemoryRouter>
    );

    const skeletons = screen.getAllByTestId('skeleton-item');
    expect(skeletons).toHaveLength(4);
  });

  test('shows pet names correctly', () => {
    const pet = {
      id: 1,
      name: 'Rex',
      status: 'available' as const,
      photoUrls: [],
    };
    render(
      <MemoryRouter>
        <Item pet={pet} />
      </MemoryRouter>
    );
    expect(screen.getByText('Rex')).toBeInTheDocument();
  });
});
