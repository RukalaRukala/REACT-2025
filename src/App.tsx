import { useState, useCallback } from 'react';
import './App.scss';
import Search from './components/Search/Search.tsx';
import Results from './components/Results/Results.tsx';
import TestErrorButton from './components/ErrorBoundary/TestErrorButton.tsx';
import { searchPetsByStatus } from './components/Search/Search.api.tsx';
import type { Pet } from './components/Search/Search.model.tsx';
import {
  APP_TITLES,
  APP_MESSAGES,
  CONSOLE_MESSAGES,
} from './components/Search/Search.const.tsx';

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
    console.error(CONSOLE_MESSAGES.SEARCH_ERROR, error);

    let errorMessage: string = APP_MESSAGES.ERROR_OCCURRED;

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

  const hasError = (): boolean => {
    return state.searchError !== null;
  };

  const renderHeader = () => {
    return (
      <header className="app-header">
        <h1 className="app-title">{APP_TITLES.MAIN_TITLE}</h1>
        <p className="app-subtitle">{APP_TITLES.SUBTITLE}</p>
        <TestErrorButton />
      </header>
    );
  };

  const renderSearchSection = () => {
    return (
      <section className="search-section">
        <h2 className="search-section-title">{APP_TITLES.SEARCH_SECTION}</h2>
        <Search onSearch={handleSearch} />

        {hasError() && <div className="error-message">{state.searchError}</div>}
      </section>
    );
  };

  const renderResultsSection = () => {
    const { searchResults, isLoading, hasSearched } = state;

    if (!hasSearched) {
      return <></>;
    }

    return (
      <section className="results-section">
        <h2 className="results-section-title">
          {isLoading
            ? APP_MESSAGES.SEARCHING
            : `${APP_MESSAGES.SEARCH_RESULTS} ${searchResults.length > 0 ? `(${searchResults.length})` : ''}`}
        </h2>
        <Results pets={searchResults} isLoading={isLoading} />
      </section>
    );
  };

  return (
    <div className="app">
      {renderHeader()}
      {renderSearchSection()}
      {renderResultsSection()}
    </div>
  );
};

export default App;
