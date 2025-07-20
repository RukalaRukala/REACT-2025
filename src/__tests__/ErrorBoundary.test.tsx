import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from '../components/ErrorBoundary/TestErrorButton';

const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

const BadComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Good component</div>;
};

describe('ErrorBoundary Tests', () => {
  beforeEach(() => {
    mockConsole.mockClear();
  });

  afterAll(() => {
    mockConsole.mockRestore();
  });

  it('catches errors from child components', () => {
    render(
      <ErrorBoundary>
        <BadComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('shows error UI with buttons', () => {
    render(
      <ErrorBoundary>
        <BadComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <BadComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Good component')).toBeInTheDocument();
  });

  it('test button throws error', () => {
    render(
      <ErrorBoundary>
        <TestErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Test Error Boundary');
    fireEvent.click(button);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });
});
