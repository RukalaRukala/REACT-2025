import Item from './components/Item.tsx';
import SkeletonItem from './components/SkeletonItem.tsx';
import styles from './Results.module.scss';
import type { Pet } from '../Search/Search.model.tsx';

interface ResultsProps {
  pets: Pet[];
  isLoading: boolean;
}

function Results({ pets, isLoading }: ResultsProps) {
  if (isLoading) {
    return (
      <div className={styles.results}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    );
  }

  if (!pets.length) {
    return (
      <div className={styles.results}>
        <div className={styles.noResults}>No results found</div>
      </div>
    );
  }

  return (
    <div className={styles.results}>
      {pets.map((pet) => (
        <Item key={pet.id} pet={pet} />
      ))}
    </div>
  );
}

export default Results;
