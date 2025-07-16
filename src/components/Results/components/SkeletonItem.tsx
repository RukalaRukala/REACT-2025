import Skeleton from '../../Skeleton/Skeleton.tsx';
import styles from './SkeletonItem.module.scss';

function SkeletonItem() {
  return (
    <div className={styles.skeletonItem}>
      <Skeleton
        height="1.75rem"
        width="5rem"
        borderRadius="1.25rem"
        className={styles.statusSkeleton}
      />
      <Skeleton height="1.25rem" width="5rem" className={styles.field} />
      <Skeleton height="1.25rem" width="9.375rem" className={styles.field} />
      <Skeleton height="1.25rem" width="6.25rem" className={styles.field} />
    </div>
  );
}

export default SkeletonItem;
