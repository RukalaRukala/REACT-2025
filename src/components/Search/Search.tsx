import { useLocalStorage } from '../../hooks/useLocalStorage';

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
  const [searchQuery, setSearchQuery] = useLocalStorage(
    STORAGE_KEY,
    EMPTY_STRING
  );

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
  };

  const handleSearch = (): void => {
    try {
      onSearch(searchQuery);
    } catch (error) {
      console.error(CONSOLE_MESSAGES.SEARCH_START_ERROR, error);
    }
  };

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
