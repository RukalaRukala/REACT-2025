import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';
import { MemoryRouter } from 'react-router-dom';
import type { Pet } from '../components/Search/Search.model';

jest.mock('../components/Results/components/Item', () => {
  return {
    __esModule: true,
    default: (props: { pet: Pet }) => (
      <div data-testid={`pet-item-${props.pet.id}`}>{props.pet.name}</div>
    ),
  };
});

jest.mock('../components/Results/components/SkeletonItem', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="skeleton-item">Loading...</div>,
  };
});

const SKELETON_COUNT = 3;

describe('Results Tests', () => {
  const testPets = [
    { id: 1, name: 'Rex', status: 'available' as const, photoUrls: [] },
    { id: 2, name: 'Sharik', status: 'pending' as const, photoUrls: [] },
    { id: 3, name: 'Bobik', status: 'sold' as const, photoUrls: [] },
  ];

  const renderComponent = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('shows skeletons while loading', () => {
    renderComponent(
      <Results pets={[]} isLoading={true} page={1} onPageChange={() => {}} />
    );

    const skeletons = screen.getAllByTestId('skeleton-item');
    expect(skeletons.length).toBe(SKELETON_COUNT);

    const petItems = screen.queryByTestId(/pet-item/);
    expect(petItems).not.toBeInTheDocument();
  });

  test('shows pet list when loading is completed', () => {
    renderComponent(
      <Results
        pets={testPets}
        isLoading={false}
        page={1}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByTestId('pet-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('pet-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('pet-item-3')).toBeInTheDocument();

    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Sharik')).toBeInTheDocument();
    expect(screen.getByText('Bobik')).toBeInTheDocument();

    const skeletons = screen.queryByTestId('skeleton-item');
    expect(skeletons).not.toBeInTheDocument();
  });

  test('shows nothing if pet list is empty', () => {
    const { container } = renderComponent(
      <Results pets={[]} isLoading={false} page={1} onPageChange={() => {}} />
    );

    expect(screen.queryByTestId(/pet-item/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-item')).not.toBeInTheDocument();

    expect(container.firstChild).toBeNull();
  });
});
