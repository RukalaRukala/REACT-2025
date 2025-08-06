import type { FC } from 'react';
import Results from '../Results/Results.tsx';
import { APP_MESSAGES } from '../../constants';
import type { Pet } from '../Search/Search.model.tsx';

interface ResultsSectionProps {
  searchResults: Pet[];
  isLoading: boolean;
  hasSearched: boolean;
}

const ResultsSection: FC<ResultsSectionProps> = ({
  searchResults,
  isLoading,
  hasSearched,
}) => {
  if (!hasSearched) {
    return <></>;
  }

  return (
    <section className="results-section">
      <h2 className="results-section-title">
        {isLoading
          ? APP_MESSAGES.SEARCHING
          : `${APP_MESSAGES.SEARCH_RESULTS} ${searchResults.length > 0 ? `(${searchResults.length})` : ''}`}
      </h2>
      <Results pets={searchResults} isLoading={isLoading} />
    </section>
  );
};

export default ResultsSection;
