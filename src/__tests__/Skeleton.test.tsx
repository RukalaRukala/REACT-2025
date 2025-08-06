import { render } from '@testing-library/react';
import Skeleton from '../components/Skeleton/Skeleton';

const EXPECTED_DEFAULT_STYLES = {
  height: '1.25rem',
  width: '100%',
  borderRadius: '0.25rem',
};

describe('Skeleton Tests', () => {
  it('renders skeleton element', () => {
    render(<Skeleton />);

    const skeletonElement = document.querySelector('.skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('uses default styles', () => {
    render(<Skeleton />);

    const skeletonElement = document.querySelector('.skeleton');
    expect(skeletonElement).toHaveStyle(EXPECTED_DEFAULT_STYLES);
  });

  it('applies custom class', () => {
    render(<Skeleton className="my-skeleton" />);

    const skeletonElement = document.querySelector('.skeleton');
    expect(skeletonElement).toHaveClass('my-skeleton');
  });
});
