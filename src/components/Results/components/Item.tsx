import type { Pet } from '../../Search/Search.model.tsx';
import styles from './Item.module.scss';

interface ItemProps {
  pet: Pet;
}

function Item({ pet }: ItemProps) {
  return (
    <div className={styles.item}>
      <h2 className={`${styles.status} ${styles[pet.status]}`}>{pet.status}</h2>
      <p className={styles.field}>
        <span className={styles.fieldLabel}>ID:</span>
        <span className={styles.fieldValue}>{pet.id}</span>
      </p>
      <p className={styles.field}>
        <span className={styles.fieldLabel}>Name:</span>
        <span className={styles.fieldValue}>{pet.name}</span>
      </p>
      <p className={styles.field}>
        <span className={styles.fieldLabel}>Category:</span>
        <span className={styles.fieldValue}>
          {pet.category?.name || 'Not specified'}
        </span>
      </p>
    </div>
  );
}

export default Item;
