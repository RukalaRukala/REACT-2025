import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import './styles/simple-themes.css';
import { searchPetsByStatus } from './components/Search/Search.api.tsx';
import type { Pet } from './components/Search/Search.model.tsx';
import { APP_ROUTES } from './App.const';
import MainView from './components/pages/MainView/MainView.tsx';
import NotFound from './components/pages/NotFound.tsx';
import About from './components/pages/About';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  const [searchResults, setSearchResults] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      const results = await searchPetsByStatus(query);
      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Something went wrong');
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  const state = {
    searchResults,
    isLoading,
    hasSearched,
    searchError,
  };

  return (
    <ThemeProvider>
      <div className="app">
        <div className="app-header">
          <ThemeToggle />
        </div>

        <Routes>
          <Route
            path={APP_ROUTES.ROOT}
            element={<Navigate to="/1" replace />}
          />
          <Route
            path={APP_ROUTES.PAGE}
            element={<MainView state={state} handleSearch={handleSearch} />}
          />
          <Route
            path={APP_ROUTES.DETAILS}
            element={<MainView state={state} handleSearch={handleSearch} />}
          />
          <Route path={APP_ROUTES.NOT_FOUND} element={<NotFound />} />
          <Route path={APP_ROUTES.ABOUT} element={<About />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
