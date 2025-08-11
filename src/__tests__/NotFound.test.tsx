import { render, screen } from '@testing-library/react';
import NotFound from '../components/pages/NotFound';
import { APP_MESSAGES } from '../App.const';

describe('NotFound Page', () => {
  test('renders not found message', () => {
    render(<NotFound />);

    expect(screen.getByText(APP_MESSAGES.NOT_FOUND)).toBeInTheDocument();
  });

  test('has correct CSS class', () => {
    const { container } = render(<NotFound />);
    const notFoundElement = container.querySelector('.not-found');
    expect(notFoundElement).toBeInTheDocument();
  });

  test('displays exact message from constants', () => {
    render(<NotFound />);
    const messageElement = screen.getByText('404 — Page not found');
    expect(messageElement).toBeInTheDocument();
  });
});
