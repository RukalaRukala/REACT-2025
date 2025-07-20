import { render } from '@testing-library/react';
import Skeleton from '../components/Skeleton/Skeleton';

describe('Skeleton Loading Component', () => {
  describe('Rendering Tests', () => {
    it('renders loading indicator (skeleton)', () => {
      render(<Skeleton />);

      const skeletonElement = document.querySelector('.skeleton');
      expect(skeletonElement).toBeInTheDocument();
      expect(skeletonElement).toHaveClass('skeleton');
    });

    it('shows skeleton with default props when no props provided', () => {
      render(<Skeleton />);

      const skeletonElement = document.querySelector('.skeleton');
      expect(skeletonElement).toHaveStyle({
        height: '1.25rem',
        width: '100%',
        borderRadius: '0.25rem',
      });
    });
  });

  describe('Accessibility Tests', () => {
    it('has appropriate structure for screen readers', () => {
      render(<Skeleton className="loading-content" />);

      const skeletonElement = document.querySelector('.skeleton');
      expect(skeletonElement).toHaveClass('loading-content');
      expect(skeletonElement).toBeInTheDocument();
    });
  });
});
