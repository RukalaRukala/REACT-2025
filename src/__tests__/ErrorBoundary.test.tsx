import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from '../components/ErrorBoundary/TestErrorButton';

const mockConsoleError = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test component error');
  }
  return <div>Working component</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    mockConsoleError.mockClear();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('Error Catching Tests', () => {
    it('catches and handles JavaScript errors in child components', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText('Oops! Something went wrong')
      ).toBeInTheDocument();
      expect(
        screen.getByText('An unexpected error occurred in the application.')
      ).toBeInTheDocument();
    });

    it('displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Try Again')).toBeInTheDocument();
      expect(screen.getByText('Reload Page')).toBeInTheDocument();
      expect(
        screen.getByText('Error Details (Development Only)')
      ).toBeInTheDocument();
    });

    it('logs error to console', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error Boundary caught an error:',
        expect.any(Error)
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error Info:',
        expect.any(Object)
      );
    });

    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Working component')).toBeInTheDocument();
      expect(
        screen.queryByText('Oops! Something went wrong')
      ).not.toBeInTheDocument();
    });
  });

  describe('Error Button Tests', () => {
    it('throws error when test button is clicked', () => {
      render(
        <ErrorBoundary>
          <TestErrorButton />
        </ErrorBoundary>
      );

      const testButton = screen.getByText('Test Error Boundary');
      fireEvent.click(testButton);

      expect(
        screen.getByText('Oops! Something went wrong')
      ).toBeInTheDocument();
    });

    it('triggers error boundary fallback UI', () => {
      render(
        <ErrorBoundary>
          <TestErrorButton />
        </ErrorBoundary>
      );

      const testButton = screen.getByText('Test Error Boundary');
      fireEvent.click(testButton);

      expect(screen.getByText('Try Again')).toBeInTheDocument();
      expect(screen.getByText('Reload Page')).toBeInTheDocument();
      expect(screen.queryByText('Test Error Boundary')).not.toBeInTheDocument();
    });
  });
});
