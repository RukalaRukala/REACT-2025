import { render, screen } from '@testing-library/react';
import About from '../components/pages/About';

describe('About page', () => {
  it('renders author info', () => {
    render(<About />);
    expect(screen.getByText(/author|автор/i)).toBeInTheDocument();
  });

  it('contains RS School React course link', () => {
    render(<About />);
    const link = screen.getByRole('link', { name: /rs school react/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('rs.school/react')
    );
  });
});
