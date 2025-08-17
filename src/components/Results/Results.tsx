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
  const uniquePets = pets.reduce((acc: Pet[], current) => {
    const isDuplicate = acc.find((item) => item.id === current.id);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  const totalPages = Math.ceil(uniquePets.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const petsToShow = uniquePets.slice(startIdx, endIdx);

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
  if (!uniquePets.length) return null;

  return renderPetsList();
};

export default Results;
