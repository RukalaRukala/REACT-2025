import { useState, useEffect } from 'react';
import SearchField from './components/SearchField.tsx';
import SearchButton from './components/SearchButton.tsx';
import {
  loadSearchQuery,
  performSearch,
  useDebounceStorage,
} from './Search.utils.tsx';
import styles from './Search.module.scss';
import { EMPTY_STRING } from './Search.const.tsx';

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>(EMPTY_STRING);

  useEffect(() => {
    const savedQuery = loadSearchQuery();
    if (savedQuery) setSearchQuery(savedQuery);
  }, []);

  useDebounceStorage(searchQuery);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    performSearch(searchQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchField value={searchQuery} onChange={handleSearchChange} />
      <SearchButton onSearch={handleSearch} />
    </div>
  );
}

export default Search;
