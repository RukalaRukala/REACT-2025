import type { FC } from 'react';
import Search from '../Search/Search.tsx';
import { APP_TITLES } from '../../constants';

interface SearchSectionProps {
  onSearch: (query: string) => Promise<void>;
  searchError: string | null;
}

const SearchSection: FC<SearchSectionProps> = ({ onSearch, searchError }) => {
  return (
    <section className="search-section">
      <h2 className="search-section-title">{APP_TITLES.SEARCH_SECTION}</h2>
      <Search onSearch={onSearch} />

      {searchError && <div className="error-message">{searchError}</div>}
    </section>
  );
};

export default SearchSection;
