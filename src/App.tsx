import { Component } from 'react';
import './App.scss';
import Header from './components/Header/Header.tsx';
import SearchSection from './components/SearchSection/SearchSection.tsx';
import ResultsSection from './components/ResultsSection/ResultsSection.tsx';
import { searchPetsByStatus } from './components/Search/Search.api.tsx';
import { CONSOLE_MESSAGES, APP_MESSAGES } from './constants';
import type { Pet } from './components/Search/Search.model.tsx';

interface AppState {
  searchResults: Pet[];
  isLoading: boolean;
  hasSearched: boolean;
  searchError: string | null;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      searchResults: [],
      isLoading: false,
      hasSearched: false,
      searchError: null,
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

  render() {
    return (
      <div className="app">
        <Header />
        <SearchSection
          onSearch={this.handleSearch}
          searchError={this.state.searchError}
        />
        <ResultsSection
          searchResults={this.state.searchResults}
          isLoading={this.state.isLoading}
          hasSearched={this.state.hasSearched}
        />
      </div>
    );
  }
}

export default App;
