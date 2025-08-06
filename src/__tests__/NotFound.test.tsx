import { render, screen } from '@testing-library/react';
import NotFound from '../components/pages/NotFound';

describe('NotFound page', () => {
  it('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 — Page not found')).toBeInTheDocument();
  });
});
