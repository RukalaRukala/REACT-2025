import { useState, useEffect } from 'react';
import SearchField from './components/SearchField.tsx';
import SearchButton from './components/SearchButton.tsx';
import StatusHint from './components/StatusHint.tsx';
import { loadSearchQuery, useDebounceStorage } from './Search.utils.tsx';
import styles from './Search.module.scss';
import { EMPTY_STRING } from './Search.const.tsx';

interface SearchProps {
  onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
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
    onSearch(searchQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchField value={searchQuery} onChange={handleSearchChange} />
      <SearchButton onSearch={handleSearch} />
      <StatusHint />
    </div>
  );
}

export default Search;
