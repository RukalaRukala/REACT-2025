import { Component } from 'react';
import Skeleton from '../../Skeleton/Skeleton.tsx';
import styles from './SkeletonItem.module.scss';

class SkeletonItem extends Component {
  render() {
    return (
      <div className={styles.skeletonItem}>
        <div className={styles.imageContainer}>
          <Skeleton className={styles.imageSkeleton} />
        </div>

        <div className={styles.content}>
          <Skeleton className={styles.nameSkeleton} />

          <div className={styles.details}>
            <Skeleton className={styles.statusSkeleton} />
            <Skeleton className={styles.categorySkeleton} />
          </div>

          <div className={styles.tags}>
            <Skeleton className={styles.tagSkeleton} />
            <Skeleton className={styles.tagSkeleton} />
          </div>
        </div>
      </div>
    );
  }
}

export default SkeletonItem;
