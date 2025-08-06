import styles from './Results.module.scss';
import Item from './components/Item';
import Pagination from './components/Pagination';
import type { Pet } from '../Search/Search.model.tsx';
import SkeletonItem from './components/SkeletonItem.tsx';

interface ResultsProps {
  pets: Pet[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SKELETON_COUNT = 4;

const Results = ({
  pets = [],
  isLoading,
  page,
  totalPages,
  onPageChange,
}: ResultsProps) => {
  const safePets = Array.isArray(pets) ? pets : [];

  if (isLoading) {
    return (
      <div className={styles.results}>
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </div>
    );
  }

  if (!safePets.length) {
    return null;
  }

  return (
    <>
      <div className={styles.results}>
        {safePets.map((pet, index) => (
          <Item key={`${pet.id}-${index}`} pet={pet} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Results;
