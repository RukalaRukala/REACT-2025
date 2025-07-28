import Item from './components/Item.tsx';
import SkeletonItem from './components/SkeletonItem.tsx';
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
  if (!pets || !pets.length) return null;

  return renderPetsList();
};

export default Results;
