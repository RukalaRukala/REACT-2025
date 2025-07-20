import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
