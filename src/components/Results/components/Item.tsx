import type { Pet } from '../../Search/Search.model.tsx';
import { ITEM_LABELS, DEFAULT_VALUES } from '../../Search/Search.const.tsx';
import styles from './Item.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { togglePetSelection } from '../../../store/selectedItemsSlice';

interface ItemProps {
  pet: Pet;
}

const Item = (props: ItemProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ? searchParams.get('page') : '1';
  const detailsUrl = `/${page}/${props.pet.id}`;

  const dispatch = useAppDispatch();
  const selectedPets = useAppSelector(
    (state) => state.selectedItems.selectedPets
  );
  let isSelected = false;
  for (let i = 0; i < selectedPets.length; i++) {
    if (selectedPets[i].id === props.pet.id) {
      isSelected = true;
      break;
    }
  }

  const handleCheckboxChange = (): void => {
    dispatch(togglePetSelection(props.pet));
  };

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      <Link
        to={detailsUrl}
        className={styles.item + (isSelected ? ' ' + styles.selected : '')}
        state={{ background: location }}
        style={{ flex: 1 }}
      >
        <h2 className={styles.status + ' ' + styles[props.pet.status]}>
          {props.pet.status}
        </h2>

        <p className={styles.field}>
          <span className={styles.fieldLabel}>{ITEM_LABELS.ID}</span>
          <span className={styles.fieldValue}>{props.pet.id}</span>
        </p>

        <p className={styles.field}>
          <span className={styles.fieldLabel}>{ITEM_LABELS.NAME}</span>
          <span className={styles.fieldValue}>{props.pet.name}</span>
        </p>

        <p className={styles.field}>
          <span className={styles.fieldLabel}>{ITEM_LABELS.CATEGORY}</span>
          <span className={styles.fieldValue}>
            {props.pet.category && props.pet.category.name
              ? props.pet.category.name
              : DEFAULT_VALUES.CATEGORY_NOT_SPECIFIED}
          </span>
        </p>
      </Link>
    </div>
  );
};

export default Item;
