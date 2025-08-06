import { Component } from 'react';
import type { Pet } from '../../Search/Search.model.tsx';
import { UI_TEXTS, DEFAULT_VALUES } from '../../../constants';
import styles from './Item.module.scss';

interface ItemProps {
  pet: Pet;
}

class Item extends Component<ItemProps> {
  render() {
    const { pet } = this.props;

    return (
      <div className={styles.item}>
        <h2 className={`${styles.status} ${styles[pet.status]}`}>
          {pet.status}
        </h2>

        <p className={styles.field}>
          <span className={styles.fieldLabel}>{UI_TEXTS.LABELS.ID}</span>
          <span className={styles.fieldValue}>{pet.id}</span>
        </p>

        <p className={styles.field}>
          <span className={styles.fieldLabel}>{UI_TEXTS.LABELS.NAME}</span>
          <span className={styles.fieldValue}>{pet.name}</span>
        </p>

        <p className={styles.field}>
          <span className={styles.fieldLabel}>{UI_TEXTS.LABELS.CATEGORY}</span>
          <span className={styles.fieldValue}>
            {pet.category?.name || DEFAULT_VALUES.CATEGORY_NOT_SPECIFIED}
          </span>
        </p>
      </div>
    );
  }
}

export default Item;
