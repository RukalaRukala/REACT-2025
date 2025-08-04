import { APP_ROUTES, APP_TITLES } from '../../../App.const';
import Details from '../../Results/components/Details';
import Results from '../../Results/Results';
import Search from '../../Search/Search';
import Flyout from '../../Flyout/Flyout';
import {
  useParams,
  Navigate,
  useSearchParams,
  Link,
  useNavigate,
} from 'react-router-dom';
import styles from './MainView.module.scss';
import type { Pet } from '../../Search/Search.model.tsx';
import { useAppSelector } from '../../../store/hooks';

interface MainViewProps {
  state: {
    searchResults: Pet[];
    isLoading: boolean;
  };
  handleSearch: (query: string) => void;
}

const MainView = ({ state, handleSearch }: MainViewProps) => {
  const selectedPets = useAppSelector(
    (state) => state.selectedItems.selectedPets
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNum = pageParam ? parseInt(pageParam, 10) : 1;
  const { page, detailsId } = useParams();
  const navigate = useNavigate();

  if (pageParam && (isNaN(pageNum) || pageNum < 1)) {
    return <Navigate to={APP_ROUTES.NOT_FOUND} replace />;
  }

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams);
    navigate({ pathname: `/${page || pageNum}`, search: params.toString() });
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <div
      className={`${styles.mainView} ${selectedPets.length > 0 ? styles['mainView--withFlyout'] : ''}`}
    >
      <nav className={styles.mainView__nav}>
        <Link to={APP_ROUTES.ABOUT} className={styles.mainView__link}>
          About
        </Link>
      </nav>
      <div className={styles.mainView__content}>
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>{APP_TITLES.MAIN_TITLE}</h1>
          <p className={styles.appSubtitle}>{APP_TITLES.SUBTITLE}</p>
        </header>
        <Search onSearch={handleSearch} />
        <Results
          pets={state.searchResults}
          isLoading={state.isLoading}
          page={pageNum}
          onPageChange={handlePageChange}
        />
      </div>
      {detailsId && <Details id={detailsId} onClose={handleCloseDetails} />}
      <Flyout />
    </div>
  );
};

export default MainView;
