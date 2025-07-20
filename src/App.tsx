import { Component } from 'react';
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
  currentSearchQuery: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      searchResults: [],
      isLoading: false,
      hasSearched: false,
      searchError: null,
      currentSearchQuery: '',
    };
  }

  handleSearchError = (error: unknown): void => {
    console.error(CONSOLE_MESSAGES.SEARCH_ERROR, error);

    let errorMessage: string = APP_MESSAGES.ERROR_OCCURRED;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    this.setState({
      searchError: errorMessage,
      searchResults: [],
      isLoading: false,
    });
  };

  handleSearch = async (query: string): Promise<void> => {
    this.setState({
      isLoading: true,
      hasSearched: true,
      searchError: null,
      searchResults: [],
    });

    try {
      const results = await searchPetsByStatus(query);

      this.setState({
        searchResults: results,
        isLoading: false,
        searchError: null,
      });
    } catch (error) {
      this.handleSearchError(error);
    }
  };

  hasError = (): boolean => {
    return this.state.searchError !== null;
  };

  renderHeader = () => {
    return (
      <header className="app-header">
        <h1 className="app-title">{APP_TITLES.MAIN_TITLE}</h1>
        <p className="app-subtitle">{APP_TITLES.SUBTITLE}</p>
        <TestErrorButton />
      </header>
    );
  };

  renderSearchSection = () => {
    return (
      <section className="search-section">
        <h2 className="search-section-title">{APP_TITLES.SEARCH_SECTION}</h2>
        <Search onSearch={this.handleSearch} />

        {this.hasError() && (
          <div className="error-message">{this.state.searchError}</div>
        )}
      </section>
    );
  };

  renderResultsSection = () => {
    const { searchResults, isLoading, hasSearched } = this.state;

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

  render() {
    return (
      <div className="app">
        {this.renderHeader()}
        {this.renderSearchSection()}
        {this.renderResultsSection()}
      </div>
    );
  }
}

export default App;
