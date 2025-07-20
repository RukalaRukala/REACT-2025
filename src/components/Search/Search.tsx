import { Component } from 'react';
import SearchField from './components/SearchField.tsx';
import SearchButton from './components/SearchButton.tsx';
import StatusHint from './components/StatusHint.tsx';
import type { SearchProps, SearchState } from './Search.model.tsx';
import {
  EMPTY_STRING,
  STORAGE_KEY,
  CONSOLE_MESSAGES,
} from './Search.const.tsx';
import styles from './Search.module.scss';

class Search extends Component<SearchProps, SearchState> {
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchQuery: this.loadSearchQueryFromStorage(),
    };
  }

  componentWillUnmount(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  loadSearchQueryFromStorage = (): string => {
    try {
      const savedQuery = localStorage.getItem(STORAGE_KEY);
      return savedQuery || EMPTY_STRING;
    } catch (error) {
      console.warn(CONSOLE_MESSAGES.STORAGE_LOAD_ERROR, error);
      return EMPTY_STRING;
    }
  };

  saveSearchQueryToStorage = (query: string): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, query);
      } catch (error) {
        console.warn(CONSOLE_MESSAGES.STORAGE_SAVE_ERROR, error);
      }
    }, 500);
  };

  handleSearchChange = (value: string): void => {
    this.setState({ searchQuery: value });
    this.saveSearchQueryToStorage(value);
  };

  handleSearch = (): void => {
    const { onSearch } = this.props;
    const { searchQuery } = this.state;

    try {
      onSearch(searchQuery);
    } catch (error) {
      console.error(CONSOLE_MESSAGES.SEARCH_START_ERROR, error);
    }
  };

  renderSearchField = () => {
    const { searchQuery } = this.state;

    return (
      <SearchField value={searchQuery} onChange={this.handleSearchChange} />
    );
  };

  renderSearchButton = () => {
    return <SearchButton onSearch={this.handleSearch} />;
  };

  renderStatusHint = () => {
    return <StatusHint />;
  };

  render() {
    return (
      <div className={styles.searchContainer}>
        {this.renderSearchField()}
        {this.renderSearchButton()}
        {this.renderStatusHint()}
      </div>
    );
  }
}

export default Search;
