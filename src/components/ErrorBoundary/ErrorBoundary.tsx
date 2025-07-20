import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { ERROR_BOUNDARY_MESSAGES } from '../Search/Search.const.tsx';
import styles from './ErrorBoundary.module.scss';

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
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>{ERROR_BOUNDARY_MESSAGES.TITLE}</h2>
          <p className={styles.errorDescription}>
            {ERROR_BOUNDARY_MESSAGES.DESCRIPTION}
          </p>

          <div className={styles.buttonContainer}>
            <button
              onClick={this.handleReset}
              className={styles.tryAgainButton}
            >
              {ERROR_BOUNDARY_MESSAGES.TRY_AGAIN}
            </button>
            <button onClick={this.handleReload} className={styles.reloadButton}>
              {ERROR_BOUNDARY_MESSAGES.RELOAD_PAGE}
            </button>
          </div>

          {this.state.error && (
            <details className={styles.errorDetails}>
              <summary className={styles.errorSummary}>
                {ERROR_BOUNDARY_MESSAGES.ERROR_DETAILS}
              </summary>
              <pre className={styles.errorPre}>
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
