import Item from './components/Item.tsx';
import SkeletonItem from './components/SkeletonItem.tsx';
import Pagination from './components/Pagination';
import styles from './Results.module.scss';
import type { Pet } from '../Search/Search.model.tsx';

interface ResultsProps {
  pets: Pet[];
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

const PAGE_SIZE = 4;
const SKELETON_COUNT = 3;

const Results = ({ pets, isLoading, page, onPageChange }: ResultsProps) => {
  const safePets = pets || [];
  const totalPages = Math.ceil(safePets.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const petsToShow = safePets.slice(startIdx, endIdx);

  const renderLoadingSkeletons = () => {
    return (
      <div className={styles.results}>
        {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </div>
    );
  };

  const renderPetsList = () => {
    return (
      <>
        <div className={styles.results}>
          {petsToShow.map((pet, index) => (
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

  if (isLoading) return renderLoadingSkeletons();
  if (!safePets.length) return null;

  return renderPetsList();
};

export default Results;
