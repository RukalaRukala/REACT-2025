import { APP_ROUTES, APP_TITLES } from '../../../App.const';
import Details from '../../Results/components/Details';
import Results from '../../Results/Results';
import Search from '../../Search/Search';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import styles from './MainView.module.scss';
import type { Pet } from '../../Search/Search.model.tsx';

interface MainViewProps {
  state: {
    searchResults: Pet[];
    isLoading: boolean;
  };
  handleSearch: (query: string) => void;
}

const MainView = ({ state, handleSearch }: MainViewProps) => {
  const { page, detailsId } = useParams();
  const navigate = useNavigate();
  const pageNum = page ? parseInt(page, 10) : 1;

  if (page && (isNaN(pageNum) || pageNum < 1)) {
    return <Navigate to={APP_ROUTES.NOT_FOUND} replace />;
  }

  const handleCloseDetails = () => {
    navigate(`/${pageNum}`);
  };

  return (
    <div className={styles.mainView}>
      <div
        className={
          detailsId
            ? `${styles.mainView__left} ${styles['mainView__left--with-details']}`
            : styles.mainView__left
        }
      >
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>{APP_TITLES.MAIN_TITLE}</h1>
          <p className={styles.appSubtitle}>{APP_TITLES.SUBTITLE}</p>
        </header>
        <Search onSearch={handleSearch} />
        <Results pets={state.searchResults} isLoading={state.isLoading} />
      </div>
      {detailsId && (
        <div className={styles.mainView__right}>
          <Details id={detailsId} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default MainView;
