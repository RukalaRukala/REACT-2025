import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { searchPetsByStatus } from './components/Search/Search.api.tsx';
import type { Pet } from './components/Search/Search.model.tsx';
import { APP_MESSAGES, APP_ROUTES } from './App.const';
import MainView from './components/pages/MainView/MainView.tsx';
import NotFound from './components/pages/NotFound.tsx';

interface AppState {
  searchResults: Pet[];
  isLoading: boolean;
  hasSearched: boolean;
  searchError: string | null;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    searchResults: [],
    isLoading: false,
    hasSearched: false,
    searchError: null,
  });

  const handleSearchError = useCallback((error: unknown): void => {
    console.error('Search error:', error);

    let errorMessage: string = APP_MESSAGES.NOT_FOUND;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    setState((prevState) => ({
      ...prevState,
      searchError: errorMessage,
      searchResults: [],
      isLoading: false,
    }));
  }, []);

  const handleSearch = useCallback(
    async (query: string): Promise<void> => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        hasSearched: true,
        searchError: null,
        searchResults: [],
      }));

      try {
        const results = await searchPetsByStatus(query);

        setState((prevState) => ({
          ...prevState,
          searchResults: results,
          isLoading: false,
          searchError: null,
        }));
      } catch (error) {
        handleSearchError(error);
      }
    },
    [handleSearchError]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.ROOT} element={<Navigate to="/1" replace />} />
        <Route
          path={APP_ROUTES.PAGE}
          element={<MainView state={state} handleSearch={handleSearch} />}
        />
        <Route
          path={APP_ROUTES.DETAILS}
          element={<MainView state={state} handleSearch={handleSearch} />}
        />
        <Route path={APP_ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
