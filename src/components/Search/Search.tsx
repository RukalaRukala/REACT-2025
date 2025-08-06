import { Component } from 'react';
import SearchField from './components/SearchField.tsx';
import SearchButton from './components/SearchButton.tsx';
import StatusHint from './components/StatusHint.tsx';
import type { SearchProps, SearchState } from './Search.model.tsx';
import {
  COMMON_STRINGS,
  STORAGE_KEYS,
  CONSOLE_MESSAGES,
} from '../../constants';
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
      const savedQuery = localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY);
      return savedQuery || COMMON_STRINGS.EMPTY;
    } catch (error) {
      console.warn(CONSOLE_MESSAGES.STORAGE_LOAD_ERROR, error);
      return COMMON_STRINGS.EMPTY;
    }
  };

  saveSearchQueryToStorage = (query: string): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, query);
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
