import type { SearchButtonProps } from '../Search.model.tsx';
import { SEARCH_BUTTON_TEXT } from '../Search.const.tsx';
import styles from '../Search.module.scss';

function SearchButton({ onSearch }: SearchButtonProps) {
  return (
    <button onClick={onSearch} className={styles.searchButton}>
      {SEARCH_BUTTON_TEXT}
    </button>
  );
}

export default SearchButton;
