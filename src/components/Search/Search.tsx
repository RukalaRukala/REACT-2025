import { useState, useEffect, useRef, useCallback } from 'react';
import SearchField from './components/SearchField.tsx';
import SearchButton from './components/SearchButton.tsx';
import StatusHint from './components/StatusHint.tsx';
import type { SearchProps } from './Search.model.tsx';
import {
  EMPTY_STRING,
  STORAGE_KEY,
  CONSOLE_MESSAGES,
} from './Search.const.tsx';
import styles from './Search.module.scss';

const Search = ({ onSearch }: SearchProps) => {
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadSearchQueryFromStorage = (): string => {
    try {
      const savedQuery = localStorage.getItem(STORAGE_KEY);
      return savedQuery || EMPTY_STRING;
    } catch (error) {
      console.warn(CONSOLE_MESSAGES.STORAGE_LOAD_ERROR, error);
      return EMPTY_STRING;
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>(
    loadSearchQueryFromStorage
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const saveSearchQueryToStorage = useCallback((query: string): void => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, query);
      } catch (error) {
        console.warn(CONSOLE_MESSAGES.STORAGE_SAVE_ERROR, error);
      }
    }, 500);
  }, []);

  const handleSearchChange = useCallback(
    (value: string): void => {
      setSearchQuery(value);
      saveSearchQueryToStorage(value);
    },
    [saveSearchQueryToStorage]
  );

  const handleSearch = useCallback((): void => {
    try {
      onSearch(searchQuery);
    } catch (error) {
      console.error(CONSOLE_MESSAGES.SEARCH_START_ERROR, error);
    }
  }, [onSearch, searchQuery]);

  const renderSearchField = () => {
    return <SearchField value={searchQuery} onChange={handleSearchChange} />;
  };

  const renderSearchButton = () => {
    return <SearchButton onSearch={handleSearch} />;
  };

  const renderStatusHint = () => {
    return <StatusHint />;
  };

  return (
    <div className={styles.searchContainer}>
      {renderSearchField()}
      {renderSearchButton()}
      {renderStatusHint()}
    </div>
  );
};

export default Search;
