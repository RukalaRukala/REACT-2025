import { useState } from 'react';
import './App.scss';
import Search from './components/Search/Search.tsx';
import Results from './components/Results/Results.tsx';
import { searchPetsByStatus } from './components/Search/Search.api.tsx';
import type { Pet } from './components/Search/Search.model.tsx';

function App() {
  const [searchResults, setSearchResults] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await searchPetsByStatus(query);
      console.log('Search results:', results);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Pet Store Search</h1>
        <p className="app-subtitle">Find your perfect pet by status</p>
      </header>

      <section className="search-section">
        <h2 className="search-section-title">Search Pets</h2>
        <Search onSearch={handleSearch} />
      </section>

      {hasSearched && (
        <section className="results-section">
          <h2 className="results-section-title">
            {isLoading
              ? 'Searching...'
              : `Search Results ${searchResults.length > 0 ? `(${searchResults.length})` : ''}`}
          </h2>
          <Results pets={searchResults} isLoading={isLoading} />
        </section>
      )}
    </div>
  );
}

export default App;
