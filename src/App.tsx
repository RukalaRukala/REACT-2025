import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './styles/simple-themes.css';
import { useGetPetsByStatusQuery } from './store/api/petsApi';
import { APP_ROUTES } from './App.const';
import MainView from './components/pages/MainView/MainView.tsx';
import NotFound from './components/pages/NotFound.tsx';
import About from './components/pages/About';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { useState } from 'react';

function App() {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');

  const {
    data: searchResults = [],
    isLoading,
    error: searchError,
    refetch,
  } = useGetPetsByStatusQuery(currentSearchQuery, {
    skip: !currentSearchQuery,
  });

  const handleSearch = (query: string) => {
    setCurrentSearchQuery(query);
  };

  const handleRefresh = () => {
    refetch();
  };

  const state = {
    searchResults,
    isLoading,
    hasSearched: !!currentSearchQuery,
    searchError: searchError ? 'Something went wrong' : null,
    currentQuery: currentSearchQuery,
    onRefresh: handleRefresh,
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
