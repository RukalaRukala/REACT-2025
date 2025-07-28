import Item from './components/Item.tsx';
import SkeletonItem from './components/SkeletonItem.tsx';
import { RESULTS_MESSAGES } from '../Search/Search.const.tsx';
import styles from './Results.module.scss';
import type { Pet } from '../Search/Search.model.tsx';

interface ResultsProps {
  pets: Pet[];
  isLoading: boolean;
}

const Results = ({ pets, isLoading }: ResultsProps) => {
  const renderLoadingSkeletons = () => {
    return (
      <div className={styles.results}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    );
  };

  const renderNoResults = () => {
    return (
      <div className={styles.results}>
        <div className={styles.noResults}>{RESULTS_MESSAGES.NO_PETS_FOUND}</div>
      </div>
    );
  };

  const renderPetsList = () => {
    return (
      <div className={styles.results}>
        {pets.map((pet, index) => (
          <Item key={`${pet.id}-${index}`} pet={pet} />
        ))}
      </div>
    );
  };

  if (isLoading) return renderLoadingSkeletons();
  if (!pets || !pets.length) return renderNoResults();

  return renderPetsList();
};

export default Results;
