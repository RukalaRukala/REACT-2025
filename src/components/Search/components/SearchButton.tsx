import type { SearchButtonProps } from '../Search.model.tsx';
import { SEARCH_BUTTON_TEXT, SEARCH_BUTTON_LABELS } from '../Search.const.tsx';
import styles from '../Search.module.scss';

const SearchButton = ({ onSearch }: SearchButtonProps) => {
  const handleClick = (): void => {
    onSearch();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.searchButton}
      aria-label={SEARCH_BUTTON_LABELS.ARIA_LABEL}
    >
      <span className={styles.buttonText}>{SEARCH_BUTTON_TEXT}</span>
    </button>
  );
};

export default SearchButton;
