import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { ERROR_BOUNDARY_MESSAGES } from '../Search/Search.const.tsx';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            margin: '20px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>
            {ERROR_BOUNDARY_MESSAGES.TITLE}
          </h2>
          <p style={{ color: '#7f1d1d', marginBottom: '24px' }}>
            {ERROR_BOUNDARY_MESSAGES.DESCRIPTION}
          </p>

          <div
            style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
          >
            <button
              onClick={this.handleReset}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {ERROR_BOUNDARY_MESSAGES.TRY_AGAIN}
            </button>
            <button
              onClick={this.handleReload}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {ERROR_BOUNDARY_MESSAGES.RELOAD_PAGE}
            </button>
          </div>

          {this.state.error && (
            <details style={{ marginTop: '24px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {ERROR_BOUNDARY_MESSAGES.ERROR_DETAILS}
              </summary>
              <pre
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '16px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  marginTop: '8px',
                  fontSize: '12px',
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
