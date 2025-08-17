'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}
